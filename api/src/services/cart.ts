import { Cart, CartModel } from '../models/Cart'
import { NotFoundError } from '../helpers/apiError'
import { pool } from '../queries'
import { client } from '../server'

const getCarts = async () => {
  const response = await client.query(
    'SELECT * FROM public."cart" ORDER BY id ASC'
  )
  return response.rows
}

const getPaidCarts = async (userId: number) => {
  const response = await client.query(
    'SELECT "cart".id as cartId,"products"."title","cartDetails"."price",CAST("cartDetails"."created" AS VARCHAR) FROM public."cart",public."cartDetails",public."products" WHERE "userId"=$1  AND "cart".id="cartId" AND "paid"=true And "cartDetails"."productId"="products".id order by "cartId"',
    [userId]
  )
  return response.rows
}

const getSingleCart = async (id: number) => {
  return await client
    .query('SELECT * FROM public."cart" where id= $1', [id])
    .then((results: any) => {
      if (results.rows == 0) {
        return 'no cart'
      } else {
        return results.rows
      }
    })
    .catch((err: Error) => {
      return err
    })
}
const getSingleCartByUserId = async (id: number) => {
  return await client
    .query('SELECT * FROM public."cart" where "userId"= $1 And "paid"=false ', [
      id,
    ])
    .then(async (results: any) => {
      if (results.rows == 0) {
        return false
      } else {
        return results.rows
      }
    })
    .catch((err: Error) => {
      return err
    })
}

const getUserCart = async (email: string) => {
  return await client
    .query('SELECT id FROM public."users" where email= $1', [email])
    .then((result: any) => {
      if (result.rows == 0) {
        return 'no user with this email'
      } else {
        return getSingleCartByUserId(result.rows[0].id)
      }
    })
    .catch((err: Error) => {
      return err
    })
}

const createCart = async (cart: any) => {
  //create cart details obj and in database
  const paid = cart.paid || false
  const userId = cart.userId
  const err = {
    errorMessage: '',
  }
  return await client
    .query('SELECT FROM public."cart" WHERE "userId"=$1 And "paid"=false ', [
      userId,
    ])
    .then((results: any) => {
      if (results.rows == 0) {
        client
          .query(
            'INSERT INTO  public."cart" (  paid, "userId") VALUES($1,$2)',
            [paid, userId]
          )
          .then((results: any) => {
            return results
          })
      } else {
        err.errorMessage = 'Cart for user id: ' + userId + ' already exists!'
        return err
      }
    })
    .catch((err: Error) => {
      return err
    })
}
function deleteCart(id: number) {
  const err = {
    errorMessage: '',
  }
  const query: any = client.query(
    'SELECT FROM public."cart" WHERE id=$1',
    [id],
    (error: any, results: any) => {
      if (error) {
        throw error
      }
      if (results.rowCount > 0) {
        client
          .query('DELETE FROM public."cart" where id= $1', [id])
          .then((result: any) => {
            return result
          })
      } else {
        err.errorMessage = 'Cart is not found'
        return err
      }
    }
  )

  return query
}

const updateCart = async (id: number, update: any) => {
  const err = {
    message: 'cart not found!',
  }
  const res = {
    updated: false,
  }
  return client
    .query('SELECT * FROM public."cart" where id= $1', [id])
    .then((selectRes: any) => {
      if (selectRes.rows.length > 0) {
        let paid = update.paid

        if (paid == null) {
          paid = selectRes.rows[0].title
        }
        client
          .query('UPDATE  public."cart" SET paid=$1 where id= $2', [paid, id])
          .then((res: any) => {
            return res.rowCount
          })
      } else {
        return err
      }
    })
    .catch((err: Error) => {
      return err
    })
}
const payCart = async (id: number) => {
  const err = {
    message: 'cart not found!',
  }
  return client
    .query('SELECT * FROM public."cart" where id= $1', [id])
    .then((selectRes: any) => {
      if (selectRes.rows.length > 0) {
        const paid = true
        client
          .query('UPDATE  public."cart" SET paid=$1 where id= $2', [paid, id])
          .then((res: any) => {
            return res.rowCount
          })
      } else {
        return err
      }
    })
    .catch((err: Error) => {
      return err
    })
}
export default {
  getCarts,
  getSingleCart,
  getUserCart,
  createCart,
  deleteCart,
  updateCart,
  getSingleCartByUserId,
  payCart,
  getPaidCarts,
}
