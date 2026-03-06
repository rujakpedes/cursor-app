import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatRupiah } from '../atoms/PriceDisplay';
import './BottomBasketBar.css';

export const BottomBasketBar: React.FC = () => {
  const { totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <div className="basket-bar-wrap">
      <button className="basket-bar__grab">
        <ChevronDown size={16} />
        <span>Grab More</span>
      </button>
      <button className="basket-bar" onClick={() => navigate('/checkout')}>
        <span className="basket-bar__label">
          Basket • {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
        <span className="basket-bar__total">{formatRupiah(subtotal)}</span>
      </button>
    </div>
  );
};
