import React from 'react';
import { ChevronRight, Wallet, Tag } from 'lucide-react';
import './PaymentSection.css';

export const PaymentSection: React.FC = () => (
  <div className="payment-section">
    <div className="payment-section__block">
      <h3 className="payment-section__title">Payment details</h3>
      <button className="payment-section__row">
        <div className="payment-section__row-left">
          <Wallet size={20} color="var(--color-primary)" />
          <div>
            <p className="payment-section__row-label">Personal</p>
            <p className="payment-section__row-sub">Rp99.175</p>
          </div>
        </div>
        <ChevronRight size={20} color="var(--color-text-muted)" />
      </button>
    </div>

    <div className="payment-section__block">
      <h3 className="payment-section__title">Offers</h3>
      <button className="payment-section__row">
        <div className="payment-section__row-left">
          <Tag size={20} color="var(--color-primary)" />
          <p className="payment-section__row-label">Use offers or promo code</p>
        </div>
        <ChevronRight size={20} color="var(--color-text-muted)" />
      </button>
    </div>
  </div>
);
