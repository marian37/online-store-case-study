import { useEffect } from 'react';
import { getProducts } from '../api/products';
import { setProducts } from '../app/productsSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import ProductCard from './ProductCard';

const Products = () => {
  const products = useAppSelector((state) => state.products);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const products = getProducts();
    dispatch(setProducts(products));
  }, [dispatch]);

  return (
    <div className="px-16 mt-16">
      <h1 className="text-center text-3xl font-semibold">Products</h1>
      <div className="my-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
