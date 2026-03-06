import { MapPin } from 'lucide-react';
import DeliveryOption from '../molecules/DeliveryOption';
import { deliveryOptions } from '../../data/restaurant';
import { useCart } from '../../context/useCart';
import './DeliverySection.css';

export default function DeliverySection() {
  const { deliveryOption, setDelivery } = useCart();

  return (
    <div className="delivery-section">
      <div className="delivery-section__header">
        <MapPin size={18} className="delivery-section__icon" />
        <div>
          <p className="delivery-section__title">Delivery options</p>
          <p className="delivery-section__sub">Distance from you: 0.8 km</p>
        </div>
      </div>
      <div className="delivery-section__options">
        {deliveryOptions.map((opt) => (
          <DeliveryOption
            key={opt.id}
            option={opt}
            selected={deliveryOption}
            onSelect={setDelivery}
          />
        ))}
        <button className="delivery-section__later">Order for later</button>
      </div>
    </div>
  );
}
