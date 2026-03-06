import React from 'react';
import './PriceDisplay.css';

interface PriceDisplayProps {
  amount: number;
  originalAmount?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function formatRupiah(amount: number): string {
  return `Rp${Math.abs(amount).toLocaleString('id-ID')}`;
}

export const PriceDisplay: React.FC<PriceDisplayProps> = ({
  amount,
  originalAmount,
  size = 'md',
}) => (
  <span className={`price price--${size}`}>
    {originalAmount ? (
      <>
        <span className="price__discount">{formatRupiah(amount)}</span>
        <span className="price__original">{formatRupiah(originalAmount)}</span>
      </>
    ) : (
      <span className="price__amount">{formatRupiah(amount)}</span>
    )}
  </span>
);
