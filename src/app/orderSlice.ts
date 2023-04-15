import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CartItem } from './store';

type Order = { items: CartItem[]; total: number } | null;

const initialState: Order = null as Order;

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    setOrder: (_, action: PayloadAction<Order>) => action.payload,
  },
});

export const { setOrder } = orderSlice.actions;

export default orderSlice.reducer;
