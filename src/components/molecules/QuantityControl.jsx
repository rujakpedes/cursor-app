import { Minus, Plus } from 'lucide-react';
import './QuantityControl.css';

export default function QuantityControl({ qty, onAdd, onRemove }) {
  return (
    <div className="qty-control">
      <button className="qty-control__btn" onClick={onRemove}>
        <Minus size={14} />
      </button>
      <span className="qty-control__value">{qty}</span>
      <button className="qty-control__btn" onClick={onAdd}>
        <Plus size={14} />
      </button>
    </div>
  );
}
