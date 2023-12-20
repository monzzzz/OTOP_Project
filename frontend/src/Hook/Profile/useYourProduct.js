import { useState } from "react";

export const useYourProduct = () => {
  const [yourListProduct, setYourListProduct] = useState("");
  const [error, setError] = useState(null);
  const getYourProduct = async (userId) => {
    const response = await fetch(`/api/profile/your-product/${userId}`);
    const json = await response.json();
    if (response.ok) {
      setYourListProduct(json);
      console.log(json);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return { getYourProduct, yourListProduct, error };
};
