import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../../data/types';
import { Badge } from '../atoms/Badge';
import { QuantityControl } from './QuantityControl';
import { formatRupiah } from '../atoms/PriceDisplay';
import './MenuItemCard.css';

interface MenuItemCardProps {
  product: Product;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

const PLACEHOLDER = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop';

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  product,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}) => (
  <div className="menu-card">
    <div className="menu-card__img-wrap">
      <img src={product.imageUrl || PLACEHOLDER} alt={product.name} className="menu-card__img" loading="lazy" />
      {product.badge && (
        <div className="menu-card__badge">
          <Badge label={product.badge} />
        </div>
      )}
      <div className="menu-card__action">
        {quantity === 0 ? (
          <button className="menu-card__add" onClick={onAdd} aria-label={`Add ${product.name}`}>
            <Plus size={18} color="white" />
          </button>
        ) : (
          <QuantityControl quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        )}
      </div>
    </div>
    <div className="menu-card__info">
      <p className="menu-card__name">{product.name}</p>
      <p className="menu-card__price">{formatRupiah(product.price)}</p>
    </div>
  </div>
);
