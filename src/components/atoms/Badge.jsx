import './Badge.css';

export default function Badge({ label, variant = 'ordered' }) {
  if (!label) return null;
  return <span className={`badge badge--${variant}`}>{label}</span>;
}
