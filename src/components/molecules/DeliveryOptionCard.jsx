import PriceTag from '../atoms/PriceTag';
import './DeliveryOptionCard.css';

export default function DeliveryOptionCard({ option, selected, onSelect }) {
  return (
    <button
      className={`delivery-card ${selected ? 'delivery-card--selected' : ''}`}
      onClick={() => onSelect(option.id)}
    >
      <div className="delivery-card__left">
        <span className="delivery-card__name">{option.name}</span>
        {option.time && (
          <span className="delivery-card__time"> • {option.time}</span>
        )}
        {option.description && (
          <p className="delivery-card__desc">{option.description}</p>
        )}
      </div>
      {option.salePrice && (
        <div className="delivery-card__right">
          <PriceTag price={option.salePrice} originalPrice={option.originalPrice} size="sm" />
        </div>
      )}
    </button>
  );
}
