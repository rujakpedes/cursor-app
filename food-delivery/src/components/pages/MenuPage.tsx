import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { RestaurantHeader } from '../organisms/RestaurantHeader';
import { ActionBar } from '../organisms/ActionBar';
import { PromoStrip } from '../organisms/PromoStrip';
import { MenuGrid } from '../organisms/MenuGrid';
import { BottomBasketBar } from '../organisms/BottomBasketBar';
import './MenuPage.css';

export const MenuPage: React.FC = () => {
  const { isLoggedIn, customer } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <RestaurantHeader />
      <div className="menu-page__user-bar">
        {isLoggedIn ? (
          <button className="menu-page__user-btn" onClick={() => navigate('/profile')}>
            {customer?.avatarUrl ? (
              <img src={customer.avatarUrl} alt="" className="menu-page__user-avatar" />
            ) : (
              <User size={18} />
            )}
            <span>{customer?.displayName || 'Profile'}</span>
          </button>
        ) : (
          <p className="menu-page__guest-note">
            Ordering as guest. <button onClick={() => navigate('/profile')} className="menu-page__login-link">Sign in</button> for order history.
          </p>
        )}
      </div>
      <ActionBar />
      <PromoStrip />
      <MenuGrid />
      <div className="menu-page__spacer" />
      <BottomBasketBar />
    </div>
  );
};
