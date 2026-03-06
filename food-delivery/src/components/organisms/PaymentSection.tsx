import React, { useState } from 'react';
import { ChevronRight, Wallet, Tag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import './PaymentSection.css';

export const PaymentSection: React.FC = () => {
  const { state, dispatch, subtotal } = useCart();
  const { customer } = useAuth();
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [showPromo, setShowPromo] = useState(false);

  const applyPromo = async () => {
    setPromoError('');
    try {
      const res = await api.post<{ discountAmount: number; code: string }>('/promos/validate', {
        code: promoInput,
        subtotal,
      });
      dispatch({ type: 'SET_PROMO', payload: { code: res.code, discount: res.discountAmount } });
      setShowPromo(false);
    } catch (err: any) {
      setPromoError(err.message || 'Invalid promo code');
    }
  };

  return (
    <div className="payment-section">
      <div className="payment-section__block">
        <h3 className="payment-section__title">Payment details</h3>
        <button className="payment-section__row">
          <div className="payment-section__row-left">
            <Wallet size={20} color="var(--color-primary)" />
            <div>
              <p className="payment-section__row-label">{customer ? 'Personal' : 'Guest Checkout'}</p>
              {customer && <p className="payment-section__row-sub">{customer.email}</p>}
            </div>
          </div>
          <ChevronRight size={20} color="var(--color-text-muted)" />
        </button>
      </div>

      <div className="payment-section__block">
        <h3 className="payment-section__title">Offers</h3>
        {state.promoCode ? (
          <div className="payment-section__row">
            <div className="payment-section__row-left">
              <Tag size={20} color="var(--color-primary)" />
              <p className="payment-section__row-label">
                {state.promoCode} — Rp{state.promoDiscount.toLocaleString('id-ID')} off
              </p>
            </div>
            <button onClick={() => dispatch({ type: 'CLEAR_PROMO' })}
              style={{ color: 'var(--color-primary)', fontWeight: 600, fontSize: 14 }}>
              Remove
            </button>
          </div>
        ) : (
          <>
            <button className="payment-section__row" onClick={() => setShowPromo(!showPromo)}>
              <div className="payment-section__row-left">
                <Tag size={20} color="var(--color-primary)" />
                <p className="payment-section__row-label">Use offers or promo code</p>
              </div>
              <ChevronRight size={20} color="var(--color-text-muted)" />
            </button>
            {showPromo && (
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <input
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                  placeholder="Enter promo code"
                  style={{ flex: 1, padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14 }}
                />
                <button onClick={applyPromo}
                  style={{ padding: '10px 16px', background: 'var(--color-primary)', color: 'white', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                  Apply
                </button>
              </div>
            )}
            {promoError && (
              <p style={{ color: 'var(--color-danger)', fontSize: 12, marginTop: 4 }}>{promoError}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};
