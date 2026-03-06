export const restaurant = {
  name: 'Pisang Ijo Cendana',
  location: 'Grand Lucky SCBD',
  rating: 4.8,
  reviewCount: 242,
  salePrice: 3000,
  originalPrice: 13000,
  deliveryTime: '74 mins',
  distance: '0.8 km',
  image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?w=120&h=120&fit=crop',
};

export const promos = [
  { id: 1, text: 'Rp3.000 off', subtext: 'Min. spend Rp5.000', icon: '🏷️' },
  { id: 2, text: 'Rp10.000 off Delivery', subtext: 'Min. spend Rp40.000', icon: '🎉' },
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
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: 3,
    name: 'Bubur Ketan Hitam',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1551326844-4df70f78d0e9?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: 4,
    name: 'Kacang Ijo (Eid/Ramadhan Special)',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop',
    badge: null,
  },
];

export const deliveryOptions = [
  {
    id: 'priority',
    name: 'Priority',
    time: '< 74 mins',
    description: 'Get a voucher if your order arrives late.',
    salePrice: 15000,
    originalPrice: 25000,
    selected: true,
  },
  {
    id: 'standard',
    name: 'Standard',
    time: '74 mins',
    salePrice: 11000,
    originalPrice: 21000,
  },
  {
    id: 'saver',
    name: 'Saver',
    time: '89 mins',
    salePrice: 3000,
    originalPrice: 13000,
  },
  {
    id: 'later',
    name: 'Order for later',
    time: null,
    salePrice: null,
    originalPrice: null,
  },
];

export const fees = {
  platformFee: 4500,
  priorityDelivery: 4000,
  deliveryDiscount: -10000,
  deliveryDiscountLabel: 'Delivery disc 10rb min 40rb, selected cities',
  greenContribution: 200,
};
