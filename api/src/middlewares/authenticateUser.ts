import { Request, Response, NextFunction } from 'express'
const GoogleStrategy = require('passport-google-oauth2').Strategy
import ApiError from '../helpers/apiError'
import logger from '../util/logger'
import passport from 'passport'
import { myPassport } from '../config/passport'

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log('i am middle ware ')
  next()
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body
  const user = { username, password }

  myPassport.authenticate('google', {
    failureRedirect: '/login',
    failureMessage: true,
  })

  console.log(user)
  next(user)
}
