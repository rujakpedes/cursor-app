import './Toggle.css';

export default function Toggle({ checked, onChange }) {
  return (
    <button
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      onClick={onChange}
      role="switch"
      aria-checked={checked}
    >
      <span className="toggle__thumb" />
    </button>
  );
}
