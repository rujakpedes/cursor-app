import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Rating } from '../atoms/Rating';
import './RestaurantHeader.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop';

export const RestaurantHeader: React.FC = () => {
  const { settings } = useStore();
  if (!settings) return null;

  return (
    <div className="store-header">
      <div className="store-header__banner" />
      <div className="store-header__card">
        <img src={settings.logoUrl || PLACEHOLDER} alt={settings.storeName} className="store-header__logo" />
        <div className="store-header__info">
          <h1 className="store-header__name">{settings.storeName}</h1>
          <p className="store-header__location">{settings.location}</p>
          <div className="store-header__meta">
            <Rating value={settings.rating} count={settings.reviewCount} />
            <span className="store-header__dot">·</span>
            <span className="store-header__time">Delivery {settings.deliveryTimeStandard} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
