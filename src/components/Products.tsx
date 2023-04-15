import { useEffect } from 'react';
import { getProducts } from '../api/products';
import { setProducts } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

const Products = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const products = getProducts();
    dispatch(setProducts(products));
  }, [dispatch]);

  return (
    <div className="px-16 mt-8">
      <h1 className="text-center text-xl font-semibold">Products</h1>
      <div className="mt-8 grid grid-cols-4">
        {products.map((product) => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    </div>
  );
};

export default Products;
