import { useNavigate } from 'react-router-dom';
import TopBar from '../organisms/TopBar';
import OrderSummary from '../organisms/OrderSummary';
import DeliverySection from '../organisms/DeliverySection';
import PaymentSection from '../organisms/PaymentSection';
import { useCart } from '../../context/useCart';
import { menuItems, fees, deliveryOptions } from '../../data/restaurant';
import { formatPrice } from '../../utils/formatPrice';
import './CheckoutPage.css';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, deliveryOption, greenContribution } = useCart();

  const subtotal = Object.entries(items).reduce((sum, [id, qty]) => {
    const item = menuItems.find((m) => m.id === Number(id));
    return sum + (item ? item.price * qty : 0);
  }, 0);

  const selectedDelivery = deliveryOptions.find((d) => d.id === deliveryOption);
  const deliveryFee = selectedDelivery?.salePrice || 0;

  const total =
    subtotal +
    deliveryFee +
    fees.platformFee +
    fees.priorityDelivery +
    fees.deliveryDiscount +
    (greenContribution ? fees.greenContribution : 0);

  const originalTotal = total - fees.deliveryDiscount;
  const savings = Math.abs(fees.deliveryDiscount);

  return (
    <div className="checkout-page">
      <TopBar
        onBack={() => navigate('/')}
        title="Pisang Ijo Cendana - Grand Lucky SCBD"
        subtitle="Delivery fee calculated at 14.02.26"
      />

      <OrderSummary />
      <DeliverySection />
      <PaymentSection />

      <div className="checkout-page__footer">
        <div className="checkout-page__total">
          <span>Total</span>
          <span className="checkout-page__total-price">Rp{formatPrice(total)}</span>
        </div>
        <div className="checkout-page__savings">
          <span>Yay, you've saved Rp{formatPrice(savings)}!</span>
          <span className="checkout-page__original">Rp{formatPrice(originalTotal)}</span>
        </div>
        <button className="checkout-page__place-btn">Place Order</button>
      </div>
    </div>
  );
}
