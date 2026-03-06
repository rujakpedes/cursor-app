import React from 'react';
import './Badge.css';

interface BadgeProps {
  label: string;
  variant?: 'primary' | 'discount';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'primary' }) => (
  <span className={`badge badge--${variant}`}>{label}</span>
);
