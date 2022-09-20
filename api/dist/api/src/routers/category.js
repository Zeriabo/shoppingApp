"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const category_1 = require("../controllers/category");
const router = express_1.default.Router();
// Every path we define here will get /api/v1/category prefix
/**
 * @openapi
 * /api/v1/category/:
 *  get:
 *     summary: get all Categories
 *     tags:
 *     - Category
 *     description: gets all the Categories
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/', category_1.findAll);
exports.default = router;
//# sourceMappingURL=category.js.map