import React from 'react';
import { useStore } from '../../context/StoreContext';
import { PromoCard } from '../molecules/PromoCard';
import './PromoStrip.css';

export const PromoStrip: React.FC = () => {
  const { promos } = useStore();

  if (promos.length === 0) return null;

  return (
    <div className="promo-strip">
      {promos.map((p) => (
        <PromoCard
          key={p.id}
          icon="🎉"
          text={p.description}
          subtext={p.minSpend ? `Min. spend Rp${p.minSpend.toLocaleString('id-ID')}` : ''}
        />
      ))}
    </div>
  );
};
