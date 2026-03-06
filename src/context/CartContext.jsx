import { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  items: {},
  deliveryOption: 'priority',
  greenContribution: false,
  cutlery: false,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const id = action.payload;
      const current = state.items[id] || 0;
      return { ...state, items: { ...state.items, [id]: current + 1 } };
    }
    case 'REMOVE_ITEM': {
      const id = action.payload;
      const current = state.items[id] || 0;
      if (current <= 1) {
        const { [id]: _, ...rest } = state.items;
        return { ...state, items: rest };
      }
      return { ...state, items: { ...state.items, [id]: current - 1 } };
    }
    case 'SET_DELIVERY':
      return { ...state, deliveryOption: action.payload };
    case 'TOGGLE_GREEN':
      return { ...state, greenContribution: !state.greenContribution };
    case 'TOGGLE_CUTLERY':
      return { ...state, cutlery: !state.cutlery };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (id) => dispatch({ type: 'ADD_ITEM', payload: id });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const setDelivery = (id) => dispatch({ type: 'SET_DELIVERY', payload: id });
  const toggleGreen = () => dispatch({ type: 'TOGGLE_GREEN' });
  const toggleCutlery = () => dispatch({ type: 'TOGGLE_CUTLERY' });

  const totalItems = Object.values(state.items).reduce((s, q) => s + q, 0);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem,
        removeItem,
        setDelivery,
        toggleGreen,
        toggleCutlery,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
