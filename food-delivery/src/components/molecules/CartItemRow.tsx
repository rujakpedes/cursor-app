import React from 'react';
import { CartItem } from '../../context/CartContext';
import { formatRupiah } from '../atoms/PriceDisplay';
import './CartItemRow.css';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop';

interface CartItemRowProps {
  cartItem: CartItem;
  onEdit: () => void;
}

export const CartItemRow: React.FC<CartItemRowProps> = ({ cartItem, onEdit }) => (
  <div className="cart-row">
    <img src={cartItem.product.imageUrl || PLACEHOLDER} alt={cartItem.product.name} className="cart-row__img" />
    <div className="cart-row__info">
      <p className="cart-row__name">{cartItem.product.name}</p>
      <button className="cart-row__edit" onClick={onEdit}>Edit</button>
    </div>
    <div className="cart-row__right">
      <p className="cart-row__price">{formatRupiah(cartItem.product.price * cartItem.quantity)}</p>
      <span className="cart-row__qty">{cartItem.quantity}</span>
    </div>
  </div>
);
