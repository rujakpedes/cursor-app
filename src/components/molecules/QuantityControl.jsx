import './QuantityControl.css';

export default function QuantityControl({ quantity, onAdd, onRemove }) {
  return (
    <div className="qty-control">
      <button className="qty-control__btn" onClick={onRemove}>−</button>
      <span className="qty-control__value">{quantity}</span>
      <button className="qty-control__btn" onClick={onAdd}>+</button>
    </div>
  );
}
