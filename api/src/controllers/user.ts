import { Request, Response, NextFunction } from 'express'

import { User } from '../models/User'
import UserService from '../services/user'
import { BadRequestError } from '../helpers/apiError'
import logger from '../util/logger'
import { myPassport } from '../config/passport'

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const create = req.body
    console.log(create)
    const createdUser: any = await UserService.createUser(create)
    if (createdUser) {
      if (createdUser.rowCount > 0) {
        res.status(200).send({
          message: 'User: ' + create.email + ' created!',
        })
      }
    }
    logger.info('User created')
    return createdUser
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      logger.error(error)
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const update = req.body
    const id = Number(req.params.userId)
    const updatedUser = await UserService.updateUser(id, update)
    if (updatedUser instanceof Error) {
      logger.error('Error: user' + id + 'not found to update')
      res.status(404).send({
        message: 'User not Found!',
      })
    } else {
      logger.info('User id:' + id + ' updated')
      res.status(201).send({
        message: 'User is updated successfully!',
      })
    }
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
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.productId)
    const deleted = await UserService.deleteUser(id)
    logger.info('User deleted')
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

// GET /user/:userId
export const findById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.userId)
    UserService.getSingleUser(id)
      .then((result) => {
        res.status(200).send({
          message: 'User is retrieved successfully!',
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
// GET /user/:userId
export const findByEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.params.email
    UserService.getUserByEmail(email)
      .then((result) => {
        res.status(201).send({
          message: 'User is retrieved successfully!',
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

// GET /users
export const findAll = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    UserService.getUsers()
      .then((result) => {
        res.status(201).send({
          message: 'Users retrieved successfully!',
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

export const checkLogin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    // UserService.checkUser()
    //const token=jwt.sign({foo:'bar'},'mysecretkey',{algorithm:'RS256'});
    //console.log(req)
    // return res.send(`login as ${req.body.username}`)

    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}

// GET /users/auth/account
export const sucessLogin = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('COntroller sucess login')
    console.log(req)
    //const token=jwt.sign({foo:'bar'},'mysecretkey',{algorithm:'RS256'});
    //console.log(req)
    // return res.send(`login as ${req.body.username}`)
    next()
  } catch (error) {
    if (error instanceof Error && error.name == 'ValidationError') {
      next(new BadRequestError('Invalid Request', error))
    } else {
      next(error)
    }
  }
}
