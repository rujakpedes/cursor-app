import './IconButton.css';

export default function IconButton({ children, onClick, variant = 'default', className = '' }) {
  return (
    <button className={`icon-btn icon-btn--${variant} ${className}`} onClick={onClick}>
      {children}
    </button>
  );
}
