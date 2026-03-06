import './Badge.css';

export default function Badge({ text, variant = 'orange' }) {
  if (!text) return null;
  return <span className={`badge badge--${variant}`}>{text}</span>;
}
