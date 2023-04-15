import _products from './products.json';

export type Product = {
  id: number;
  name: string;
  unit_price_incl_vat: number;
  vat_category: number;
  stock_quantity: number;
};

export const getProducts = (): Product[] => _products;
