import { ProductContext } from "../../Context/AuthenticationContext/ProductContext";
import { useContext } from "react";

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw Error(
      "ProductContext text must be used inside ProductContextProvider"
    );
  }
  return context;
};
