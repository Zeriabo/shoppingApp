import { Request, Response, NextFunction, response } from 'express'

import { CartObject } from '../models/Cart'
import CartDetailService from '../services/cartDetails'
import CartService from '../services/cart'
import ProductService from '../services/product'
import { BadRequestError } from '../helpers/apiError'
import { ProductModel } from '../models/Product'
import cart from '../services/cart'

// POST /carts
export const addProductToCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    const cartId = Number(req.params.cartId)
    const productId = Number(data.productId)
    const quantity = Number(data.quantity) > 1 ? data.quantity : 1
    const product: any = await ProductService.getSingleProduct(productId)
    const price = product[0].price
    const discount = data.discount > 0 ? data.discount : product[0].discount
    const cart: any = await CartService.getSingleCart(cartId)
    if (cart == 'no cart') {
      res.status(404).send('There is no cart with this id: ' + cartId)
    }

    const exists = CartDetailService.checkProductExists(productId)

    if (!exists) {
      await CartDetailService.insertProductToCart(
        cartId,
        productId,
        quantity,
        price,
        discount
      )
        .then((res) => {
          if (res == undefined) {
            next(res)
          } else {
            return res
          }
        })
        .catch((err) => {
          next(err)
        })
    } else {
      return await CartDetailService.addProductToCart(
        cartId,
        productId,
        quantity,
        price,
        discount
      )
        .then((res) => {
          return res
        })
        .catch((err) => {
          console.log(err)
          next(err)
        })
    }

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      console.log(error)
      res.status(500).send(error)
      next(error)
    }
  }
}

export const removeProductFromCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body
    console.log(data)
    const cartId = Number(req.params.cartId)
    const productId = Number(data.productId)
    console.log(cartId)
    console.log('PRODUCTS ID ' + productId)
    {
      await CartDetailService.removeProductFromCart(productId, cartId)
    }

    res.status(200).send()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const getCartDetailsOfCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    {
      const cartData = await CartDetailService.getCartDetails(cartId)
      if (cartData) {
        res.status(200).send(cartData)
      } else {
        res.status(404).send()
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const getTotalOfCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    {
      const cartData = await CartDetailService.getTotalCart(cartId)
      if (cartData) {
        res.status(200).send(cartData)
      } else {
        res.status(404).send()
      }
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const removeCartDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    const ps = await CartDetailService.deleteCartDetail(cartId).then(
      (res: any) => {
        return res
      }
    )
    if (ps != undefined) {
      res.status(200).end()
    } else {
      res.statusMessage = 'cart details not found'
      res.status(404).send()
    }
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
