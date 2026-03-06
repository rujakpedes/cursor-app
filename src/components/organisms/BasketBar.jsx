import { ChevronDown } from 'lucide-react';
import { useCart } from '../../context/useCart';
import { formatPrice } from '../../data/restaurant';
import { useNavigate } from 'react-router-dom';
import './BasketBar.css';

export default function BasketBar() {
  const { totalItems, subtotal } = useCart();
  const navigate = useNavigate();

  if (totalItems === 0) return null;

  return (
    <div className="basket-bar__wrap">
      <button className="basket-bar__grab">
        <ChevronDown size={16} />
        <span>Grab More</span>
      </button>
      <button className="basket-bar" onClick={() => navigate('/checkout')}>
        <span className="basket-bar__label">
          Basket • {totalItems} Item{totalItems > 1 ? 's' : ''}
        </span>
        <span className="basket-bar__price">{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}
