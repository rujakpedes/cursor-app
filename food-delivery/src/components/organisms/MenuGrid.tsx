import React from 'react';
import { menuItems } from '../../data/menuData';
import { useCart } from '../../context/CartContext';
import { MenuItemCard } from '../molecules/MenuItemCard';
import './MenuGrid.css';

export const MenuGrid: React.FC = () => {
  const { state, dispatch } = useCart();

  const getQuantity = (id: string) => {
    const ci = state.items.find((c) => c.item.id === id);
    return ci ? ci.quantity : 0;
  };

  return (
    <section className="menu-grid-section">
      <h2 className="menu-grid__title">For You</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
          <MenuItemCard
            key={item.id}
            item={item}
            quantity={getQuantity(item.id)}
            onAdd={() => dispatch({ type: 'ADD_ITEM', payload: item })}
            onIncrement={() => dispatch({ type: 'ADD_ITEM', payload: item })}
            onDecrement={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
          />
        ))}
      </div>
    </section>
  );
};
