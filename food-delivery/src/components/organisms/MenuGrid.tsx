import React from 'react';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { MenuItemCard } from '../molecules/MenuItemCard';
import './MenuGrid.css';

export const MenuGrid: React.FC = () => {
  const { products, loading } = useStore();
  const { state, dispatch } = useCart();

  const getQuantity = (id: number) => {
    const ci = state.items.find((c) => c.product.id === id);
    return ci ? ci.quantity : 0;
  };

  if (loading) return <div style={{ padding: 32, textAlign: 'center' }}>Loading menu...</div>;

  return (
    <section className="menu-grid-section">
      <h2 className="menu-grid__title">For You</h2>
      <div className="menu-grid">
        {products.map((product) => (
          <MenuItemCard
            key={product.id}
            product={product}
            quantity={getQuantity(product.id)}
            onAdd={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            onIncrement={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            onDecrement={() => dispatch({ type: 'REMOVE_ITEM', payload: product.id })}
          />
        ))}
      </div>
      {products.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: 'var(--color-text-muted)', padding: 32 }}>
          No products available yet.
        </p>
      )}
    </section>
  );
};
