import { useState } from "react";
import { useAuthContext } from "../Authentication/useAuthContext";

export default function useCart(active) {
  const [cartInfo, setCartInfo] = useState("");
  const [error, setError] = useState(null);
  const [process, setProcess] = useState(false);
  const [paymentType, setPaymentType] = useState("");
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  const addQuantity = async (quantity, productID) => {
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      const response = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          quantity: newQuantity,
          ownerID: userId,
          productID: productID,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setProcess(true);
      }
    }
  };

  const decreaseQuantity = async (quantity, productID) => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      const response = await fetch("/api/cart", {
        method: "PUT",
        body: JSON.stringify({
          quantity: newQuantity,
          ownerID: userId,
          productID: productID,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const json = await response.json();
      console.log(json);
      if (!response.ok) {
        setError(json.error);
      }
      if (response.ok) {
        setProcess(true);
      }
    }
  };

  const deleteItemById = async (itemId) => {
    const response = await fetch(`/api/cart/${userId}`, {
      method: "DELETE",
      body: JSON.stringify({ itemId: itemId }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      setProcess(true);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  const getCartItem = async () => {
    if (userId) {
      const response = await fetch(`/api/cart/${userId}`, { method: "GET" });
      const json = await response.json();
      if (response.ok) {
        setCartInfo(json);
        console.log(cartInfo);

        setProcess(false);
      }
      if (!response.ok) {
        setError(json.error);
        setProcess(false);
      }
    }
  };
  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
  };
  return {
    cartInfo,
    error,
    process,
    active,
    paymentType,
    addQuantity,
    decreaseQuantity,
    deleteItemById,
    getCartItem,
    handlePaymentTypeChange,
  };
}
