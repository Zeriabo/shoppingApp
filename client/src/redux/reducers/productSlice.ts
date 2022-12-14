import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../app/store';
import { IProduct } from '../../types/types';

export interface ProductState {
  product: IProduct | null;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: ProductState = {
  product: null,
  status: 'idle',
};


export const productSlice = createSlice({
  name: 'product',
  initialState:initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  
});



// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectProductDesc = (state: ProductState) => state.product?.description
export const selectProductImage = (state: ProductState) => state.product?.image
export const selectPrice = (state: ProductState) => state.product?.price
export const selectTitle = (state: ProductState) => state.product?.title
// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default productSlice.reducer;
