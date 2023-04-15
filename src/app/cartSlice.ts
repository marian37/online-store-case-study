import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

type Cart = Record<number, number>;

type AddToCartPayload = {
  productId: number;
  quantity?: number;
};

const initialState: Cart = {};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { productId, quantity } = action.payload;
      return {
        ...state,
        [productId]: quantity || (state[productId] || 0) + 1,
      };
    },
    removeFromCart: (state, action: PayloadAction<number>) =>
      _.omit(state, action.payload),
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
