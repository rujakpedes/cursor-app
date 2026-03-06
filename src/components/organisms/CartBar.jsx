import { useCart } from '../../context/useCart';
import { menuItems } from '../../data/restaurant';
import { formatPrice } from '../../utils/formatPrice';
import './CartBar.css';

export default function CartBar({ onCheckout }) {
  const { items, totalItems } = useCart();

  if (totalItems === 0) return null;

  const subtotal = Object.entries(items).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  return (
    <div className="cart-bar">
      <button className="cart-bar__grab">
        <span>▼</span> Grab More
      </button>
      <button className="cart-bar__main" onClick={onCheckout}>
        <span className="cart-bar__label">
          Basket • {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
        </span>
        <span className="cart-bar__total">Rp{formatPrice(subtotal)}</span>
      </button>
    </div>
  );
}
