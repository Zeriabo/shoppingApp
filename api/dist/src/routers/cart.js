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
 * /api/v1/carts/:{cartId}:
 *  get:
 *     tags:
 *     - Cart
 *     description: get a certain Cart by Id
 *     responses:
 *       200:
 *         description: return the cart
 */
router.get('/', cart_1.findById);
/**
 * @openapi
 * /api/v1/carts/:{cartId}:
 *  get:
 *     tags:
 *     - Cart
 *     description: get a certain Cart by Id
 *     responses:
 *       200:
 *         description: return the cart
 */
router.get('/user', cart_1.findByUserID);
/**
 * @openapi
 * /api/v1/carts:
 *  post:
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
 * /api/v1/carts/{cartId}:
 *  delete:
 *     tags:
 *     - Cart
 *     description: delete a certain cart by id
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.delete('/:cartId', cart_1.deleteCart);
/**
 * @openapi
 * /api/v1/carts/{cartId}:
 *  put:
 *     tags:
 *     - Cart
 *     description: Update a cart by id
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.put('/:cartId', cart_1.updateCart);
exports.default = router;
//# sourceMappingURL=cart.js.map