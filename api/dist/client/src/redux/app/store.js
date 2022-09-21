"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const toolkit_1 = require("@reduxjs/toolkit");
const query_1 = require("@reduxjs/toolkit/dist/query");
const rootReducer_1 = __importDefault(require("../reducers/rootReducer"));
const redux_logger_1 = __importDefault(require("redux-logger"));
// convert object to string and store in localStorage
function saveToLocalStorage(state) {
    try {
        const serialisedState = JSON.stringify(state);
        localStorage.setItem("persistantState", serialisedState);
    }
    catch (e) {
        console.warn(e);
    }
}
// load string from localStarage and convert into an Object
// invalid output must be undefined
function loadFromLocalStorage() {
    try {
        const serialisedState = localStorage.getItem("persistantState");
        if (serialisedState === null)
            return undefined;
        return JSON.parse(serialisedState);
    }
    catch (e) {
        console.warn(e);
        return undefined;
    }
}
const preloadedState = loadFromLocalStorage();
exports.store = toolkit_1.configureStore({
    reducer: {
        rootReducer: rootReducer_1.default,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(redux_logger_1.default),
    devTools: process.env.NODE_ENV !== "production",
    preloadedState,
});
exports.store.subscribe(() => saveToLocalStorage(exports.store.getState()));
query_1.setupListeners(exports.store.dispatch);
//# sourceMappingURL=store.js.map