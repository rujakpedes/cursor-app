import React from 'react';
import { Minus, Plus } from 'lucide-react';
import './QuantityControl.css';

interface QuantityControlProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  size?: 'sm' | 'md';
}

export const QuantityControl: React.FC<QuantityControlProps> = ({
  quantity,
  onIncrement,
  onDecrement,
  size = 'sm',
}) => (
  <div className={`qty qty--${size}`}>
    <button className="qty__btn" onClick={onDecrement} aria-label="Decrease quantity">
      <Minus size={size === 'sm' ? 14 : 16} />
    </button>
    <span className="qty__value">{quantity}</span>
    <button className="qty__btn" onClick={onIncrement} aria-label="Increase quantity">
      <Plus size={size === 'sm' ? 14 : 16} />
    </button>
  </div>
);
