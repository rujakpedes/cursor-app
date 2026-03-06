export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string | null;
  badge: string | null;
  active: boolean;
  categoryId: number | null;
  categoryName: string | null;
}

export interface StoreSettings {
  storeName: string;
  location: string;
  phone: string;
  email: string;
  logoUrl: string | null;
  rating: number;
  reviewCount: number;
  deliveryFeeStandard: number;
  deliveryFeePriority: number;
  deliveryFeeSaver: number;
  prioritySurcharge: number;
  deliveryTimeStandard: number;
  deliveryTimePriority: number;
  deliveryTimeSaver: number;
  maintenanceMode: boolean;
  maintenanceMessage: string;
}

export interface PromoItem {
  id: number;
  code: string;
  description: string;
  discountAmount: number;
  minSpend: number | null;
}

export interface OrderResponse {
  id: number;
  orderNumber: string;
  status: string;
  deliveryType: string;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  items: OrderItemResponse[];
  customerName: string;
  createdAt: string;
}

export interface OrderItemResponse {
  productId: number;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface CustomerProfile {
  id: number;
  email: string;
  displayName: string;
  phone: string;
  address: string;
  avatarUrl: string;
}

export interface DeliveryOption {
  id: string;
  label: string;
  time: string;
  fee: number;
  originalFee: number;
  description?: string;
  isRecommended?: boolean;
}
