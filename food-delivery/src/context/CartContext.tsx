import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '../data/types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  deliveryType: string;
  greenContribution: boolean;
  cutlery: boolean;
  promoCode: string;
  promoDiscount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'CLEAR' }
  | { type: 'SET_DELIVERY'; payload: string }
  | { type: 'TOGGLE_GREEN' }
  | { type: 'TOGGLE_CUTLERY' }
  | { type: 'SET_PROMO'; payload: { code: string; discount: number } }
  | { type: 'CLEAR_PROMO' };

const initialState: CartState = {
  items: [],
  deliveryType: 'PRIORITY',
  greenContribution: false,
  cutlery: false,
  promoCode: '',
  promoDiscount: 0,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((ci) => ci.product.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((ci) =>
            ci.product.id === action.payload.id ? { ...ci, quantity: ci.quantity + 1 } : ci
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find((ci) => ci.product.id === action.payload);
      if (existing && existing.quantity > 1) {
        return {
          ...state,
          items: state.items.map((ci) =>
            ci.product.id === action.payload ? { ...ci, quantity: ci.quantity - 1 } : ci
          ),
        };
      }
      return { ...state, items: state.items.filter((ci) => ci.product.id !== action.payload) };
    }
    case 'CLEAR':
      return initialState;
    case 'SET_DELIVERY':
      return { ...state, deliveryType: action.payload };
    case 'TOGGLE_GREEN':
      return { ...state, greenContribution: !state.greenContribution };
    case 'TOGGLE_CUTLERY':
      return { ...state, cutlery: !state.cutlery };
    case 'SET_PROMO':
      return { ...state, promoCode: action.payload.code, promoDiscount: action.payload.discount };
    case 'CLEAR_PROMO':
      return { ...state, promoCode: '', promoDiscount: 0 };
    default:
      return state;
  }
}

interface CartContextValue {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const totalItems = state.items.reduce((sum, ci) => sum + ci.quantity, 0);
  const subtotal = state.items.reduce((sum, ci) => sum + ci.product.price * ci.quantity, 0);

  return (
    <CartContext.Provider value={{ state, dispatch, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
