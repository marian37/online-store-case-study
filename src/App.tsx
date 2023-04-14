import { Route, Routes } from 'react-router-dom';
import Home from './app/Home';
import Products from './app/Products';
import Cart from './app/Cart';
import Order from './app/Order';

const App = () => {
  return (
    <Routes>
      <Route path="products" element={<Products />} />
      <Route path="cart" element={<Cart />}>
        <Route path="order" element={<Order />} />
      </Route>
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default App;
