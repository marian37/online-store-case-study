import _ from 'lodash';
import { CartItem } from './app/store';

export const calculateTotal = (cart: CartItem[]): number =>
  _.reduce(
    cart,
    (acc, curr) => acc + curr.product.unit_price_incl_vat * curr.quantity,
    0.0
  );

export const calculateVat = (vatCategory: number, items: CartItem[]): number =>
  _.reduce(
    items,
    (acc, curr) =>
      acc +
      (curr.product.unit_price_incl_vat * curr.quantity * vatCategory) /
        (100 + vatCategory),
    0.0
  );
