import _ from 'lodash';
import { useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';
import { useAppSelector } from '../app/hooks';
import { cartSelector } from '../app/store';
import { calculateTotal, calculateVat } from '../utils';
import CartItemRow from './CartItemRow';

const Cart = () => {
  const cart = useAppSelector(cartSelector);

  const vatByCategory = useMemo(
    () =>
      _(cart)
        .groupBy((cartItem) => cartItem.product.vat_category)
        .omit(0)
        .map((items, vatCategory) => {
          const category = parseInt(vatCategory);
          return {
            vatCategory: category,
            vat: calculateVat(category, items),
          };
        })
        .value(),
    [cart]
  );

  const total = useMemo(() => calculateTotal(cart), [cart]);

  const totalExclVat = useMemo(
    () => total - _.reduce(vatByCategory, (acc, curr) => acc + curr.vat, 0.0),
    [total, vatByCategory]
  );

  const sendOrder = useCallback(() => {
    console.log(cart);
    // TODO empty the cart
    // TODO redirect to order page
  }, [cart]);

  return (
    <div className="px-16 mt-16 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold">Cart</h1>

      <div className="w-[1200px]">
        <table className="mt-16 w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left">Item</th>
              <th className="text-left">Quantity</th>
              <th className="text-right">Unit Price incl. VAT</th>
              <th className="text-right">VAT</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <CartItemRow
                key={cartItem.product.id}
                product={cartItem.product}
                quantity={cartItem.quantity}
              />
            ))}
            <tr>
              <td className="text-right text-secondary" colSpan={4}>
                Total excl. VAT
              </td>
              <td className="text-right">{totalExclVat.toFixed(2)} €</td>
            </tr>
            {vatByCategory.map((vatCategoryItem) => (
              <tr key={vatCategoryItem.vatCategory}>
                <td className="text-right text-secondary" colSpan={4}>
                  VAT {vatCategoryItem.vatCategory}%
                </td>
                <td className="text-right">
                  {vatCategoryItem.vat.toFixed(2)} €
                </td>
              </tr>
            ))}
            <tr>
              <td className="text-right text-secondary font-bold" colSpan={4}>
                Total
              </td>
              <td className="text-right font-bold">{total.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>

        <div className="mb-16 mt-4 flex justify-between items-center">
          <Link to="/products">
            <span className="flex items-center">
              <ArrowSmallLeftIcon className="w-4" /> Back
            </span>
          </Link>
          <button className="btn" onClick={sendOrder}>
            Send order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
