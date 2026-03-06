import { formatPrice } from '../../data/restaurant';
import './CartItem.css';

export default function CartItem({ item }) {
  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item__img" />
      <div className="cart-item__info">
        <p className="cart-item__name">{item.name}</p>
        <button className="cart-item__edit">Edit</button>
      </div>
      <div className="cart-item__right">
        <p className="cart-item__price">{formatPrice(item.price * item.qty)}</p>
        <div className="cart-item__qty">{item.qty}</div>
      </div>
    </div>
  );
}
