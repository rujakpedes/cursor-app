export const restaurant = {
  name: 'Pisang Ijo Cendana',
  location: 'Grand Lucky SCBD',
  rating: 4.8,
  reviews: 242,
  deliveryTime: '74 mins',
  discountPrice: 'Rp3.000',
  originalPrice: 'Rp13.000',
  image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=100&h=100&fit=crop',
};

export const promos = [
  { id: 1, text: 'Rp3.000 off', sub: 'Min. spend Rp5.000', icon: '🏷️' },
  { id: 2, text: 'Rp10.000 off Delivery', sub: 'Min. spend Rp40.000', icon: '🎉' },
];

export const menuItems = [
  {
    id: 1,
    name: 'Kolak Pisang Campur Ubi dan Singkong',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=300&h=300&fit=crop',
    badge: 'Most ordered',
  },
  {
    id: 2,
    name: 'Bubur Sumsum',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: 3,
    name: 'Bubur Ketan Hitam',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: 4,
    name: 'Kacang Ijo (Eid/Ramadhan Special)',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=300&h=300&fit=crop',
    badge: null,
  },
];

export const deliveryOptions = [
  {
    id: 'priority',
    label: 'Priority',
    time: '< 74 mins',
    info: 'Get a voucher if your order arrives late.',
    discountPrice: 15000,
    originalPrice: 25000,
  },
  {
    id: 'standard',
    label: 'Standard',
    time: '74 mins',
    info: null,
    discountPrice: 11000,
    originalPrice: 21000,
  },
  {
    id: 'saver',
    label: 'Saver',
    time: '89 mins',
    info: null,
    discountPrice: 3000,
    originalPrice: 13000,
  },
];

export const formatPrice = (price) => {
  return `Rp${price.toLocaleString('id-ID')}`;
};
