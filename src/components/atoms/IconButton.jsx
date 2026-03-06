import './IconButton.css';

export default function IconButton({ children, onClick, variant = 'default', label }) {
  return (
    <button
      className={`icon-btn icon-btn--${variant}`}
      onClick={onClick}
      aria-label={label}
    >
      {children}
    </button>
  );
}
