import { ChevronRight, CreditCard, Tag } from 'lucide-react';
import './PaymentSection.css';

export default function PaymentSection() {
  return (
    <div className="payment-section">
      <div className="payment-section__group">
        <h3 className="payment-section__title">Payment details</h3>
        <button className="payment-section__row">
          <div className="payment-section__row-left">
            <div className="payment-section__method-icon">
              <CreditCard size={18} />
            </div>
            <div>
              <p className="payment-section__method">Personal</p>
              <p className="payment-section__balance">Rp99.175</p>
            </div>
          </div>
          <ChevronRight size={18} className="payment-section__chevron" />
        </button>
      </div>

      <div className="payment-section__group">
        <h3 className="payment-section__title">Offers</h3>
        <button className="payment-section__row">
          <div className="payment-section__row-left">
            <Tag size={18} className="payment-section__tag" />
            <span className="payment-section__promo-text">Use offers or promo code</span>
          </div>
          <ChevronRight size={18} className="payment-section__chevron" />
        </button>
      </div>
    </div>
  );
}
