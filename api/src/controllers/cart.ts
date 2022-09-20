import { Request, Response, NextFunction } from 'express'

import { CartObject } from '../models/Cart'
import CartService from '../services/cart'
import { BadRequestError } from '../helpers/apiError'

// POST /cart
export const createCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId } = req.body

    let created
    const cart: CartObject = {
      paid: false,
      userId: userId,
    }
    try {
      created = await CartService.createCart(cart)
    } catch (err) {
      res.json(err)
      next(err)
    }
    if (created != undefined && 'errorMessage' in created) {
      res.status(500)
    }
    res.json(created)
    return true
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// PUT /cart/:cartId
export const updateCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const cartId = Number(req.params.cartId)
    await CartService.updateCart(cartId, update)
    res.status(200).send()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const payCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    await CartService.payCart(cartId)
    res.status(200).send()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
// DELETE /carts/:cartId
export const deleteCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    const ps = await CartService.deleteCart(cartId).then((res: any) => {
      return res
    })

    if (ps != undefined) {
      res.status(200).end()
    } else {
      res.statusMessage = 'cart not found'
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

// GET /carts/:cartId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const cartId = Number(req.params.cartId)
    res.json(await CartService.getSingleCart(cartId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findByUserID = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId)
    let cart = await CartService.getSingleCartByUserId(userId)

    if (!cart) {
      const cartToCreate: any = {
        userId: userId,
      }
      const createdCart = await CartService.createCart(cartToCreate)
    }
    cart = await CartService.getSingleCartByUserId(userId)

    return res.json(cart)
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
// GET /carts
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    return res.json(await CartService.getCarts())
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const findByUserEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email
    return res.json(await CartService.getUserCart(email))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const findPaidCarts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = Number(req.params.userId)
    return res.json(await CartService.getPaidCarts(userId))
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
