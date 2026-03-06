import Badge from '../atoms/Badge';
import IconButton from '../atoms/IconButton';
import QuantityControl from './QuantityControl';
import { formatPrice } from '../atoms/PriceTag';
import { useCart } from '../../context/CartContext';
import './MenuCard.css';

export default function MenuCard({ item }) {
  const { items, addItem, removeItem } = useCart();
  const quantity = items[item.id] || 0;

  const badgeVariant = item.badge === 'Most ordered' ? 'ordered' : 'liked';

  return (
    <div className="menu-card">
      <div className="menu-card__image-wrap">
        <Badge label={item.badge} variant={badgeVariant} />
        <img src={item.image} alt={item.name} className="menu-card__image" />
        <div className="menu-card__action">
          {quantity === 0 ? (
            <IconButton variant="primary" onClick={() => addItem(item.id)} label="Add">
              +
            </IconButton>
          ) : (
            <QuantityControl
              quantity={quantity}
              onAdd={() => addItem(item.id)}
              onRemove={() => removeItem(item.id)}
            />
          )}
        </div>
      </div>
      <div className="menu-card__info">
        <p className="menu-card__name">{item.name}</p>
        <p className="menu-card__price">{formatPrice(item.price)}</p>
      </div>
    </div>
  );
}
