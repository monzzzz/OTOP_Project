import { useReducer, createContext } from "react";

export const ProductContext = createContext();

export const productReducer = (state, action) => {
  switch (action.type) {
    case "SET_PRODUCT":
      return { products: action.payload };
    case "ADD":
      return {
        products: [action.payload, ...state.products],
      };
    default:
      return state;
  }
};

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  console.log(state);
  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};
