import MenuItem from '../molecules/MenuItem';
import { menuItems } from '../../data/restaurant';
import './MenuGrid.css';

export default function MenuGrid() {
  return (
    <section className="menu-grid">
      <h2 className="menu-grid__title">For You</h2>
      <div className="menu-grid__items">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
