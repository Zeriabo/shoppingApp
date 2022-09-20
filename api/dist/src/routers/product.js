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
 * /api/v1/products/:productId:
 *  get:
 *     tags:
 *     - Product
 *     description: get a certain product by Id
 *     responses:
 *       200:
 *         description: return the product
 */
router.get('/getproduct/:productId', product_1.findById);
/**
 * @openapi
 * /api/v1/products/fillproducts:
 *  get:
 *     tags:
 *     - Product
 *     description: fill the products table with products
 *     responses:
 *       200:
 *         description: products created
 */
router.get('/fillproducts', product_1.fillProducts);
/**
 * @openapi
 * /api/v1/products/getproduct:
 *  post:
 *     tags:
 *     - Product
 *     description: creates a product
 *     responses:
 *       200:
 *         description: product created
 */
router.post('/create', product_1.createProduct);
/**
 * @openapi
 * /api/v1/products/delete:
 *  post:
 *     tags:
 *     - Product
 *     description: deletes a product by id
 *     responses:
 *       200:
 *         description: product created
 */
router.get('/delete/:productId', product_1.deleteProduct);
/**
 * @openapi
 * /api/v1/products/update:
 *  update:
 *     tags:
 *     - Product
 *     description: update a certain product
 *     responses:
 *       200:
 *         description: product updated
 */
router.put('/update/:productId', product_1.updateProduct);
exports.default = router;
//# sourceMappingURL=product.js.map