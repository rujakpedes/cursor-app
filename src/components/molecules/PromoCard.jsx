import './PromoCard.css';

export default function PromoCard({ icon, text, subtext }) {
  return (
    <div className="promo-card">
      <span className="promo-card__icon">{icon}</span>
      <div className="promo-card__content">
        <p className="promo-card__text">{text}</p>
        <p className="promo-card__subtext">{subtext}</p>
      </div>
    </div>
  );
}
