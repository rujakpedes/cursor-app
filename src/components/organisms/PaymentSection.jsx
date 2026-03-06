import './PaymentSection.css';

export default function PaymentSection() {
  return (
    <div className="payment-section">
      <h3 className="payment-section__title">Payment details</h3>
      <button className="payment-section__method">
        <div className="payment-section__method-left">
          <span className="payment-section__method-icon">💳</span>
          <div>
            <p className="payment-section__method-name">Personal</p>
            <p className="payment-section__method-balance">Rp99.175</p>
          </div>
        </div>
        <span className="payment-section__arrow">›</span>
      </button>

      <h3 className="payment-section__title" style={{ marginTop: 20 }}>Offers</h3>
      <button className="payment-section__method">
        <div className="payment-section__method-left">
          <span className="payment-section__method-icon">🏷️</span>
          <p className="payment-section__method-name">Use offers or promo code</p>
        </div>
        <span className="payment-section__arrow">›</span>
      </button>
    </div>
  );
}
