import './PromoCard.css';

export default function PromoCard({ promo }) {
  return (
    <div className="promo-card">
      <span className="promo-card__icon">{promo.icon}</span>
      <div>
        <p className="promo-card__text">{promo.text}</p>
        <p className="promo-card__sub">{promo.sub}</p>
      </div>
    </div>
  );
}
