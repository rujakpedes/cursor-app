import { useCart } from '../../context/useCart';
import { formatPrice, deliveryOptions } from '../../data/restaurant';
import CartItem from '../molecules/CartItem';
import FeeRow from '../molecules/FeeRow';
import Toggle from '../atoms/Toggle';
import Checkbox from '../atoms/Checkbox';
import './OrderSummary.css';

export default function OrderSummary() {
  const { items, subtotal, deliveryOption, ecoContribution, cutlery, toggleEco, toggleCutlery } =
    useCart();

  const delivery = deliveryOptions.find((d) => d.id === deliveryOption) || deliveryOptions[0];
  const platformFee = 4500;
  const deliveryDiscount = -10000;
  const ecoFee = ecoContribution ? 200 : 0;
  const total = subtotal + delivery.discountPrice + platformFee + deliveryDiscount + ecoFee;
  const totalBeforeDiscount = subtotal + delivery.originalPrice + platformFee + ecoFee;

  return (
    <div className="order-summary">
      <div className="order-summary__header">
        <h2 className="order-summary__title">Order Summary</h2>
        <button className="order-summary__add">Add Items</button>
      </div>

      <div className="order-summary__items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="order-summary__fees">
        <FeeRow label="Subtotal(Incl. Tax)" amount={formatPrice(subtotal)} />
        <FeeRow
          label="Delivery fee"
          icon="🛵"
          discount={formatPrice(delivery.discountPrice)}
          strikethrough={formatPrice(delivery.originalPrice)}
        />
        <FeeRow label="Platform fee" amount={formatPrice(platformFee)} />
        <FeeRow label="Priority delivery" amount={formatPrice(delivery.discountPrice)} />
        <FeeRow
          label="Delivery disc 10rb min 40rb, selected cities"
          icon="🎉"
          amount={formatPrice(deliveryDiscount)}
        />
      </div>

      <div className="order-summary__section">
        <h3 className="order-summary__section-title">Eco-friendly options</h3>
        <div className="order-summary__eco">
          <div>
            <p className="order-summary__eco-title">
              Green Programme Contribution • Rp200
            </p>
            <p className="order-summary__eco-desc">
              Reduce your carbon footprint with this voluntary contribution
            </p>
            <button className="order-summary__eco-link">
              See where your contributions go
            </button>
          </div>
          <Toggle checked={ecoContribution} onChange={toggleEco} />
        </div>
      </div>

      <div className="order-summary__cutlery">
        <span>Cutlery</span>
        <Checkbox checked={cutlery} onChange={toggleCutlery} />
      </div>

      <div className="order-summary__total">
        <div>
          <p className="order-summary__total-label">Total</p>
          <p className="order-summary__saved">
            Yay, you&apos;ve saved {formatPrice(totalBeforeDiscount - total)}!
          </p>
        </div>
        <div className="order-summary__total-right">
          <p className="order-summary__total-amount">{formatPrice(total)}</p>
          <p className="order-summary__total-strike">{formatPrice(totalBeforeDiscount)}</p>
        </div>
      </div>
    </div>
  );
}
