import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductContext } from "../Product/useProductContext";
export default function useOffer() {
  const [isLoading, setIsLoading] = useState("");
  const [titleError, setTitleError] = useState(null);
  const [priceError, setPriceError] = useState(null);
  const navigate = useNavigate();
  const { dispatch } = useProductContext();
  const offer = async (
    title,
    sellerId,
    price,
    category,
    province,
    history,
    file
  ) => {
    setIsLoading(true);
    setTitleError(null);
    setPriceError(null);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("sellerId", sellerId);
    formData.append("price", price);
    formData.append("history", history);
    formData.append("province", province);
    formData.append("category", category);
    formData.append("file", file);
    const response = await fetch("/api/market/products", {
      method: "POST",
      body: formData,
    });
    console.log(response);
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
      navigate("/");
    }
  };
  return { offer, isLoading, titleError, priceError };
}
