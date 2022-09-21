import {
  DB_HOST,
  DB,
  DB_USER,
  DB_PASSWORD,
  DEV_DB_URL,
  ENVIRONMENT,
} from '../util/secrets'
import { Sequelize } from 'sequelize'

let sqdatabase = null
if (ENVIRONMENT == 'production') {
  sqdatabase = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
    database: DB,
    username: DB_USER,
    password: DB_PASSWORD,
  })
} else {
  sqdatabase = new Sequelize({
    dialect: 'postgres',
    host: DB_HOST,
    port: 5432,
    database: DB,
    username: DB_USER,
    password: DB_PASSWORD,
  })
}
export default sqdatabase

export const sequelize = new Sequelize(DB, DB_USER, DB_PASSWORD, {
  dialect: 'postgres',
  port: 5432,
})
module.exports = sequelize
