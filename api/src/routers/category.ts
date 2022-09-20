import express from 'express'
import { findAll } from '../controllers/category'

const router = express.Router()

// Every path we define here will get /api/v1/category prefix
/**
 * @openapi
 * /api/v1/category/:
 *  get:
 *     summary: get all Categories
 *     tags:
 *     - Category
 *     description: gets all the Categories
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', findAll)

export default router
