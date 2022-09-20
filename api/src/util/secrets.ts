import dotenv from 'dotenv'
import fs from 'fs'

import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'

export const JWT_SECRET = process.env['JWT_SECRET'] as string
export const POSTGRES_URI = process.env['POSTGRES_URI'] as string
export const MONGODB_URI = process.env['MONGODB_URI_LOCAL'] as string

export const DB_USER = process.env['DB_USER'] as string

export const DEV_DB_URL = process.env['DEV_DB_URL'] as string
export const DB_HOST = process.env['DB_HOST'] as string
export const DB = process.env['DB'] as string
export const DB_PASSWORD = process.env['DB_PASSWORD'] as string
// Use this instead if you want to use local mongodb
// export const MONGODB_URI = (
//   prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']
// ) as string

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  process.exit(1)
}

if (!POSTGRES_URI) {
  if (prod) {
    logger.error(
      'No POSTGRESQL connection string. Set POSTGRE_URI environment variable.'
    )
  } else {
    logger.error(
      'No POSTGRESQL connection string. Set POSTGRE_URI environment variable.'
    )
  }
  process.exit(1)
}
