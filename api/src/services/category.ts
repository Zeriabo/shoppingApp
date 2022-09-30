import { Cart, CartModel } from '../models/Cart'
import { NotFoundError } from '../helpers/apiError'
import { pool } from '../queries'
import { client } from '../server'
import { CategoryObject } from '../models/Category'

const createCategory = async (cat: CategoryObject) => {
  const response = client.query(
    'INSERT  INTO public."category"(name,image)  VALUES($1,$2)',
    [cat.name, cat.image],
    (err: Error, result: any) => {
      if (err) {
        return err
      } else {
        return result
      }
    }
  )
}

const getCategories = async () => {
  const response = await client.query(
    'SELECT * FROM public."category" ORDER BY id ASC'
  )
  return response.rows
}

const getSingleCategory = async (id: number) => {
  return await client
    .query('SELECT * FROM public."category" where id= $1', [id])
    .then((results: any) => {
      if (results.rows == 0) {
        return 'no category'
      } else {
        return results.rows
      }
    })
    .catch((err: Error) => {
      return err
    })
}
export default {
  createCategory,
  getCategories,
  getSingleCategory,
}
