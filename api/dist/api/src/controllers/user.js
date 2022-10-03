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
const user_1 = __importDefault(require("../services/user"));
const apiError_1 = require("../helpers/apiError");
const logger_1 = __importDefault(require("../util/logger"));
exports.createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const create = req.body;
        const createdUser = yield user_1.default.createUser(create);
        if (createdUser) {
            if (createdUser.rowCount > 0) {
                res.status(200).send({
                    message: 'User: ' + create.email + ' created!',
                });
            }
        }
        logger_1.default.info('User created');
        return createdUser;
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
exports.updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const update = req.body;
        const id = Number(req.params.userId);
        const updatedUser = yield user_1.default.updateUser(id, update);
        if (updatedUser instanceof Error) {
            logger_1.default.error('Error: user' + id + 'not found to update');
            res.status(404).send({
                message: 'User not Found!',
            });
        }
        else {
            logger_1.default.info('User id:' + id + ' updated');
            res.status(201).send({
                message: 'User is updated successfully!',
            });
        }
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
exports.deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.productId);
        const deleted = yield user_1.default.deleteUser(id);
        logger_1.default.info('User deleted');
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
// GET /user/:userId
exports.findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.userId);
        user_1.default.getSingleUser(id)
            .then((result) => {
            res.status(200).send({
                message: 'User is retrieved successfully!',
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
// GET /user/:userId
exports.findByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.params.email;
        user_1.default.getUserByEmail(email)
            .then((result) => {
            res.status(201).send({
                message: 'User is retrieved successfully!',
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
// GET /users
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        user_1.default.getUsers()
            .then((result) => {
            res.status(201).send({
                message: 'Users retrieved successfully!',
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
exports.checkLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // UserService.checkUser()
        //const token=jwt.sign({foo:'bar'},'mysecretkey',{algorithm:'RS256'});
        //console.log(req)
        // return res.send(`login as ${req.body.username}`)
        next();
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
// GET /users/auth/account
exports.sucessLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('COntroller sucess login');
        console.log(req);
        //const token=jwt.sign({foo:'bar'},'mysecretkey',{algorithm:'RS256'});
        //console.log(req)
        // return res.send(`login as ${req.body.username}`)
        next();
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
//# sourceMappingURL=user.js.map