"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
// Use throughout your app instead of plain `useDispatch` and `useSelector`
exports.useAppDispatch = () => react_redux_1.useDispatch();
exports.useAppSelector = react_redux_1.useSelector;
//# sourceMappingURL=hooks.js.map