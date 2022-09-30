import { combineReducers } from "@reduxjs/toolkit";
import productsSlice from "./productsSlice";
import cartDetailsSlice from "./cartDetailsSlice";
import userSlice from "./userSlice";
import categoriesSlice from "./categoriesSlice";
import ZoomedImageSlice from "./ZoomedImageSlice";

const RootReducer = combineReducers({
  products: productsSlice,
  user: userSlice,
  cartDetails: cartDetailsSlice,
  categories: categoriesSlice,
  zoomedImage: ZoomedImageSlice,
});

export default RootReducer;
