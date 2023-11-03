import { createContext } from "react";

export const CartContext = createContext();

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_QUANTITY":
      return {
        itemId: action.payload.itemId,
        quantity: action.payload.quantity + 1,
      };
    case "DECREASE_QUANTITY":
      return {
        itemId: action.payload.itemId,
        quantity: action.payload.quantity - 1,
      };
  }
};

export const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {});
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
