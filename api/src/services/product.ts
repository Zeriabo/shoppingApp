import { Product, ProductModel } from '../models/Product'
import { NotFoundError } from '../helpers/apiError'
import { pool } from '../queries'
import { client } from '../server'
const axios = require('axios').default

const getProducts = async () => {
  const response = await client.query(
    'SELECT id,title,price,discount,quantity ::INTEGER,category,image,description FROM public."products"  ORDER BY id ASC'
  )
  return response.rows
}

const getProductsByCategory = async (category: number) => {
  const response = await client.query(
    'SELECT id,title,price,discount,quantity ::INTEGER,category,image,description FROM public."products" where category=$1',
    [category]
  )
  return response.rows
}

const getSingleProduct = async (id: number) => {
  const response = await client.query(
    'SELECT * FROM public."products" where id= $1',
    [id]
  )
  return response.rows
}
const fillProducts = async () => {
  const response = await client.query('SELECT * FROM public."products"')
  let discount = 0.0
  let newlyCreatedCategoryId = null
  const res = await response
  if (res.rowCount == 0) {
    try {
      axios
        .get('https://fakestoreapi.com/products')
        .then((response: any) => {
          response.data.forEach(async (product: any) => {
            if (product.rating.rate % 1 != 0) {
              discount = product.rating.rate * 10
            } else {
              discount = 5
            }
            await client
              .query('SELECT * FROM category WHERE name=$1', [product.category])
              .then(async (qres: any) => {
                if (qres.rowCount == 0) {
                  await client.query(
                    'INSERT INTO category(name) VALUES($1)',
                    [product.category],
                    async function (err: Error, result: any) {
                      if (err) {
                        //handle error
                        console.log(err)
                      } else {
                        // const lastinsertedID = await client.query(
                        //   'SELECT LAST_INSERT_ID()'
                        // )

                        newlyCreatedCategoryId = result.rows[0].id
                        const productExists = await client.query(
                          'SELECT * FROM products WHERE name=$1',
                          [product.name]
                        )
                        if ((productExists.rowCount = 0)) {
                          await client.query(
                            'INSERT INTO  public."products"(title, price, discount, quantity,description, category, image) VALUES($1,$2,$3,$4,$5,$6,$7)',
                            [
                              product.title,
                              product.price,
                              product.rating.rate * 10,
                              product.rating.count,
                              product.description,
                              newlyCreatedCategoryId,
                              product.image,
                            ],
                            (err: Error, result: any) => {
                              if (err) {
                                console.log(err)
                                return err
                              } else {
                                return result
                              }
                            }
                          )
                        }
                      }
                    }
                  )
                } else {
                  newlyCreatedCategoryId = qres.rows[0].id
                  await client.query(
                    'INSERT INTO  public."products"(title, price, discount, quantity,description, category, image) VALUES($1,$2,$3,$4,$5,$6,$7)',
                    [
                      product.title,
                      product.price,
                      product.rating.rate * 10,
                      product.rating.count,
                      product.description,
                      newlyCreatedCategoryId,
                      product.image,
                    ],
                    (err: Error, result: any) => {
                      if (err) {
                        console.log(err)
                        return err
                      } else {
                        return result
                      }
                    }
                  )
                }
              })
          })
        })
        .catch(function (err: any) {
          console.log('Unable to fill -', err)
        })
    } catch (err) {
      console.log(err)
    }
  }
  return response
}
const createProduct = (newProduct: any) => {
  client.query(
    'INSERT INTO  public."products"(title,price,discount,quantity) VALUES($1,$2,$3,$4)',
    [
      newProduct.title,
      newProduct.price,
      newProduct.discount,
      newProduct.quantity,
    ],
    (err: Error, result: any) => {
      if (err) {
        return err
      } else {
        return result
      }
    }
  )
}
const deleteProduct = async (id: number) => {
  const response = await client.query(
    'DELETE FROM public."products" where id= $1',
    [id]
  )
  return response.rowCount > 0
}
const updateProduct = async (id: number, update: any) => {
  const toUpdate = await client.query(
    'SELECT * FROM public."products" where id= $1',
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
  getProducts,
  getSingleProduct,
  getProductsByCategory,
  createProduct,
  deleteProduct,
  updateProduct,
  fillProducts,
}
