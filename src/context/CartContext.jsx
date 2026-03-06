import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, qty: 1 }],
      };
    }
    case 'REMOVE_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload);
      if (existing && existing.qty > 1) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload ? { ...i, qty: i.qty - 1 } : i
          ),
        };
      }
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.payload),
      };
    }
    case 'SET_DELIVERY': {
      return { ...state, deliveryOption: action.payload };
    }
    case 'TOGGLE_ECO': {
      return { ...state, ecoContribution: !state.ecoContribution };
    }
    case 'TOGGLE_CUTLERY': {
      return { ...state, cutlery: !state.cutlery };
    }
    default:
      return state;
  }
};

const initialState = {
  items: [],
  deliveryOption: 'priority',
  ecoContribution: false,
  cutlery: false,
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const setDelivery = (id) => dispatch({ type: 'SET_DELIVERY', payload: id });
  const toggleEco = () => dispatch({ type: 'TOGGLE_ECO' });
  const toggleCutlery = () => dispatch({ type: 'TOGGLE_CUTLERY' });

  const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        setDelivery,
        toggleEco,
        toggleCutlery,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
