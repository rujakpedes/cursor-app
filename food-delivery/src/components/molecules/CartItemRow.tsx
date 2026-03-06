import React from 'react';
import { CartItem } from '../../context/CartContext';
import { formatRupiah } from '../atoms/PriceDisplay';
import './CartItemRow.css';

interface CartItemRowProps {
  cartItem: CartItem;
  onEdit: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ cartItem, onEdit }) => (
  <div className="cart-row">
    <img src={cartItem.item.image} alt={cartItem.item.name} className="cart-row__img" />
    <div className="cart-row__info">
      <p className="cart-row__name">{cartItem.item.name}</p>
      <button className="cart-row__edit" onClick={onEdit}>
        Edit
      </button>
    </div>
    <div className="cart-row__right">
      <p className="cart-row__price">{formatRupiah(cartItem.item.price * cartItem.quantity)}</p>
      <span className="cart-row__qty">{cartItem.quantity}</span>
    </div>
  </div>
);
