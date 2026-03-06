import React from 'react';
import './Toggle.css';

interface ToggleProps {
  checked: boolean;
  onChange: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => (
  <button
    className={`toggle ${checked ? 'toggle--on' : ''}`}
    onClick={onChange}
    role="switch"
    aria-checked={checked}
  >
    <span className="toggle__thumb" />
  </button>
);
