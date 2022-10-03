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
    user: {
        id: undefined,
        name: undefined,
        email: undefined,
        image: undefined,
    },
    loading: "idle",
    cart: {},
    history: {},
};
exports.fetchUser = toolkit_1.createAsyncThunk("users/getUser", () => __awaiter(void 0, void 0, void 0, function* () {
    const userObj = {
        id: undefined,
        name: undefined,
        email: undefined,
        image: undefined,
    };
    const response = yield fetch(process.env.REACT_APP_SERVER_URL + "/users/login/success", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": "true",
        },
    });
    if (response.status === 200) {
        const res = yield response.json();
        for (let key of Object.keys(res.cookies)) {
            var myobj = JSON.parse(res.cookies[key]);
            if (myobj.passport.user) {
                (userObj.image = myobj.passport.user.avatar),
                    (userObj.name = myobj.passport.user.name),
                    (userObj.id = Number(myobj.passport.user.id)),
                    (userObj.email = myobj.passport.user.email);
            }
        }
    }
    return userObj;
}));
exports.getHistory = toolkit_1.createAsyncThunk("users/getHistory", (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(process.env.REACT_APP_SERVER_URL + "/carts/paid/" + userId);
    const res = yield response.json();
    console.log(res);
    return res;
}));
//end of fetch User
exports.checkUserCart = toolkit_1.createAsyncThunk("users/checkUserCart", (user) => __awaiter(void 0, void 0, void 0, function* () {
    var userId = null;
    var cart = null;
    const gettingUserID = axios_1.default
        .get(process.env.REACT_APP_SERVER_URL + "/users/get/" + user.email)
        .then((response) => {
        if (response.data.body.result[0].email == user.email) {
            var userId = response.data.body.result[0].id;
            return userId;
        }
        else {
            //user is not in user table and doesn't have a cart
            axios_1.default
                .post(process.env.REACT_APP_SERVER_URL + "/users/", {
                body: user,
            })
                .then((res) => console.log(res));
        }
    })
        .catch((err) => console.log(err));
    userId = yield gettingUserID;
    if (userId > 0) {
        const cartApi = yield axios_1.default.get(process.env.REACT_APP_SERVER_URL + "/carts/user/" + userId);
        if (cartApi.data[0] != undefined) {
            return cartApi.data[0];
        }
        else {
            axios_1.default
                .post(process.env.REACT_APP_SERVER_URL + "/users/", {
                user,
            })
                .then((res) => res)
                .catch((err) => console.log(err));
            axios_1.default
                .post(process.env.REACT_APP_SERVER_URL + "/carts/", {
                userId: user.id,
            })
                .then((res) => res)
                .catch((err) => console.log(err));
            const cartApi = yield axios_1.default.get(process.env.REACT_APP_SERVER_URL + "/carts/user/", { params: { userId: userId } });
            return cartApi.data[0];
        }
    }
}));
exports.userSlice = toolkit_1.createSlice({
    name: "user",
    initialState: initialState,
    reducers: {
        signin(state, action) {
            state.user = action.payload;
        },
        logout(state, action) {
            state.user = {
                id: undefined,
                name: undefined,
                email: undefined,
                image: undefined,
            };
            state.loading = "idle";
            state.cart = null;
        },
        loadUser(state, action) {
            state.user.id = action.payload.id;
            state.user.image = action.payload.image;
            state.user.name = action.payload.name;
            state.user.email = action.payload.email;
        },
        getUser: (state, action) => {
            return (state = Object.assign({}, state));
        },
    },
    // The `extraReducers` field lets the slice handle actions defined elsewhere,
    // including actions generated by createAsyncThunk or in other slices.
    extraReducers: (builder) => {
        builder.addCase(exports.fetchUser.pending, (state, action) => {
            state.loading = "pending";
        }),
            builder.addCase(exports.fetchUser.fulfilled, (state, action) => {
                state.loading = "succeeded";
                state.user = action.payload;
            }),
            builder.addCase(exports.fetchUser.rejected, (state, action) => {
                state.loading = "failed";
            });
        //cartChecked
        builder.addCase(exports.checkUserCart.pending, (state, action) => {
            state.cart = null;
        }),
            builder.addCase(exports.checkUserCart.fulfilled, (state, action) => {
                state.cart = action.payload;
            }),
            builder.addCase(exports.checkUserCart.rejected, (state, action) => {
                state.cart = null;
            }),
            builder.addCase(exports.getHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            }),
            builder.addCase(exports.getHistory.rejected, (state, action) => {
                state.history = null;
            });
    },
});
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
exports.selectUser = (state) => state.user;
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
_a = exports.userSlice.actions, exports.signin = _a.signin, exports.loadUser = _a.loadUser, exports.logout = _a.logout;
exports.default = exports.userSlice.reducer;
//# sourceMappingURL=userSlice.js.map