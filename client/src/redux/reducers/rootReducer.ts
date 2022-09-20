import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartDetailsSlice from "./cartDetailsSlice";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";

const RootReducer = combineReducers({
  products: productsSlice,
  user: userSlice,
  cartDetails: cartDetailsSlice,
  categories: categoriesSlice,
});

export default RootReducer;
