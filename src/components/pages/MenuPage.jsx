import { useNavigate } from 'react-router-dom';
import TopBar from '../organisms/TopBar';
import RestaurantHeader from '../organisms/RestaurantHeader';
import MenuGrid from '../organisms/MenuGrid';
import CartBar from '../organisms/CartBar';
import Chip from '../atoms/Chip';
import PromoCard from '../molecules/PromoCard';
import { restaurant, promos, menuItems } from '../../data/restaurant';
import './MenuPage.css';

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <div className="menu-page">
      <div className="menu-page__hero">
        <TopBar />
      </div>

      <RestaurantHeader restaurant={restaurant} />

      <div className="menu-page__chips">
        <Chip icon="👥" label="Group Order" />
        <Chip icon="📅" label="Order for Later" />
        <Chip icon="🌐" label="Menu language" />
      </div>

      <div className="menu-page__promos">
        {promos.map((p) => (
          <PromoCard key={p.id} icon={p.icon} text={p.text} subtext={p.subtext} />
        ))}
      </div>

      <MenuGrid items={menuItems} />

      <div className="menu-page__cart-spacer" />
      <CartBar onCheckout={() => navigate('/checkout')} />
    </div>
  );
}
