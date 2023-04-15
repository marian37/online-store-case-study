import { ChangeEvent, useCallback } from 'react';
import { useAppDispatch } from '../app/hooks';
import { CartItem } from '../app/store';
import { addToCart, removeFromCart } from '../app/cartSlice';
import { TrashIcon } from '@heroicons/react/24/outline';

const CartItemRow = (props: CartItem) => {
  const { product, quantity } = props;

  const dispatch = useAppDispatch();

  const onQuantityChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        addToCart({
          productId: product.id,
          quantity: event.target.valueAsNumber,
        })
      );
    },
    [dispatch, product.id]
  );

  const onItemRemove = useCallback(() => {
    dispatch(removeFromCart(product.id));
  }, [dispatch, product.id]);

  return (
    <tr key={product.id}>
      <td className="text-left text-secondary">{product.name}</td>
      <td className="text-left text-secondary flex">
        <input
          type="number"
          defaultValue={quantity}
          min={1}
          max={product.stock_quantity}
          onChange={onQuantityChange}
          className="w-16 text-center border-2"
        />
        <TrashIcon className="ml-4 w-6" onClick={onItemRemove} />
      </td>
      <td className="text-right text-secondary">
        {product.unit_price_incl_vat.toFixed(2)} €
      </td>
      <td className="text-right text-secondary">{product.vat_category}%</td>
      <td className="text-right">
        {(product.unit_price_incl_vat * quantity).toFixed(2)} €
      </td>
    </tr>
  );
};

export default CartItemRow;
