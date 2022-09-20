import { nextTick } from 'process'
import { ResourceLimits } from 'worker_threads'
import { client } from '../server'
import logger from '../util/logger'

const insertProductToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  price: number,
  discount: number
) => {
  client.query(
    'INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)',
    [
      cartId,
      productId,
      quantity,
      price * quantity - (price * quantity * discount) / 100,
      discount,
    ],
    async (error: any, results: any) => {
      if (results) {
        if (results.rowCount > 0) {
          const tablename = 'public."cartDetails"'
          const response = await client.query(
            "SELECT CURRVAL(pg_get_serial_sequence($1,'id'))",
            [tablename]
          )

          const currValue = Number(response.rows[0].currval)
          client.query(
            'UPDATE public."cart" SET "cartDetailsId"=$1 WHERE id=$2',
            [currValue, cartId],
            (error: any, result: any) => {
              if (error) {
                //record error in the error file
                logger.error(error.detail)
                return error
              }
            }
          )
        }
        return results
      }
      if (error) {
        console.log(error)
        //record error in the error file
        logger.error(error.detail)
        return error
      }
    }
  )
}

const addProductToCart = async (
  cartId: number,
  productId: number,
  quantity: number,
  price: number,
  discount: number
) => {
  //SET quantity=$1
  client
    .query(
      'SELECT * FROM public."cartDetails" where "cartId"=$1 And "productId"=$2',
      [cartId, productId]
    )
    .then((res: any) => {
      if (res.rowCount > 0) {
        client
          .query(
            'UPDATE public."cartDetails" SET "quantity"="quantity"+$3,"price"=$4*("quantity"+$3)-($4*("quantity"+$3)*$5/100) where "cartId"=$1 And "productId"=$2',
            [cartId, productId, quantity, price, discount]
          )
          .then((res: any) => (res.rowCount > 0 ? true : false))
      } else {
        client.query(
          'INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)',
          [
            cartId,
            productId,
            quantity,
            price * quantity - (price * quantity * discount) / 100,
            discount,
          ]
        )
      }
    })
    .catch((err: Error) => logger.error(err))

  // client.query(
  //   'INSERT  INTO  public."cartDetails"("cartId","productId",quantity,price,discount) VALUES($1,$2,$3,$4,$5)',
  //   [cartId,cartDetailsId, productId, quantity],
  //   (error: any, results: any) => {
  //     if (error) {
  //       //record error in the error file
  //       logger.error(error.detail)
  //       throw error
  //     }
  //     return results
  //   }
  // )
}
const removeProductFromCart = (productId: number, cartId: number) => {
  client.query(
    'SELECT * FROM public."cartDetails"  WHERE  "productId"=$1 AND "cartId"=$2 ',
    [productId, cartId],
    (error: any, results: any) => {
      if (error) {
        //record error in the error file
        logger.error(error.detail)
        throw error
      }
      console.log('results.rowCount')
      console.log(results.rows[0])
      if (results.rowCount == 1) {
        if (Number(results.rows[0].quantity) > 1) {
          client.query(
            'Update public."cartDetails" SET "quantity"="quantity"-1, "price"="price"-(Select "price"*"discount"/100 from product where "id"=$1) WHERE  "productId"=$1 ',
            [productId],
            (error: any, results: any) => {
              if (error) {
                //record error in the error file
                logger.error(error.detail)
                throw error
              }
              return results
            }
          )
        } else {
          client.query(
            'DELETE FROM public."cartDetails"  WHERE  "productId"=$1 ',
            [productId],
            (error: any, results: any) => {
              if (error) {
                //record error in the error file
                logger.error(error.detail)
                throw error
              }
              return results
            }
          )
        }
        return results
      } else {
        return new Error('not found')
      }
    }
  )
}
const getCartDetailsID = async (cartId: number) => {
  const response = await client.query(
    'SELECT  id FROM public."cartDetails" cartdetails WHERE cartdetails."cartId"=$1',
    [cartId]
  )
  console.log(response.rows)
  return response.rows
}

const getCartDetails = async (cartId: number) => {
  const response = await client.query(
    'SELECT  cartdetails.quantity::int, product.id, product.category,product.description,product.image,product.price, product.title, cartdetails.price as total FROM public."cartDetails" cartdetails, public."product" product  WHERE "cartId"=$1 And cartdetails."productId"=product."id"',
    [cartId]
  )
  console.log(response.rows)
  return response.rows
}
const getTotalCart = async (cartId: number) => {
  cartId = Number(cartId)
  const response = await client.query(
    'SELECT  SUM(price)FROM public."cartDetails" where "cartId"=$1',
    [cartId]
  )
  return response.rows[0]
}
const deleteCartDetail = async (id: number) => {
  const response = await client.query(
    'DELETE FROM public."cartDetails" where "cartId"= $1',
    [id]
  )
  return response.rowCount > 0
}

const checkProductExists = async (productId: number) => {
  const response = await client.query(
    'SELECT * FROM public."cartDetails" where "productId"= $1',
    [productId]
  )
  return response.rowCount > 0
}
const updateCartDetail = async (id: number, update: any) => {
  const toUpdate = await client.query(
    'SELECT * FROM public."cart" where id= $1',
    [id]
  )
  let updated = false
  let response = null
  const err = {
    message: 'Product not found!',
  }

  if (toUpdate.rows.length > 0) {
    let title = update.title
    let price = update.price
    let discount = update.discount
    let quantity = update.quantity

    if (title == null) {
      title = toUpdate.rows[0].title
    }
    if (price == null) {
      price = toUpdate.rows[0].price
    }
    if (discount == null) {
      discount = toUpdate.rows[0].discount
    }
    if (quantity == null) {
      quantity = toUpdate.rows[0].quantity
    }

    response = await client.query(
      'UPDATE  public."product" SET title=$1,price=$2,discount=$3,quantity=$4 where id= $5',
      [title, price, discount, quantity, id]
    )
    if (response.rowCount > 0) {
      updated = true
    }
    return updated
  } else {
    return err
  }
}
export default {
  insertProductToCart,
  addProductToCart,
  getCartDetails,
  deleteCartDetail,
  updateCartDetail,
  removeProductFromCart,
  getTotalCart,
  getCartDetailsID,
  checkProductExists,
}
