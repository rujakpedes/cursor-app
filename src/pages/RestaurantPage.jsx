import { Users, Calendar, Globe } from 'lucide-react';
import RestaurantHeader from '../components/organisms/RestaurantHeader';
import ActionChip from '../components/molecules/ActionChip';
import PromoBar from '../components/organisms/PromoBar';
import MenuGrid from '../components/organisms/MenuGrid';
import BasketBar from '../components/organisms/BasketBar';
import './RestaurantPage.css';

export default function RestaurantPage() {
  return (
    <div className="restaurant-page">
      <RestaurantHeader />
      <div className="restaurant-page__chips">
        <ActionChip icon={<Users size={14} />} label="Group Order" />
        <ActionChip icon={<Calendar size={14} />} label="Order for Later" />
        <ActionChip icon={<Globe size={14} />} label="Menu language" />
      </div>
      <PromoBar />
      <MenuGrid />
      <BasketBar />
    </div>
  );
}
