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
const product_1 = __importDefault(require("../services/product"));
const apiError_1 = require("../helpers/apiError");
const logger_1 = __importDefault(require("../util/logger"));
// GET /product/:productId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        product_1.default.getSingleProduct(id)
            .then((result) => {
            res.status(201).send({
                message: 'Product is retrieved successfully!',
                body: {
                    result,
                },
            });
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error',
                body: {
                    err,
                },
            });
        });
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
// GET /products
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product_1.default.getProducts()
            .then((result) => {
            res.status(201).send({
                message: 'Product retrieved successfully!',
                body: {
                    result,
                },
            });
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error',
                body: {
                    err,
                },
            });
        });
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
// GET /products by category
exports.findAllByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req);
        const category = Number(req.params.categoryId);
        product_1.default.getProductsByCategory(category)
            .then((result) => {
            res.status(201).send({
                message: 'Product retrieved successfully!',
                body: {
                    result,
                },
            });
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error',
                body: {
                    err,
                },
            });
        });
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
// fill products
exports.fillProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        product_1.default.fillProducts()
            .then((result) => {
            res.status(201).send({
                message: 'Products are filled successfully!',
                body: {
                    result,
                },
            });
        })
            .catch((err) => {
            res.status(500).send({
                message: 'Error',
                body: {
                    err,
                },
            });
        });
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
exports.createProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create = req.body;
        const createdProduct = yield product_1.default.createProduct(create);
        res.json(createdProduct);
        logger_1.default.info('Product created');
    }
    catch (error) {
        if (error instanceof Error && error.name == 'ValidationError') {
            logger_1.default.error(error);
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
exports.updateProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const id = Number(req.params.productId);
        const updatedProduct = yield product_1.default.updateProduct(id, update);
        res.json(updatedProduct);
        logger_1.default.info('Product updated');
    }
    catch (error) {
        logger_1.default.error(error);
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
// DELETE /product/:productId
exports.deleteProduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        const deleted = yield product_1.default.deleteProduct(id);
        logger_1.default.info('Product deleted');
        res.status(204).send(deleted);
    }
    catch (error) {
        logger_1.default.error(error);
        if (error instanceof Error && error.name == 'ValidationError') {
            next(new apiError_1.BadRequestError('Invalid Request', error));
        }
        else {
            next(error);
        }
    }
});
//# sourceMappingURL=product.js.map