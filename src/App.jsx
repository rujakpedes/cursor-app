import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import RestaurantPage from './pages/RestaurantPage';
import CheckoutPage from './pages/CheckoutPage';

export default function App() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<RestaurantPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
      </Routes>
    </CartProvider>
  );
}
