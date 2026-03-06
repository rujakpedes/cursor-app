import { Plus } from 'lucide-react';
import Badge from '../atoms/Badge';
import QuantityControl from './QuantityControl';
import { useCart } from '../../context/useCart';
import { formatPrice } from '../../data/restaurant';
import './MenuItem.css';

export default function MenuItem({ item }) {
  const { items, addItem, removeItem } = useCart();
  const cartItem = items.find((i) => i.id === item.id);
  const qty = cartItem?.qty || 0;

  return (
    <div className="menu-item">
      <div className="menu-item__img-wrap">
        <img src={item.image} alt={item.name} className="menu-item__img" />
        {item.badge && (
          <div className="menu-item__badge">
            <Badge
              text={item.badge}
              variant={item.badge === 'Most ordered' ? 'orange' : 'green'}
            />
          </div>
        )}
        <div className="menu-item__action">
          {qty === 0 ? (
            <button className="menu-item__add" onClick={() => addItem(item)}>
              <Plus size={16} />
            </button>
          ) : (
            <QuantityControl
              qty={qty}
              onAdd={() => addItem(item)}
              onRemove={() => removeItem(item.id)}
            />
          )}
        </div>
      </div>
      <p className="menu-item__name">{item.name}</p>
      <p className="menu-item__price">{formatPrice(item.price)}</p>
    </div>
  );
}
