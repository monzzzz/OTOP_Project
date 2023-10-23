import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../Product/useProductContext";
export default function useOffer() {
  const [isLoading, setIsLoading] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useProductContext();
  const offer = async (title, sellerId, price, history, province, category) => {
    setIsLoading(true);
    setTitleError(null);
    setPriceError(null);
    const response = await fetch("/api/market/products", {
      method: "POST",
      body: JSON.stringify({
        title,
        sellerId,
        price,
        history,
        province,
        category,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      if (json.error === "Price is incorrect") {
        setPriceError("Price is incorrect");
      }
      if (json.error === "Title must be filled") {
        setTitleError("Please fill title");
      }
      if (json.error === "Price must be filled") {
        setPriceError("Please fill price");
      }
    }
    if (response.ok) {
      // dispatch to the Product context
      dispatch({ type: "ADD", payload: json });
      setIsLoading(false);
      navigate("/marketplace");
    }
  };
  return { offer, isLoading, titleError, priceError };
}
