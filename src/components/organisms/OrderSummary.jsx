import { useCart } from '../../context/CartContext';
import { menuItems, fees, deliveryOptions } from '../../data/restaurant';
import OrderItemRow from '../molecules/OrderItemRow';
import FeeRow from '../molecules/FeeRow';
import Toggle from '../atoms/Toggle';
import { formatPrice } from '../atoms/PriceTag';
import './OrderSummary.css';

export default function OrderSummary() {
  const {
    items,
    deliveryOption,
    greenContribution,
    cutlery,
    toggleGreen,
    toggleCutlery,
  } = useCart();

  const cartItems = Object.entries(items).map(([id, qty]) => ({
    item: menuItems.find((m) => m.id === Number(id)),
    quantity: qty,
  })).filter(({ item }) => item);

  const subtotal = cartItems.reduce((s, { item, quantity }) => s + item.price * quantity, 0);
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
    <div className="order-summary">
      <div className="order-summary__section">
        <div className="order-summary__header">
          <h2 className="order-summary__title">Order Summary</h2>
          <button className="order-summary__add">Add Items</button>
        </div>

        {cartItems.map(({ item, quantity }) => (
          <OrderItemRow key={item.id} item={item} quantity={quantity} />
        ))}
      </div>

      <div className="order-summary__section order-summary__fees">
        <FeeRow label="Subtotal(Incl. Tax)" amount={subtotal} />
        <FeeRow label="Delivery fee" amount={deliveryFee} icon="🚴" />
        <FeeRow label="Platform fee" amount={fees.platformFee} />
        <FeeRow label="Priority delivery" amount={fees.priorityDelivery} />
        <FeeRow
          label={fees.deliveryDiscountLabel}
          amount={fees.deliveryDiscount}
          icon="🎉"
          isDiscount
        />
      </div>

      <div className="order-summary__section">
        <h3 className="order-summary__subtitle">Eco-friendly options</h3>
        <div className="order-summary__eco">
          <div className="order-summary__eco-info">
            <p className="order-summary__eco-title">
              Green Programme Contribution • Rp{formatPrice(fees.greenContribution)}
            </p>
            <p className="order-summary__eco-desc">
              Reduce your carbon footprint with this voluntary contribution
            </p>
            <button className="order-summary__eco-link">
              See where your contributions go
            </button>
          </div>
          <Toggle checked={greenContribution} onChange={toggleGreen} />
        </div>
      </div>

      <div className="order-summary__section order-summary__cutlery">
        <span>Cutlery</span>
        <input
          type="checkbox"
          checked={cutlery}
          onChange={toggleCutlery}
          className="order-summary__checkbox"
        />
      </div>

      <div className="order-summary__total-section">
        <div className="order-summary__total">
          <span>Total</span>
          <span className="order-summary__total-price">Rp{formatPrice(total)}</span>
        </div>
        <div className="order-summary__savings">
          <span>Yay, you've saved Rp{formatPrice(savings)}!</span>
          <span className="order-summary__original">Rp{formatPrice(originalTotal)}</span>
        </div>
      </div>
    </div>
  );
}
