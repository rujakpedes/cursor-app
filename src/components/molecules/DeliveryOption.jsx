import { Clock, Info } from 'lucide-react';
import { formatPrice } from '../../data/restaurant';
import './DeliveryOption.css';

export default function DeliveryOption({ option, selected, onSelect }) {
  const isSelected = selected === option.id;

  return (
    <button
      className={`delivery-opt ${isSelected ? 'delivery-opt--active' : ''}`}
      onClick={() => onSelect(option.id)}
    >
      <div className="delivery-opt__left">
        <div className="delivery-opt__radio">
          {isSelected && <div className="delivery-opt__radio-dot" />}
        </div>
        <div>
          <div className="delivery-opt__label">
            {option.id === 'priority' && <Clock size={14} className="delivery-opt__clock" />}
            <span className="delivery-opt__name">{option.label}</span>
            <span className="delivery-opt__sep">•</span>
            <span className="delivery-opt__time">{option.time}</span>
            {option.info && <Info size={14} className="delivery-opt__info-icon" />}
          </div>
          {option.info && <p className="delivery-opt__info">{option.info}</p>}
        </div>
      </div>
      <div className="delivery-opt__price">
        <span className="delivery-opt__discount">{formatPrice(option.discountPrice)}</span>
        <span className="delivery-opt__original">{formatPrice(option.originalPrice)}</span>
      </div>
    </button>
  );
}
