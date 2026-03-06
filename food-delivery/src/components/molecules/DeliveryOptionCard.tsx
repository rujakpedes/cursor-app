import React from 'react';
import { Clock, Info } from 'lucide-react';
import { DeliveryOption } from '../../data/menuData';
import { formatRupiah } from '../atoms/PriceDisplay';
import './DeliveryOptionCard.css';

interface DeliveryOptionCardProps {
  option: DeliveryOption;
  selected: boolean;
  onSelect: () => void;
}

export const DeliveryOptionCard: React.FC<DeliveryOptionCardProps> = ({
  option,
  selected,
  onSelect,
}) => (
  <button
    className={`delivery-opt ${selected ? 'delivery-opt--selected' : ''}`}
    onClick={onSelect}
  >
    <div className="delivery-opt__left">
      <div className="delivery-opt__header">
        {option.isRecommended && <Clock size={16} color="var(--color-primary)" />}
        <span className="delivery-opt__label">{option.label}</span>
        <span className="delivery-opt__dot">•</span>
        <span className="delivery-opt__time">{option.time}</span>
        {option.description && <Info size={14} color="var(--color-text-muted)" />}
      </div>
      {option.description && (
        <p className="delivery-opt__desc">{option.description}</p>
      )}
    </div>
    <div className="delivery-opt__prices">
      <span className="delivery-opt__sale">{formatRupiah(option.discountPrice)}</span>
      <span className="delivery-opt__orig">{formatRupiah(option.originalPrice)}</span>
    </div>
  </button>
);
