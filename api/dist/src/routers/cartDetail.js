"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cartDetails_1 = require("../controllers/cartDetails");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/cartdetails prefix
/**
 * @openapi
 * /api/v1/cartdetails/:
 *  post:
 *     tags:
 *     - CartDetails
 *     description: Add product to a  cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post('/:cartId', cartDetails_1.addProductToCart);
/**
 * @openapi
 * /api/v1/cartdetails/{cartId}:
 *  delete:
 *     tags:
 *     - CartDetails
 *     description: Removes a product from a cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post('/remove/:cartId', cartDetails_1.removeProductFromCart);
/**
 * @openapi
 * /api/v1/cartdetails/{cartId}:
 *  get:
 *     tags:
 *     - CartDetails
 *     description: gets cart Details of a certain cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/:cartId', cartDetails_1.getCartDetailsOfCart);
/**
 * @openapi
 * /api/v1/cartdetails/{cartId}:
 *
 *     tags:
 *     - CartDetails
 *     description: gets cart details of a cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.delete('/remove/:cartId', cartDetails_1.removeCartDetails);
/**
 * @openapi
 * /api/v1/carts/{cartId}:
 *  delete:
 *     tags:
 *     - CartDetails
 *     description: Deletes  cart details from a cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/total/:cartId', cartDetails_1.getTotalOfCart);
exports.default = router;
//# sourceMappingURL=cartDetail.js.map