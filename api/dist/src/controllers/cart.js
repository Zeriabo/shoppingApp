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
const cart_1 = __importDefault(require("../services/cart"));
const apiError_1 = require("../helpers/apiError");
// POST /cart
exports.createCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        let created;
        const cart = {
            paid: false,
            userId: userId,
        };
        try {
            created = yield cart_1.default.createCart(cart);
        }
        catch (err) {
            res.json(err);
            next(err);
        }
        if (created != undefined && 'errorMessage' in created) {
            res.status(500);
        }
        res.json(created);
        return true;
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
// PUT /cart/:cartId
exports.updateCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const cartId = Number(req.params.cartId);
        yield cart_1.default.updateCart(cartId, update);
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
// DELETE /carts/:cartId
exports.deleteCart = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.cartId);
        const ps = yield cart_1.default.deleteCart(cartId).then((res) => {
            return res;
        });
        if (ps != undefined) {
            res.status(200).end();
        }
        else {
            res.statusMessage = 'cart not found';
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
// GET /carts/:cartId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cartId = Number(req.params.cartId);
        res.json(yield cart_1.default.getSingleCart(cartId));
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
exports.findByUserID = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = Number(req.query.userId);
        let cart = yield cart_1.default.getSingleCartByUserId(userId);
        if (!cart) {
            const cartToCreate = {
                userId: userId,
            };
            const createdCart = yield cart_1.default.createCart(cartToCreate);
        }
        cart = yield cart_1.default.getSingleCartByUserId(userId);
        return res.json(cart);
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
// GET /carts
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.json(yield cart_1.default.getCarts());
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
exports.findByUserEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.body.email;
        res.json(yield cart_1.default.getUserCart(email));
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
//# sourceMappingURL=cart.js.map