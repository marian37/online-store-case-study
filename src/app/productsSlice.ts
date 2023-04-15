import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Product } from '../api/products';

const initialState: Product[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (_, action: PayloadAction<Product[]>) => action.payload,
  },
});

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
