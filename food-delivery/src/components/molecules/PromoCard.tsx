import React from 'react';
import './PromoCard.css';

interface PromoCardProps {
  icon: string;
  text: string;
  subtext: string;
}

export const PromoCard: React.FC<PromoCardProps> = ({ icon, text, subtext }) => (
  <div className="promo-card">
    <span className="promo-card__icon">{icon}</span>
    <div>
      <p className="promo-card__text">{text}</p>
      <p className="promo-card__sub">{subtext}</p>
    </div>
  </div>
);
