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
const category_1 = __importDefault(require("../services/category"));
// POST /cart
exports.createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let created;
        const { name } = req.body;
        const { image } = req.body;
        let category = {
            name: name,
            image: image,
        };
        try {
            created = yield category_1.default.createCategory(category);
        }
        catch (err) {
            res.json(err);
            next(err);
        }
    }
    catch (err) {
        res.json(err);
        next(err);
    }
});
// GET /categories
exports.findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield category_1.default.getCategories()
        .then((result) => {
        res.status(201).send({
            message: 'Categories retrieved successfully!',
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
});
//# sourceMappingURL=category.js.map