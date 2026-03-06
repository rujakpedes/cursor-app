import PromoCard from '../molecules/PromoCard';
import { promos } from '../../data/restaurant';
import './PromoBar.css';

export default function PromoBar() {
  return (
    <div className="promo-bar">
      {promos.map((p) => (
        <PromoCard key={p.id} promo={p} />
      ))}
    </div>
  );
}
