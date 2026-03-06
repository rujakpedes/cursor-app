import './Checkbox.css';
import { Check } from 'lucide-react';

export default function Checkbox({ checked, onChange }) {
  return (
    <button
      className={`checkbox ${checked ? 'checkbox--checked' : ''}`}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && <Check size={14} />}
    </button>
  );
}
