import {
  createAsyncThunk,
  createSlice,
  current,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { ICartItem, IProductToAdd } from "../../types/types";
import axios from "axios";
import { StarRate } from "@material-ui/icons";

export interface CartDetailsState {
  cartItems: ICartItem[];
  status: "idle" | "loading" | "failed" | "fullfilled";
  total: number;
}

const initialState: CartDetailsState = {
  cartItems: [],
  status: "idle",
  total: 0,
};

export const fetchCartDetails: any = createAsyncThunk(
  "getCartDetails",
  async (id) => {
    return await axios.get("http://localhost:5001/api/v1/cartdetails/" + id);
  }
);

export const addProductToCartDetails: any = createAsyncThunk(
  "getCartDetails",
  async (data: any) => {
    const cartId = data.cartId;
    const productId = data.id;
    await fetch("http://localhost:5001/api/v1/cartdetails/" + cartId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
      body: JSON.stringify({ productId: productId }),
    });
  }
);
export const checkOut: any = createAsyncThunk(
  "checkOutCart",
  async (id: any) => {
    console.log("Paying");
    console.log(id);
    const cartId = id;
    await fetch("http://localhost:5001/api/v1/carts/" + cartId, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }
);
export const getCartDetails = (id: any) => {
  axios.get("http://localhost:5001/api/v1/cartdetails/" + id).then((res) => {
    //cartid
    return res.data;
  });
};
export const removeProductFromCartDetails: any = createAsyncThunk(
  "getCartDetails",
  async (data: any) => {
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
  }
);

export const cartDetailsSlice = createSlice({
  name: "cartDetailsSlice",
  initialState: initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addProduct(state, action: PayloadAction<IProductToAdd>) {
      console.log(action.payload);
      const productToAdd: ICartItem = {
        id: action.payload.id,
        title: action.payload.title,
        price:
          action.payload.price -
          action.payload.price * (action.payload.discount / 100),
        totalPrice:
          action.payload.price -
          action.payload.price * (action.payload.discount / 100),
        category: action.payload.category,
        description: action.payload.description,
        discount: action.payload.discount,
        image: action.payload.image,
        quantity: 1,
      };
      const currentState = JSON.parse(JSON.stringify(state));

      const found = currentState.cartItems.findIndex((object: any) => {
        return object.id === productToAdd.id;
      });
      if (found == -1) {
        state.cartItems.push(productToAdd);
        state.total = Math.round(state.total + productToAdd.totalPrice);
      } else {
        current(state).cartItems.forEach((acc: any, index: any) => {
          if (acc.id == productToAdd.id) {
            state.cartItems[index].quantity++;
            state.cartItems[index].totalPrice = Math.round(
              acc.price * state.cartItems[index].quantity
            );

            state.total = Math.round(
              state.total + state.cartItems[index].price
            );
          }
          return acc;
        });
      }
      addProductToCartDetails(productToAdd);
    },
    removeProduct(state, action: PayloadAction<IProductToAdd>) {
      const productToAdd: ICartItem = {
        id: action.payload.id,
        title: action.payload.title,
        price:
          action.payload.price -
          action.payload.price * (action.payload.discount / 100),
        totalPrice:
          action.payload.price -
          action.payload.price * (action.payload.discount / 100),
        category: action.payload.category,
        description: action.payload.description,
        discount: action.payload.discount,
        image: action.payload.image,
        quantity: 1,
      };
      const currentState = JSON.parse(JSON.stringify(state));

      const found = currentState.cartItems.findIndex((object: any) => {
        return object.id === productToAdd.id;
      });
      if (found != -1) {
        current(state).cartItems.forEach((acc: any, index: any) => {
          if (acc.id == productToAdd.id) {
            if (acc.quantity > 1) {
              state.cartItems[index].quantity--;
              state.cartItems[index].totalPrice = Math.round(
                state.cartItems[index].totalPrice - acc.price
              );
              state.total = Math.round(
                state.total - state.cartItems[index].price
              );
            } else {
              state.total = Math.round(
                state.total - state.cartItems[index].price
              );
              state.cartItems.splice(found, 1);
            }
          }
          return acc;
        });
      }
      removeProductFromCartDetails(productToAdd);
    },
    setProducts(state, action: PayloadAction<ICartItem[]>) {
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
    builder.addCase(fetchCartDetails.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCartDetails.rejected, (state) => {
      state.status = "failed";
    });
    builder.addCase(fetchCartDetails.fulfilled, (state, action) => {
      state.status = "fullfilled";
      console.log(action);
      if (action.payload != undefined) {
        state.cartItems = action.payload.data;
      }

      return state;
    });

    builder.addDefaultCase(() => {});
  },
});

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCartItems = (state: CartDetailsState) => state.cartItems;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const { addProduct, removeProduct, setProducts, empty } =
  cartDetailsSlice.actions;
export default cartDetailsSlice.reducer;
