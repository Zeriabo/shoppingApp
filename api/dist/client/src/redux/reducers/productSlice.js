"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    product: null,
    status: 'idle',
};
exports.productSlice = toolkit_1.createSlice({
    name: 'product',
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {},
});
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports.selectProductDesc = (state) => { var _a; return (_a = state.product) === null || _a === void 0 ? void 0 : _a.description; };
exports.selectProductImage = (state) => { var _a; return (_a = state.product) === null || _a === void 0 ? void 0 : _a.image; };
exports.selectPrice = (state) => { var _a; return (_a = state.product) === null || _a === void 0 ? void 0 : _a.price; };
exports.selectTitle = (state) => { var _a; return (_a = state.product) === null || _a === void 0 ? void 0 : _a.title; };
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
exports.default = exports.productSlice.reducer;
//# sourceMappingURL=productSlice.js.map