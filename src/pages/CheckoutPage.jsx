import { ArrowLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice, deliveryOptions } from '../data/restaurant';
import { restaurant } from '../data/restaurant';
import OrderSummary from '../components/organisms/OrderSummary';
import DeliverySection from '../components/organisms/DeliverySection';
import PaymentSection from '../components/organisms/PaymentSection';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { subtotal, deliveryOption, ecoContribution } = useCart();

  const delivery = deliveryOptions.find((d) => d.id === deliveryOption) || deliveryOptions[0];
  const platformFee = 4500;
  const deliveryDiscount = -10000;
  const ecoFee = ecoContribution ? 200 : 0;
  const total = subtotal + delivery.discountPrice + platformFee + deliveryDiscount + ecoFee;
  const totalBeforeDiscount = subtotal + delivery.originalPrice + platformFee + ecoFee;
  const saved = totalBeforeDiscount - total;

  return (
    <div className="checkout-page">
      <div className="checkout-page__topbar">
        <button className="checkout-page__back" onClick={() => navigate('/')}>
          <ArrowLeft size={20} />
        </button>
        <div className="checkout-page__topbar-info">
          <p className="checkout-page__topbar-name">
            {restaurant.name} - {restaurant.location}
          </p>
          <p className="checkout-page__topbar-sub">
            Delivery fee calculated at 14.02.26 <Info size={12} />
          </p>
        </div>
      </div>

      <OrderSummary />

      <div className="checkout-page__divider" />
      <DeliverySection />

      <div className="checkout-page__divider" />
      <PaymentSection />

      <div className="checkout-page__footer">
        <div className="checkout-page__footer-total">
          <div>
            <p className="checkout-page__footer-label">Total</p>
            <p className="checkout-page__footer-saved">
              Yay, you&apos;ve saved {formatPrice(saved)}!
            </p>
          </div>
          <div className="checkout-page__footer-right">
            <p className="checkout-page__footer-amount">{formatPrice(total)}</p>
            <p className="checkout-page__footer-strike">{formatPrice(totalBeforeDiscount)}</p>
          </div>
        </div>
        <button className="checkout-page__place-order">Place Order</button>
      </div>
    </div>
  );
}
