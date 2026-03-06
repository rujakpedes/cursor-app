import { formatPrice } from '../atoms/PriceTag';
import './FeeRow.css';

export default function FeeRow({ label, amount, icon, isDiscount }) {
  return (
    <div className={`fee-row ${isDiscount ? 'fee-row--discount' : ''}`}>
      <span className="fee-row__label">
        {icon && <span className="fee-row__icon">{icon}</span>}
        {label}
      </span>
      <span className="fee-row__amount">
        {isDiscount ? `-${formatPrice(Math.abs(amount))}` : formatPrice(amount)}
      </span>
    </div>
  );
}
