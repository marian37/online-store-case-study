import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setOrder } from '../app/orderSlice';

const Order = () => {
  const order = useAppSelector((state) => state.order);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const continueShopping = useCallback(() => {
    dispatch(setOrder(null));
    navigate('/products');
  }, [dispatch, navigate]);

  return (
    <div className="px-16 my-16 flex flex-col items-center">
      <h1 className="text-center text-3xl font-semibold">
        Thank you for your order
      </h1>

      <table className="mt-16 table-auto">
        <tbody>
          {order?.items?.map((item, id, items) => (
            <tr
              key={item.product.id}
              className={id === items.length - 1 ? 'border-b-0' : ''}
            >
              <td className="text-secondary">{item.quantity}x</td>
              <td className="text-secondary">{item.product.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-16 text-secondary">
        Please send us the payment of{' '}
        <span className="text-3xl">{order?.total?.toFixed(2)} €</span> to our
        bitcoin address.
      </p>

      <button className="btn mt-16" onClick={continueShopping}>
        Continue shopping
      </button>
    </div>
  );
};

export default Order;
