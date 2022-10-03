"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const productsSlice_1 = __importDefault(require("./productsSlice"));
const cartDetailsSlice_1 = __importDefault(require("./cartDetailsSlice"));
const userSlice_1 = __importDefault(require("./userSlice"));
const categoriesSlice_1 = __importDefault(require("./categoriesSlice"));
const ZoomedImageSlice_1 = __importDefault(require("./ZoomedImageSlice"));
const RootReducer = toolkit_1.combineReducers({
    products: productsSlice_1.default,
    user: userSlice_1.default,
    cartDetails: cartDetailsSlice_1.default,
    categories: categoriesSlice_1.default,
    zoomedImage: ZoomedImageSlice_1.default,
});
exports.default = RootReducer;
//# sourceMappingURL=rootReducer.js.map