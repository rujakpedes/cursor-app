import { Info } from 'lucide-react';
import './FeeRow.css';

export default function FeeRow({ label, amount, icon, discount, strikethrough }) {
  return (
    <div className="fee-row">
      <div className="fee-row__label">
        <span>{label}</span>
        {icon && <Info size={14} className="fee-row__info" />}
      </div>
      <div className="fee-row__amount">
        {icon && <span className="fee-row__icon">{icon}</span>}
        {discount ? (
          <>
            <span className="fee-row__discount">{discount}</span>
            {strikethrough && <span className="fee-row__strike">{strikethrough}</span>}
          </>
        ) : (
          <span className={amount?.startsWith('-') ? 'fee-row__negative' : ''}>
            {amount}
          </span>
        )}
      </div>
    </div>
  );
}
