import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MenuItem } from '../data/menuData';

export interface CartItem {
  item: MenuItem;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  deliveryOptionId: string;
  greenContribution: boolean;
  cutlery: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: MenuItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'SET_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'SET_DELIVERY'; payload: string }
  | { type: 'TOGGLE_GREEN' }
  | { type: 'TOGGLE_CUTLERY' };

const initialState: CartState = {
  items: [],
  deliveryOptionId: 'priority',
  greenContribution: false,
  cutlery: false,
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((ci) => ci.item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((ci) =>
            ci.item.id === action.payload.id ? { ...ci, quantity: ci.quantity + 1 } : ci
          ),
        };
      }
      return { ...state, items: [...state.items, { item: action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find((ci) => ci.item.id === action.payload);
      if (existing && existing.quantity > 1) {
        return {
          ...state,
          items: state.items.map((ci) =>
            ci.item.id === action.payload ? { ...ci, quantity: ci.quantity - 1 } : ci
          ),
        };
      }
      return { ...state, items: state.items.filter((ci) => ci.item.id !== action.payload) };
    }
    case 'SET_QUANTITY': {
      if (action.payload.quantity <= 0) {
        return { ...state, items: state.items.filter((ci) => ci.item.id !== action.payload.id) };
      }
      return {
        ...state,
        items: state.items.map((ci) =>
          ci.item.id === action.payload.id ? { ...ci, quantity: action.payload.quantity } : ci
        ),
      };
    }
    case 'SET_DELIVERY':
      return { ...state, deliveryOptionId: action.payload };
    case 'TOGGLE_GREEN':
      return { ...state, greenContribution: !state.greenContribution };
    case 'TOGGLE_CUTLERY':
      return { ...state, cutlery: !state.cutlery };
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
  const subtotal = state.items.reduce((sum, ci) => sum + ci.item.price * ci.quantity, 0);

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
