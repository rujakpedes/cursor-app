import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useStore } from '../../context/StoreContext';
import { CartItemRow } from '../molecules/CartItemRow';
import { Toggle } from '../atoms/Toggle';
import { Checkbox } from '../atoms/Checkbox';
import { formatRupiah } from '../atoms/PriceDisplay';
import './OrderSummary.css';

export const OrderSummary: React.FC = () => {
  const { state, dispatch, subtotal } = useCart();
  const { settings, deliveryOptions } = useStore();
  const navigate = useNavigate();

  if (!settings) return null;

  const selectedOpt = deliveryOptions.find((d) => d.id === state.deliveryType);
  const deliveryFee = selectedOpt?.fee ?? settings.deliveryFeeStandard;
  const platformFee = settings.platformFee;
  const prioritySurcharge = state.deliveryType === 'PRIORITY' ? settings.prioritySurcharge : 0;
  const greenFee = state.greenContribution ? 200 : 0;
  const discount = state.promoDiscount;

  const total = subtotal + deliveryFee + platformFee + prioritySurcharge + greenFee - discount;

  return (
    <div className="order-summary">
      <div className="order-summary__header">
        <h2 className="order-summary__title">Order Summary</h2>
        <button className="order-summary__add" onClick={() => navigate('/')}>Add Items</button>
      </div>

      <div className="order-summary__items">
        {state.items.map((ci) => (
          <CartItemRow key={ci.product.id} cartItem={ci} onEdit={() => navigate('/')} />
        ))}
      </div>

      <div className="order-summary__fees">
        <div className="fee-row"><span>Subtotal (Incl. Tax)</span><span>{formatRupiah(subtotal)}</span></div>
        <div className="fee-row"><span>Delivery fee</span><span>{formatRupiah(deliveryFee)}</span></div>
        <div className="fee-row"><span>Platform fee</span><span>{formatRupiah(platformFee)}</span></div>
        {prioritySurcharge > 0 && (
          <div className="fee-row"><span>Priority delivery</span><span>{formatRupiah(prioritySurcharge)}</span></div>
        )}
        {discount > 0 && (
          <div className="fee-row fee-row--discount"><span>Promo discount</span><span>-{formatRupiah(discount)}</span></div>
        )}
      </div>

      <div className="order-summary__section">
        <h3 className="order-summary__section-title">Eco-friendly options</h3>
        <div className="eco-row">
          <div>
            <p className="eco-row__title">Green Programme Contribution • Rp200</p>
            <p className="eco-row__desc">Reduce your carbon footprint with this voluntary contribution</p>
            <button className="eco-row__link">See where your contributions go</button>
          </div>
          <Toggle checked={state.greenContribution} onChange={() => dispatch({ type: 'TOGGLE_GREEN' })} />
        </div>
      </div>

      <div className="order-summary__section">
        <div className="cutlery-row">
          <span className="cutlery-row__label">Cutlery</span>
          <Checkbox checked={state.cutlery} onChange={() => dispatch({ type: 'TOGGLE_CUTLERY' })} />
        </div>
      </div>

      <div className="order-summary__total">
        <div className="total-row">
          <span className="total-row__label">Total</span>
          <div className="total-row__right">
            <span className="total-row__amount">{formatRupiah(total)}</span>
          </div>
        </div>
        {discount > 0 && (
          <p className="total-row__saved">Yay, you've saved {formatRupiah(discount)}!</p>
        )}
      </div>
    </div>
  );
};
