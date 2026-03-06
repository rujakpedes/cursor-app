import MenuCard from '../molecules/MenuCard';
import './MenuGrid.css';

export default function MenuGrid({ items }) {
  return (
    <section className="menu-grid">
      <h2 className="menu-grid__title">For You</h2>
      <div className="menu-grid__list">
        {items.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
