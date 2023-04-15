import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Products from './components/Products';
import Cart from './components/Cart';
import Order from './components/Order';

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
