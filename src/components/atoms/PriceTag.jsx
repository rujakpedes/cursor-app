import { formatPrice } from '../../utils/formatPrice';
import './PriceTag.css';

export default function PriceTag({ price, originalPrice, size = 'md' }) {
  return (
    <span className={`price-tag price-tag--${size}`}>
      {originalPrice && originalPrice !== price ? (
        <>
          <span className="price-tag__sale">{formatPrice(price)}</span>
          <span className="price-tag__original">{formatPrice(originalPrice)}</span>
        </>
      ) : (
        <span className="price-tag__normal">{formatPrice(price)}</span>
      )}
    </span>
  );
}
