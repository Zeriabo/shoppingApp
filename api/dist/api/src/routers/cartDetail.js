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
 *     summary: add certain product to cart
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
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
 *  post:
 *     summary: removes certain product from cart
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
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
 *     summary: gets certain cart detail by cart id
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
 *     tags:
 *     - CartDetails
 *     description: get a certain CartDetails by Cart Id
 *     responses:
 *       200:
 *         description: return the cart
 */
router.get('/:cartId', cartDetails_1.getCartDetailsOfCart);
/**
 * @openapi
 * /api/v1/cartdetails/{cartId}:
 *  delete:
 *     summary: deletes certain cartdetails by cart id
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
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
 *  get:
 *     summary: gets the total of a cedrtain cart
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
 *     tags:
 *     - CartDetails
 *     description: get the total amount of a cart
 *     responses:
 *       200:
 *         description:return json object with the amount
 */
router.get('/total/:cartId', cartDetails_1.getTotalOfCart);
exports.default = router;
//# sourceMappingURL=cartDetail.js.map