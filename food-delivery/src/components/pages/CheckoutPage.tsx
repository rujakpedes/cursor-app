import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import { OrderSummary } from '../organisms/OrderSummary';
import { DeliverySection } from '../organisms/DeliverySection';
import { PaymentSection } from '../organisms/PaymentSection';
import { formatRupiah } from '../atoms/PriceDisplay';
import { api } from '../../services/api';
import './CheckoutPage.css';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, subtotal, dispatch } = useCart();
  const { settings, deliveryOptions } = useStore();
  const { isLoggedIn, customer } = useAuth();
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [address, setAddress] = useState(customer?.address || '');
  const [phone, setPhone] = useState(customer?.phone || '');
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState('');

  if (!settings) return null;

  const selectedOpt = deliveryOptions.find((d) => d.id === state.deliveryType);
  const deliveryFee = selectedOpt?.fee ?? settings.deliveryFeeStandard;
  const prioritySurcharge = state.deliveryType === 'PRIORITY' ? settings.prioritySurcharge : 0;
  const greenFee = state.greenContribution ? 200 : 0;
  const discount = state.promoDiscount;
  const total = subtotal + deliveryFee + prioritySurcharge + greenFee - discount;

  const placeOrder = async () => {
    if (!isLoggedIn && !guestEmail) {
      setError('Please enter your email to place an order');
      return;
    }
    setPlacing(true);
    setError('');
    try {
      const res = await api.post<{ orderNumber: string }>('/orders', {
        items: state.items.map((ci) => ({ productId: ci.product.id, quantity: ci.quantity })),
        deliveryType: state.deliveryType,
        deliveryAddress: address,
        contactPhone: phone,
        cutlery: state.cutlery,
        greenContribution: state.greenContribution,
        notes: '',
        promoCode: state.promoCode || null,
        guestEmail: !isLoggedIn ? guestEmail : null,
        guestName: !isLoggedIn ? guestName : null,
      });
      dispatch({ type: 'CLEAR' });
      navigate(`/thank-you?order=${res.orderNumber}`);
    } catch (err: any) {
      setError(err.message || 'Failed to place order');
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <button className="checkout-page__back" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="checkout-page__title">{settings.storeName}</h1>
          <p className="checkout-page__sub">{settings.location}</p>
        </div>
      </header>

      <OrderSummary />
      <DeliverySection />

      {!isLoggedIn && (
        <div style={{ background: 'var(--color-white)', padding: 16, borderTop: '6px solid var(--color-off-white)' }}>
          <h3 style={{ marginBottom: 12, fontSize: 'var(--font-base)', fontWeight: 700 }}>Guest Information</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <input
              value={guestEmail} onChange={(e) => setGuestEmail(e.target.value)}
              placeholder="Email (required)" type="email"
              style={{ padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14 }}
            />
            <input
              value={guestName} onChange={(e) => setGuestName(e.target.value)}
              placeholder="Name (optional)"
              style={{ padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14 }}
            />
          </div>
        </div>
      )}

      <div style={{ background: 'var(--color-white)', padding: 16, borderTop: '6px solid var(--color-off-white)' }}>
        <h3 style={{ marginBottom: 12, fontSize: 'var(--font-base)', fontWeight: 700 }}>Delivery Details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input
            value={address} onChange={(e) => setAddress(e.target.value)}
            placeholder="Delivery address"
            style={{ padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14 }}
          />
          <input
            value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="Contact phone"
            style={{ padding: '10px 12px', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 14 }}
          />
        </div>
      </div>

      <PaymentSection />

      <div className="checkout-page__bottom">
        <div className="checkout-page__total-row">
          <div>
            <p className="checkout-page__total-label">Total</p>
            {discount > 0 && (
              <p className="checkout-page__saved">Yay, you've saved {formatRupiah(discount)}!</p>
            )}
          </div>
          <div className="checkout-page__total-right">
            <p className="checkout-page__total-amount">{formatRupiah(total)}</p>
          </div>
        </div>
        {error && <p style={{ color: 'var(--color-danger)', fontSize: 12, marginBottom: 8 }}>{error}</p>}
        <button className="checkout-page__order-btn" onClick={placeOrder} disabled={placing || state.items.length === 0}>
          {placing ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};
