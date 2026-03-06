import './PriceTag.css';

function formatPrice(price) {
  return new Intl.NumberFormat('id-ID').format(price);
}

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

export { formatPrice };
