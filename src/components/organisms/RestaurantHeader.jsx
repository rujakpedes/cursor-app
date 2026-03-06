import { ArrowLeft, Heart, Truck } from 'lucide-react';
import { Star } from 'lucide-react';
import IconButton from '../atoms/IconButton';
import { restaurant } from '../../data/restaurant';
import './RestaurantHeader.css';

export default function RestaurantHeader({ onBack }) {
  return (
    <div className="rest-header">
      <div className="rest-header__banner">
        <div className="rest-header__nav">
          <IconButton onClick={onBack}>
            <ArrowLeft size={20} />
          </IconButton>
          <div className="rest-header__nav-right">
            <IconButton>
              <Heart size={20} />
            </IconButton>
            <button className="rest-header__delivery">
              <Truck size={14} />
              <span>Delivery</span>
            </button>
          </div>
        </div>
      </div>
      <div className="rest-header__card">
        <img src={restaurant.image} alt={restaurant.name} className="rest-header__logo" />
        <div className="rest-header__info">
          <h1 className="rest-header__name">{restaurant.name}</h1>
          <p className="rest-header__location">- {restaurant.location}</p>
          <div className="rest-header__meta">
            <Star size={14} fill="#f59e0b" color="#f59e0b" />
            <span className="rest-header__rating">{restaurant.rating}</span>
            <span className="rest-header__reviews">({restaurant.reviews})</span>
          </div>
          <div className="rest-header__pricing">
            <span className="rest-header__discount">{restaurant.discountPrice}</span>
            <span className="rest-header__original">{restaurant.originalPrice}</span>
            <span className="rest-header__sep">·</span>
            <span className="rest-header__time">From {restaurant.deliveryTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
