/* eslint @typescript-eslint/no-var-requires: "off" */
import express from 'express'

// import lusca from 'lusca' will be usedç later
import dotenv from 'dotenv'
import path from 'path'
import productsRouter from './routers/product'
import cartRouter from './routers/cart'
import categoryRouter from './routers/category'
import userRouter from './routers/user'
import cartDetailRouter from './routers/cartDetail'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import swaggerDocs from './util/swagger'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import session from 'express-session'

require('./config/passport')

dotenv.config({ path: path.join(__dirname, '.env') })
dotenv.config({ path: '.env' })
console.log(__dirname)
const app = express()

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(',')
  : []

const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
app.use(cors(corsOptions))

const port = process.env.PORT || 5001
const env = process.env
app.use(
  session({
    secret: 'eminem', // session secret
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      expires: new Date(Date.now() + 60 * 60 * 1000 * 24),
    },
  })
)
app.use(express.static('public'))
app.use(passport.initialize())
app.use(passport.session()) // persistent login sessions

// Express configuration
app.set('port', port)
// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

// Set up routers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  next()
})
app.use('/api/v1/carts', cartRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/cartdetails', cartDetailRouter)
// Custom API error handler
app.use(apiErrorHandler)

// Couple the application to the Swagger module.
swaggerDocs(app, Number(port))

export default app
