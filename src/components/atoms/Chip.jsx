import './Chip.css';

export default function Chip({ icon, label, onClick }) {
  return (
    <button className="chip" onClick={onClick}>
      {icon && <span className="chip__icon">{icon}</span>}
      <span className="chip__label">{label}</span>
    </button>
  );
}
