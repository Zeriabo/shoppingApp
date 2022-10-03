"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cartDetails_1 = __importDefault(require("../services/cartDetails"));
const cart_1 = __importDefault(require("../services/cart"));
const product_1 = __importDefault(require("../services/product"));
const apiError_1 = require("../helpers/apiError");
// POST /carts
exports.addProductToCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const cartId = Number(req.params.cartId);
        const productId = Number(data.productId);
        const quantity = Number(data.quantity) > 1 ? data.quantity : 1;
        const product = yield product_1.default.getSingleProduct(productId);
        const price = product[0].price;
        const discount = data.discount > 0 ? data.discount : product[0].discount;
        const cart = yield cart_1.default.getSingleCart(cartId);
        if (cart == 'no cart') {
            res.status(404).send('There is no cart with this id: ' + cartId);
        }
        const exists = cartDetails_1.default.checkProductExists(productId);
        if (!exists) {
            yield cartDetails_1.default.insertProductToCart(cartId, productId, quantity, price, discount)
                .then((res) => {
                if (res == undefined) {
                    next(res);
                }
                else {
                    return res;
                }
            })
                .catch((err) => {
                next(err);
            });
        }
        else {
            return yield cartDetails_1.default.addProductToCart(cartId, productId, quantity, price, discount)
                .then((res) => {
                return res;
            })
                .catch((err) => {
                console.log(err);
                next(err);
            });
        }
        res.status(200).send();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            console.log(error);
            res.status(500).send(error);
            next(error);
        }
    }
});
exports.removeProductFromCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        console.log(data);
        const cartId = Number(req.params.cartId);
        const productId = Number(data.productId);
        console.log(cartId);
        console.log('PRODUCTS ID ' + productId);
        {
            yield cartDetails_1.default.removeProductFromCart(productId, cartId);
        }
        res.status(200).send();
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.getCartDetailsOfCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.cartId);
        {
            const cartData = yield cartDetails_1.default.getCartDetails(cartId);
            if (cartData) {
                res.status(200).send(cartData);
            }
            else {
                res.status(404).send();
            }
        }
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.getTotalOfCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.cartId);
        {
            const cartData = yield cartDetails_1.default.getTotalCart(cartId);
            if (cartData) {
                res.status(200).send(cartData);
            }
            else {
                res.status(404).send();
            }
        }
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.removeCartDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.cartId);
        const ps = yield cartDetails_1.default.deleteCartDetail(cartId).then((res) => {
            return res;
        });
        if (ps != undefined) {
            res.status(200).end();
        }
        else {
            res.statusMessage = 'cart details not found';
            res.status(404).send();
        }
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=cartDetails.js.map