export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  badge?: 'Most ordered' | 'Most liked';
}

export interface Restaurant {
  name: string;
  location: string;
  rating: number;
  reviewCount: number;
  discountPrice: number;
  originalPrice: number;
  deliveryTime: number;
  image: string;
}

export const restaurant: Restaurant = {
  name: 'Pisang Ijo Cendana',
  location: 'Grand Lucky SCBD',
  rating: 4.8,
  reviewCount: 242,
  discountPrice: 3000,
  originalPrice: 13000,
  deliveryTime: 74,
  image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=100&h=100&fit=crop',
};

export const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Kolak Pisang Campur Ubi dan Singkong',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1476718406336-bb5a9690ee2a?w=300&h=300&fit=crop',
    badge: 'Most ordered',
  },
  {
    id: '2',
    name: 'Bubur Sumsum',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: '3',
    name: 'Bubur Ketan Hitam',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1551106652-a5bcf4b29ab6?w=300&h=300&fit=crop',
    badge: 'Most liked',
  },
  {
    id: '4',
    name: 'Kacang Ijo (Eid/Ramadhan Special)',
    price: 32000,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=300&fit=crop',
  },
  {
    id: '5',
    name: 'Es Pisang Ijo',
    price: 28000,
    image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=300&h=300&fit=crop',
  },
  {
    id: '6',
    name: 'Pisang Ijo Original',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=300&h=300&fit=crop',
    badge: 'Most ordered',
  },
];

export interface PromoItem {
  id: string;
  text: string;
  subtext: string;
  icon: string;
}

export const promos: PromoItem[] = [
  { id: 'p1', text: 'Rp3.000 off', subtext: 'Min. spend Rp5.000', icon: '🏷️' },
  { id: 'p2', text: 'Rp10.000 off Delivery', subtext: 'Min. spend Rp40.000', icon: '🎉' },
];

export interface DeliveryOption {
  id: string;
  label: string;
  time: string;
  discountPrice: number;
  originalPrice: number;
  description?: string;
  isRecommended?: boolean;
}

export const deliveryOptions: DeliveryOption[] = [
  {
    id: 'priority',
    label: 'Priority',
    time: '< 74 mins',
    discountPrice: 15000,
    originalPrice: 25000,
    description: 'Get a voucher if your order arrives late.',
    isRecommended: true,
  },
  {
    id: 'standard',
    label: 'Standard',
    time: '74 mins',
    discountPrice: 11000,
    originalPrice: 21000,
  },
  {
    id: 'saver',
    label: 'Saver',
    time: '89 mins',
    discountPrice: 3000,
    originalPrice: 13000,
  },
];
