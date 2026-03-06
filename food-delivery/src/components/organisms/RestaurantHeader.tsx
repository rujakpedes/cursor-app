import React from 'react';
import { ArrowLeft, Heart, Truck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { Rating } from '../atoms/Rating';
import './RestaurantHeader.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop';

export const RestaurantHeader: React.FC = () => {
  const { settings } = useStore();
  if (!settings) return null;

  return (
    <div className="rest-header">
      <div className="rest-header__hero">
        <div className="rest-header__nav">
          <button className="rest-header__icon-btn" aria-label="Go back">
            <ArrowLeft size={22} />
          </button>
          <div className="rest-header__nav-right">
            <button className="rest-header__icon-btn" aria-label="Favorite">
              <Heart size={22} />
            </button>
            <button className="rest-header__delivery-toggle">
              <Truck size={16} />
              <span>Delivery</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rest-header__card">
        <img src={settings.logoUrl || PLACEHOLDER} alt={settings.storeName} className="rest-header__avatar" />
        <div className="rest-header__info">
          <h1 className="rest-header__name">{settings.storeName}</h1>
          <p className="rest-header__location">- {settings.location}</p>
          <Rating value={settings.rating} count={settings.reviewCount} />
          <div className="rest-header__meta">
            <span className="rest-header__time">From {settings.deliveryTimeStandard} mins</span>
          </div>
        </div>
      </div>
    </div>
  );
};
