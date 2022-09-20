import { DB_USER, DB_HOST, DB, DB_PASSWORD } from './util/secrets'
const Pool = require('pg').Pool
 export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB,
  password: DB_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
}
})

//remove this and use the other connection one connecton !