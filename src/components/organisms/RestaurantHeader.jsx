import Rating from '../atoms/Rating';
import PriceTag from '../atoms/PriceTag';
import './RestaurantHeader.css';

export default function RestaurantHeader({ restaurant }) {
  return (
    <div className="rest-header">
      <img src={restaurant.image} alt={restaurant.name} className="rest-header__img" />
      <div className="rest-header__info">
        <h1 className="rest-header__name">{restaurant.name}</h1>
        <p className="rest-header__location">- {restaurant.location}</p>
        <Rating score={restaurant.rating} count={restaurant.reviewCount} />
        <div className="rest-header__pricing">
          <PriceTag
            price={restaurant.salePrice}
            originalPrice={restaurant.originalPrice}
            size="sm"
          />
          <span className="rest-header__delivery">· From {restaurant.deliveryTime}</span>
        </div>
      </div>
    </div>
  );
}
