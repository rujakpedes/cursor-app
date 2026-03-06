import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useStore } from './context/StoreContext';
import { MenuPage } from './components/pages/MenuPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { ThankYouPage } from './components/pages/ThankYouPage';
import { ProfilePage } from './components/pages/ProfilePage';
import { OrderHistoryPage } from './components/pages/OrderHistoryPage';
import { MaintenancePage } from './components/pages/MaintenancePage';

function App() {
  const { maintenance, maintenanceMessage, loading } = useStore();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        Loading...
      </div>
    );
  }

  if (maintenance) {
    return <MaintenancePage message={maintenanceMessage} />;
  }

  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/thank-you" element={<ThankYouPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/orders" element={<OrderHistoryPage />} />
    </Routes>
  );
}

export default App;
