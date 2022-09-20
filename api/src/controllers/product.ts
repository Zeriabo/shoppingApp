import { Request, Response, NextFunction } from 'express'

import { Product } from '../models/Product'
import ProductService from '../services/product'
import { BadRequestError } from '../helpers/apiError'
import logger from '../util/logger'

// GET /product/:productId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.productId)
    ProductService.getSingleProduct(id)
      .then((result) => {
        res.status(201).send({
          message: 'Product is retrieved successfully!',
          body: {
            result,
          },
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error',
          body: {
            err,
          },
        })
      })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /products
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ProductService.getProducts()
      .then((result) => {
        res.status(201).send({
          message: 'Product retrieved successfully!',
          body: {
            result,
          },
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error',
          body: {
            err,
          },
        })
      })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /products by category
export const findAllByCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req)
    const category = Number(req.params.categoryId)
    ProductService.getProductsByCategory(category)
      .then((result) => {
        res.status(201).send({
          message: 'Product retrieved successfully!',
          body: {
            result,
          },
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error',
          body: {
            err,
          },
        })
      })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
// fill products
export const fillProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    ProductService.fillProducts()
      .then((result) => {
        res.status(201).send({
          message: 'Products are filled successfully!',
          body: {
            result,
          },
        })
      })
      .catch((err) => {
        res.status(500).send({
          message: 'Error',
          body: {
            err,
          },
        })
      })
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const create = req.body
    const createdProduct = await ProductService.createProduct(create)
    res.json(createdProduct)
    logger.info('Product created')
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      logger.error(error)
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const id = Number(req.params.productId)
    const updatedProduct = await ProductService.updateProduct(id, update)
    res.json(updatedProduct)
    logger.info('Product updated')
  } catch (error) {
    logger.error(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// DELETE /product/:productId
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.productId)
    const deleted = await ProductService.deleteProduct(id)
    logger.info('Product deleted')
    res.status(204).send(deleted)
  } catch (error) {
    logger.error(error)
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
