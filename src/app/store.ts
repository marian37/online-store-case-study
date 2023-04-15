import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import _ from 'lodash';
import products from '../app/productsSlice';
import cart from '../app/cartSlice';
import order from '../app/orderSlice';
import { Product } from '../api/products';

const dummyProduct: Product = {
  id: 0,
  name: '',
  vat_category: 0,
  unit_price_incl_vat: 0,
  stock_quantity: 0,
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export const store = configureStore({
  reducer: combineReducers({ products, cart, order }),
});

export const cartSelector = (state: RootState): CartItem[] =>
  _.map(state.cart, (quantity, productId) => ({
    product:
      _.find(state.products, (product) => `${product.id}` === productId) ||
      dummyProduct,
    quantity,
  }));

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
