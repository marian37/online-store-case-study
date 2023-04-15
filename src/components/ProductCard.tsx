import { SyntheticEvent, useCallback } from 'react';
import { Product } from '../api/products';
import { useNavigate } from 'react-router-dom';

type ProductCardProps = {
  product: Product;
};

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;

  const navigate = useNavigate();

  const url = `${process.env.PUBLIC_URL}/assets/products/${product.id}.jpg`;

  const onImageError = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      event.currentTarget.onerror = null;
      event.currentTarget.src = `${process.env.PUBLIC_URL}/assets/products/0.jpg`;
    },
    []
  );

  const addToCart = useCallback(() => {
    // TODO call add to cart action
    console.log(product.id);
    navigate('/cart');
  }, [navigate, product.id]);

  return (
    <div className="flex flex-col">
      <img
        src={url}
        onError={onImageError}
        alt={product.name}
        className={`rounded-sm h-[260px] object-cover`}
      />
      <p className="mt-4 font-medium text-lg">{product.name}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-gray-700">
          {product.unit_price_incl_vat.toFixed(2)} €
        </p>
        <button
          className="btn"
          disabled={product.stock_quantity <= 0}
          onClick={addToCart}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
