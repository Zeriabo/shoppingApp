"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/products prefix
/**
 * @openapi
 * /api/v1/products/:
 *  get:
 *     summary: gets all products
 *     tags:
 *     - Product
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', product_1.findAll);
/**
 * @openapi
 * /api/v1/products/{id}:
 *  get:
 *     summary:gets certain product by id
 *  parameters:
 *    - in:path
 *    name:id
 *  schema:
 *       type:integer
 *  tags:
 *     - Product
 *  description:get a certain product by Id
 *  responses:
 *       200:
 *         description: App is up and running
 */
router.get('/getproduct/:productId', product_1.findById);
/**
 * @openapi
 * /api/v1/getcategoryproducts/{id}:
 *  get:
 *     summary:gets products filtered by category
 *  parameters:
 *    - in:path
 *    name:categoryId
 *  schema:
 *       type:integer
 *  tags:
 *     - Product
 *  description:get a products by category Id
 *  responses:
 *       200:
 *         description: App is up and running
 */
router.get('/getcategoryproducts/:categoryId', product_1.findAllByCategory);
/**
 * @openapi
 * /api/v1/products/fillproducts:
 *  get:
 *  summary:fill the product table with products
 *  tags:
 *   - Product
 *  description:fill the products table with products
 *  responses:
 *    201:
    description:products filled
 */
router.get('/fillproducts', product_1.fillProducts);
/**
 * @openapi
 * /api/v1/products/:
 *  post:
 *   summary:creates a new product
 *   produces:application/json,
 *   consumes:application/json,
 *   parameters:
 *     - in:body
 *   name:body,
 *   required:true,
 *   content:
 *    application/json:
 *   schema:
 *    type: object
 *     properties:
 *   task:
 *     type: "object"
 *   tags:
 *     - Product
 *   description: creates a product
 *   responses:
 *     200:
 *      description: product created
 */
router.post('/create', product_1.createProduct);
/**
 * @openapi
 * /api/v1/products/delete:
 *  get:
 *   summary: removes certain product
 *  parameters:
 *   - in: path
 *  name: productId
 *  schema:
 *    type: integer
 *  tags:
 *    - Product
 *  description: deletes a product by id
 *  responses:
 *    200:
 *     description: product created
 */
router.get('/delete/:productId', product_1.deleteProduct);
/**
 * @openapi
 * /api/v1/products/update:
 *  update:
 *    summary: updates certain product
 *  tags:
 *    - Product
 *  description: update a certain product
 *  responses:
 *     200:
 *       description: product updated
 */
router.put('/update/:productId', product_1.updateProduct);
exports.default = router;
//# sourceMappingURL=product.js.map