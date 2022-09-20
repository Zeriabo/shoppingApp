import { Request, Response, NextFunction } from 'express'

import { CategoryObject } from '../models/Category'
import CategoryService from '../services/category'
import { BadRequestError } from '../helpers/apiError'

// POST /cart
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let created
    const { name } = req.body
    const { image } = req.body

    let category: CategoryObject = {
      name: name,
      image: image,
    }
    try {
      created = await CategoryService.createCategory(category)
    } catch (err) {
      res.json(err)
      next(err)
    }
  } catch (err) {
    res.json(err)
    next(err)
  }
}

// GET /categories
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await CategoryService.getCategories()
    .then((result) => {
      res.status(201).send({
        message: 'Categories retrieved successfully!',
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
}
