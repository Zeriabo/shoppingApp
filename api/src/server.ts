import app from './app'
import errorHandler from 'errorhandler'
import { Client } from 'pg'
import { DB_USER, DB_HOST, DB, DB_PASSWORD, ENVIRONMENT } from './util/secrets'
import logger from './util/logger'
import ProductService from './services/product'

export const client = new Client({
  user: DB_USER,
  host: DB_HOST,
  database: ENVIRONMENT == 'production' ? DB : DB,
  password: DB_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false },
})
client.connect(function (err: any) {
  if (err) {
    console.log('Database connection Error: ' + err)
    throw err
  } else {
    console.log(' Database Connected!')
  }
})

if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at port:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
  ProductService.fillProducts()
    .then((result) => {
      logger.info('products are successffuly filled')
    })
    .catch((err) => {
      console.log(err)
    })
})
