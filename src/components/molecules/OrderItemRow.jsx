import { formatPrice } from '../../utils/formatPrice';
import './OrderItemRow.css';

export default function OrderItemRow({ item, quantity }) {
  const total = item.price * quantity;

  return (
    <div className="order-item-row">
      <img src={item.image} alt={item.name} className="order-item-row__img" />
      <div className="order-item-row__details">
        <p className="order-item-row__name">{item.name}</p>
        <button className="order-item-row__edit">Edit</button>
      </div>
      <div className="order-item-row__right">
        <span className="order-item-row__price">{formatPrice(total)}</span>
        <span className="order-item-row__qty">{quantity}</span>
      </div>
    </div>
  );
}
