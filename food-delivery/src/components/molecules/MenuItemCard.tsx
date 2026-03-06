import React from 'react';
import { Plus } from 'lucide-react';
import { MenuItem } from '../../data/menuData';
import { Badge } from '../atoms/Badge';
import { QuantityControl } from './QuantityControl';
import { formatRupiah } from '../atoms/PriceDisplay';
import './MenuItemCard.css';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  quantity,
  onAdd,
  onIncrement,
  onDecrement,
}) => (
  <div className="menu-card">
    <div className="menu-card__img-wrap">
      <img src={item.image} alt={item.name} className="menu-card__img" loading="lazy" />
      {item.badge && (
        <div className="menu-card__badge">
          <Badge label={item.badge} />
        </div>
      )}
      <div className="menu-card__action">
        {quantity === 0 ? (
          <button className="menu-card__add" onClick={onAdd} aria-label={`Add ${item.name}`}>
            <Plus size={18} color="white" />
          </button>
        ) : (
          <QuantityControl quantity={quantity} onIncrement={onIncrement} onDecrement={onDecrement} />
        )}
      </div>
    </div>
    <div className="menu-card__info">
      <p className="menu-card__name">{item.name}</p>
      <p className="menu-card__price">{formatRupiah(item.price)}</p>
    </div>
  </div>
);
