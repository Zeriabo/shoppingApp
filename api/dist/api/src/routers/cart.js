"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cart_1 = require("../controllers/cart");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/carts prefix
/**
 * @openapi
 * /api/v1/carts/:
 *  get:
 *     summary: get all cart
 *     tags:
 *     - Cart
 *     description: gets all the carts
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', cart_1.findAll);
/**
 * @openapi
 * /api/v1/carts/{id}:
 *  get:
 *     summary: gets cart by id
 *     parameters:
 *     - name: id
 *       description: cart's id
 *       in: path
 *       required: true
 *       type: integer
 *     schema:
 *       type: string
 *       description: The id of cart
 *     tags:
 *     - Cart
 *     description: get a certain Cart by Id
 *     responses:
 *       200:
 *         description: return the cart
 *       400:
 *         description: cart can not be found
 */
router.get('/:cartId', cart_1.findById);
/**
 * @openapi
 * /api/v1/carts/{userId}:
 *  get:
 *     summary: get certain cart by user id
 *     parameters:
 *
 *     - in: path
 *     name: userId
 *     schema:
 *       type: string
 *       description: The id of user
 *     tags:
 *     - Cart
 *     description: get a certain Cart by user Id
 *     responses:
 *       200:
 *         description: return the cart
 */
router.get('/user/:userId', cart_1.findByUserID);
/**
 * @openapi
 * /api/v1/carts/paid/{userId}:
 *  get:
 *     summary: get paid carts by user id
 *     parameters:
 *
 *     - in: path
 *     name: userId
 *     schema:
 *       type: string
 *       description: The id of user
 *     tags:
 *     - Cart
 *     description: get all paid Carts by user Id
 *     responses:
 *       200:
 *         description: return the paid carts
 */
router.get('/paid/:userId', cart_1.findPaidCarts);
/**
 * @openapi
 * /api/v1/carts/user:
 *  post:
 *     summary: Add a new cart
 *     produces: application/json,
 *     consumes: application/json,
 *     parameters:
 *        - in: body
 *     name: body,
 *     required: true,
 *     content:
 *     application/json:
 *     schema:
 *            type: object
 *            properties:
 *                   task:
 *                      type: "object"
 *     tags:
 *     - Cart
 *     description: creates a cart
 *     responses:
 *       200:
 *         description: cart created
 */
router.post('/', cart_1.createCart);
/**
 * @openapi
 * /api/v1/carts/:{cartId}:
 *  delete:
 *     summary: deletes certain cart by id
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
 *     tags:
 *     - Cart
 *     description: deletes a certain Cart by Id
 *     responses:
 *       200:
 *         description: cart deleted
 */
router.delete('/:cartId', cart_1.deleteCart);
/**
 * @openapi
 * /api/v1/carts/{cartId}:
 *  put:
 *     summary: updates certain cart by id
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
 *     tags:
 *     - Cart
 *     description: updates a certain Cart by Id
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.put('/:cartId', cart_1.updateCart);
/**
 * @openapi
 * /api/v1/carts/{cartId}:
 *  post:
 *     summary: updates certain cart by id set paid true
 *     parameters:
 *     - in: path
 *     name: cartId
 *     schema:
 *       type: integer
 *     tags:
 *     - Cart
 *     description: set paid true for a certain Cart
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.post('/:cartId', cart_1.payCart);
exports.default = router;
//# sourceMappingURL=cart.js.map