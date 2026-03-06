import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MenuPage } from './components/pages/MenuPage';
import { CheckoutPage } from './components/pages/CheckoutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App;
