import React, { ReactNode } from 'react';
import './ActionChip.css';

interface ActionChipProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

export const ActionChip: React.FC<ActionChipProps> = ({ icon, label, onClick }) => (
  <button className="action-chip" onClick={onClick}>
    {icon}
    <span>{label}</span>
  </button>
);
