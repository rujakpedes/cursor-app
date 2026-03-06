import { useCart } from '../../context/CartContext';
import { deliveryOptions, restaurant } from '../../data/restaurant';
import DeliveryOptionCard from '../molecules/DeliveryOptionCard';
import './DeliverySection.css';

export default function DeliverySection() {
  const { deliveryOption, setDelivery } = useCart();

  return (
    <div className="delivery-section">
      <div className="delivery-section__header">
        <span className="delivery-section__icon">📦</span>
        <div>
          <h3 className="delivery-section__title">Delivery options</h3>
          <p className="delivery-section__distance">
            Distance from you: {restaurant.distance}
          </p>
        </div>
      </div>
      <div className="delivery-section__options">
        {deliveryOptions.map((opt) => (
          <DeliveryOptionCard
            key={opt.id}
            option={opt}
            selected={deliveryOption === opt.id}
            onSelect={setDelivery}
          />
        ))}
      </div>
    </div>
  );
}
