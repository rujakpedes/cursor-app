import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { OrderSummary } from '../organisms/OrderSummary';
import { DeliverySection } from '../organisms/DeliverySection';
import { PaymentSection } from '../organisms/PaymentSection';
import { formatRupiah } from '../atoms/PriceDisplay';
import { deliveryOptions } from '../../data/menuData';
import './CheckoutPage.css';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state, subtotal } = useCart();

  const selectedDelivery = deliveryOptions.find((d) => d.id === state.deliveryOptionId);
  const deliveryFee = selectedDelivery?.discountPrice ?? 21000;
  const platformFee = 4500;
  const priorityFee = state.deliveryOptionId === 'priority' ? 4000 : 0;
  const deliveryDiscount = subtotal >= 40000 ? -10000 : 0;
  const greenFee = state.greenContribution ? 200 : 0;
  const total = subtotal + deliveryFee + platformFee + priorityFee + deliveryDiscount + greenFee;
  const originalTotal = total - deliveryDiscount;

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <button className="checkout-page__back" onClick={() => navigate('/')} aria-label="Go back">
          <ArrowLeft size={22} />
        </button>
        <div>
          <h1 className="checkout-page__title">Pisang Ijo Cendana - Grand Lucky SCBD</h1>
          <p className="checkout-page__sub">
            Delivery fee calculated at {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
            <Info size={12} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
          </p>
        </div>
      </header>

      <OrderSummary />
      <DeliverySection />
      <PaymentSection />

      <div className="checkout-page__bottom">
        <div className="checkout-page__total-row">
          <div>
            <p className="checkout-page__total-label">Total</p>
            {deliveryDiscount < 0 && (
              <p className="checkout-page__saved">
                Yay, you've saved {formatRupiah(Math.abs(deliveryDiscount))}!
              </p>
            )}
          </div>
          <div className="checkout-page__total-right">
            <p className="checkout-page__total-amount">{formatRupiah(total)}</p>
            {deliveryDiscount < 0 && (
              <p className="checkout-page__total-orig">{formatRupiah(originalTotal)}</p>
            )}
          </div>
        </div>
        <button className="checkout-page__order-btn">Place Order</button>
      </div>
    </div>
  );
};
