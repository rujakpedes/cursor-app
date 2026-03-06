import React from 'react';
import { promos } from '../../data/menuData';
import { PromoCard } from '../molecules/PromoCard';
import './PromoStrip.css';

export const PromoStrip: React.FC = () => (
  <div className="promo-strip">
    {promos.map((p) => (
      <PromoCard key={p.id} icon={p.icon} text={p.text} subtext={p.subtext} />
    ))}
  </div>
);
