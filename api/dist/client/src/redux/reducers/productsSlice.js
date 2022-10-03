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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    products: [],
    filteredProducts: [],
    likedProducts: [],
    status: "idle",
};
var untouch = [];
exports.fetchProducts = toolkit_1.createAsyncThunk("getProducts", () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(process.env.REACT_APP_SERVER_URL + "/products/", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        },
    });
    if (response.status === 201) {
        const res = yield response.json();
        return res.body.result;
    }
}));
exports.fetchProduct = toolkit_1.createAsyncThunk("fetchproduct", (id) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(process.env.REACT_APP_SERVER_URL + `/products/${id}`);
    const result = yield response.json();
    return result;
}));
exports.deleteProductAsync = toolkit_1.createAsyncThunk("deleteProduct", (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fetch(`https://api`, {
            method: "DELETE",
        });
        const result = yield data.json();
        return result;
    }
    catch (error) {
        console.log(error);
    }
}));
exports.productsSlice = toolkit_1.createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        addProduct(state, action) {
            state.products.push(action.payload);
        },
        removeProduct(state, action) {
            state.products.filter((element) => element.category != action.payload) ||
                state.products.filter((element) => element.title != action.payload) ||
                state.products.filter((element) => element.id != action.payload) ||
                state.products.filter((element) => element.description != action.payload) ||
                state.products.filter((element) => element.price != action.payload);
        },
        loadProducts(state, action) {
            action.payload.forEach((element) => {
                var productToPush = {
                    id: 0,
                    category: "",
                    description: "",
                    image: "",
                    price: 0,
                    title: "",
                };
                productToPush.category = element.category;
                productToPush.title = element.title;
                productToPush.price = element.price;
                productToPush.category = element.category;
                productToPush.description = element.description;
                productToPush.image = element.image;
                productToPush.id = element.id;
                state.products.push(productToPush);
            });
            state.products = action.payload;
        },
        searchProduct(state, action) {
            if (action.payload != "") {
                return Object.assign(Object.assign({}, state), { filteredProducts: state.products.filter((foundProduct) => foundProduct.description.includes(action.payload) ||
                        foundProduct.title.includes(action.payload)) });
            }
            else {
                return Object.assign(Object.assign({}, state), { products: untouch });
            }
        },
        filterProducts(state, action) {
            if (action.payload != "") {
                return Object.assign(Object.assign({}, state), { filteredProducts: state.products.filter((foundProduct) => foundProduct.category == action.payload) });
            }
            else {
                return Object.assign(Object.assign({}, state), { products: untouch });
            }
        },
        likeUnlikeProduct(state, action) {
            console.log(action.payload);
            const found = state.likedProducts.filter(function (obj) {
                if (obj.id === action.payload.id) {
                    return true;
                }
                return false;
            });
            console.log(found);
            if (found.length == 0) {
                return Object.assign(Object.assign({}, state), { likedProducts: [...state.likedProducts, action.payload] });
            }
            else {
                return Object.assign(Object.assign({}, state), { likedProducts: state.likedProducts.filter((product) => {
                        return product.id != action.payload.id;
                    }) });
            }
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder.addCase(exports.fetchProducts.pending, (state, action) => {
            state.products = [];
            state.filteredProducts = [];
            state.status = "loading";
        });
        builder.addCase(exports.fetchProducts.rejected, (state, action) => {
            state.products = [];
            state.filteredProducts = [];
            state.status = "failed";
        });
        builder.addCase(exports.fetchProducts.fulfilled, (state, action) => {
            state.status = "fullfilled";
            state.products = [...action.payload];
            untouch = state.products;
            return state;
        });
        builder.addCase(exports.deleteProductAsync.fulfilled, (state, action) => {
            state.products = state.products.filter((product) => product.id !== action.payload);
        });
        builder.addDefaultCase((state, action) => { });
    },
});
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports.selectProductDesc = (state) => state.products;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
_a = exports.productsSlice.actions, exports.addProduct = _a.addProduct, exports.removeProduct = _a.removeProduct, exports.loadProducts = _a.loadProducts, exports.searchProduct = _a.searchProduct, exports.filterProducts = _a.filterProducts, exports.likeUnlikeProduct = _a.likeUnlikeProduct;
exports.default = exports.productsSlice.reducer;
//# sourceMappingURL=productsSlice.js.map