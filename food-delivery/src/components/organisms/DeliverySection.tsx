import React from 'react';
import { MapPin } from 'lucide-react';
import { deliveryOptions } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { DeliveryOptionCard } from '../molecules/DeliveryOptionCard';
import './DeliverySection.css';

export const DeliverySection: React.FC = () => {
  const { state, dispatch } = useCart();

  return (
    <div className="delivery-section">
      <div className="delivery-section__header">
        <MapPin size={18} color="var(--color-primary)" />
        <div>
          <p className="delivery-section__label">Delivery options</p>
          <p className="delivery-section__sub">Distance from you: 0.8 km</p>
        </div>
      </div>
      <div className="delivery-section__options">
        {deliveryOptions.map((opt) => (
          <DeliveryOptionCard
            key={opt.id}
            option={opt}
            selected={state.deliveryOptionId === opt.id}
            onSelect={() => dispatch({ type: 'SET_DELIVERY', payload: opt.id })}
          />
        ))}
        <button className="delivery-section__later">Order for later</button>
      </div>
    </div>
  );
};
