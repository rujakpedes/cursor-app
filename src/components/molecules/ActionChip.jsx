import './ActionChip.css';

export default function ActionChip({ icon, label }) {
  return (
    <button className="action-chip">
      {icon}
      <span>{label}</span>
    </button>
  );
}
