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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const axios_1 = __importDefault(require("axios"));
const initialState = {
    cartItems: [],
    status: "idle",
    total: 0,
};
exports.fetchCartDetails = toolkit_1.createAsyncThunk("getCartDetails", (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield axios_1.default.get("http://localhost:5001/api/v1/cartdetails/" + id);
}));
exports.addProductToCartDetails = toolkit_1.createAsyncThunk("getCartDetails", (data) => __awaiter(void 0, void 0, void 0, function* () {
    const cartId = data.cartId;
    const productId = data.id;
    yield fetch("http://localhost:5001/api/v1/cartdetails/" + cartId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ productId: productId }),
    });
}));
exports.checkOut = toolkit_1.createAsyncThunk("checkOutCart", (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Paying");
    console.log(id);
    const cartId = id;
    yield fetch("http://localhost:5001/api/v1/carts/" + cartId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        },
    });
}));
exports.getCartDetails = (id) => {
    axios_1.default.get("http://localhost:5001/api/v1/cartdetails/" + id).then((res) => {
        //cartid
        return res.data;
    });
};
exports.removeProductFromCartDetails = toolkit_1.createAsyncThunk("getCartDetails", (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    const id = data.id; //productId
    fetch("http://localhost:5001/api/v1/cartdetails/remove/" + data.cartId, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ productId: data.id }),
    });
}));
exports.cartDetailsSlice = toolkit_1.createSlice({
    name: "cartDetailsSlice",
    initialState: initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        addProduct(state, action) {
            console.log(action.payload);
            const productToAdd = {
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price -
                    action.payload.price * (action.payload.discount / 100),
                totalPrice: action.payload.price -
                    action.payload.price * (action.payload.discount / 100),
                category: action.payload.category,
                description: action.payload.description,
                discount: action.payload.discount,
                image: action.payload.image,
                quantity: 1,
            };
            const currentState = JSON.parse(JSON.stringify(state));
            const found = currentState.cartItems.findIndex((object) => {
                return object.id === productToAdd.id;
            });
            if (found == -1) {
                state.cartItems.push(productToAdd);
                state.total = Math.round(state.total + productToAdd.totalPrice);
            }
            else {
                toolkit_1.current(state).cartItems.forEach((acc, index) => {
                    if (acc.id == productToAdd.id) {
                        state.cartItems[index].quantity++;
                        state.cartItems[index].totalPrice = Math.round(acc.price * state.cartItems[index].quantity);
                        state.total = Math.round(state.total + state.cartItems[index].price);
                    }
                    return acc;
                });
            }
            exports.addProductToCartDetails(productToAdd);
        },
        removeProduct(state, action) {
            const productToAdd = {
                id: action.payload.id,
                title: action.payload.title,
                price: action.payload.price -
                    action.payload.price * (action.payload.discount / 100),
                totalPrice: action.payload.price -
                    action.payload.price * (action.payload.discount / 100),
                category: action.payload.category,
                description: action.payload.description,
                discount: action.payload.discount,
                image: action.payload.image,
                quantity: 1,
            };
            const currentState = JSON.parse(JSON.stringify(state));
            const found = currentState.cartItems.findIndex((object) => {
                return object.id === productToAdd.id;
            });
            if (found != -1) {
                toolkit_1.current(state).cartItems.forEach((acc, index) => {
                    if (acc.id == productToAdd.id) {
                        if (acc.quantity > 1) {
                            state.cartItems[index].quantity--;
                            state.cartItems[index].totalPrice = Math.round(state.cartItems[index].totalPrice - acc.price);
                            state.total = Math.round(state.total - state.cartItems[index].price);
                        }
                        else {
                            state.total = Math.round(state.total - state.cartItems[index].price);
                            state.cartItems.splice(found, 1);
                        }
                    }
                    return acc;
                });
            }
            exports.removeProductFromCartDetails(productToAdd);
        },
        setProducts(state, action) {
            state.cartItems = action.payload;
        },
        empty(state) {
            state.cartItems = [];
            state.total = 0;
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder.addCase(exports.fetchCartDetails.pending, (state) => {
            state.status = "loading";
        });
        builder.addCase(exports.fetchCartDetails.rejected, (state) => {
            state.status = "failed";
        });
        builder.addCase(exports.fetchCartDetails.fulfilled, (state, action) => {
            state.status = "fullfilled";
            console.log(action);
            if (action.payload != undefined) {
                state.cartItems = action.payload.data;
            }
            return state;
        });
        builder.addDefaultCase(() => { });
    },
});
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports.selectCartItems = (state) => state.cartItems;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
_a = exports.cartDetailsSlice.actions, exports.addProduct = _a.addProduct, exports.removeProduct = _a.removeProduct, exports.setProducts = _a.setProducts, exports.empty = _a.empty;
exports.default = exports.cartDetailsSlice.reducer;
//# sourceMappingURL=cartDetailsSlice.js.map