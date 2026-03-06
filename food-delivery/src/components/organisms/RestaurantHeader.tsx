import React from 'react';
import { ArrowLeft, Heart, Truck } from 'lucide-react';
import { restaurant } from '../../data/menuData';
import { Rating } from '../atoms/Rating';
import { PriceDisplay } from '../atoms/PriceDisplay';
import './RestaurantHeader.css';

export const RestaurantHeader: React.FC = () => (
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
      <img src={restaurant.image} alt={restaurant.name} className="rest-header__avatar" />
      <div className="rest-header__info">
        <h1 className="rest-header__name">{restaurant.name}</h1>
        <p className="rest-header__location">- {restaurant.location}</p>
        <Rating value={restaurant.rating} count={restaurant.reviewCount} />
        <div className="rest-header__meta">
          <PriceDisplay amount={restaurant.discountPrice} originalAmount={restaurant.originalPrice} size="sm" />
          <span className="rest-header__dot">·</span>
          <span className="rest-header__time">From {restaurant.deliveryTime} mins</span>
        </div>
      </div>
    </div>
  </div>
);
