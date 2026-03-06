import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './ThankYouPage.css';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderNumber = params.get('order');

  return (
    <div className="thankyou-page">
      <div className="thankyou-card">
        <CheckCircle size={64} color="var(--color-primary)" />
        <h1>Thank You!</h1>
        <p>Your order has been placed successfully.</p>
        {orderNumber && (
          <p className="thankyou-order">Order #{orderNumber}</p>
        )}
        <p className="thankyou-sub">
          You will receive an email confirmation shortly.
        </p>
        <div className="thankyou-actions">
          {orderNumber && (
            <button className="thankyou-btn thankyou-btn--outline"
              onClick={() => navigate(`/track/${orderNumber}`)}>
              Track Order
            </button>
          )}
          <button className="thankyou-btn thankyou-btn--primary"
            onClick={() => navigate('/')}>
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};
