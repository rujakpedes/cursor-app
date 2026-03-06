import React from 'react';
import { Check } from 'lucide-react';
import './Checkbox.css';

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  label?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label }) => (
  <label className="checkbox">
    <button
      className={`checkbox__box ${checked ? 'checkbox__box--checked' : ''}`}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
    >
      {checked && <Check size={14} color="white" />}
    </button>
    {label && <span className="checkbox__label">{label}</span>}
  </label>
);
