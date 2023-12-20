import { useState } from "react";

export const useEditProduct = () => {
  const [credential, setCredential] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [history, setHistory] = useState("");
  const [price, setPrice] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [category, setCategory] = useState("");
  const [province, setProvince] = useState("");
  const [productUpdated, setProductUpdated] = useState(false);
  const checkUserCredential = async (userId, productId) => {
    setIsLoading(true);
    const response = await fetch(`/api/market/products/${productId}`);
    const json = await response.json();
    if (response.ok) {
      if (json._doc.sellerId === userId) {
        setCredential(true);
        setTitle(json._doc.title);
        setHistory(json._doc.history);
        setPrice(json._doc.price);
        setPictureUrl(json.image);
        setCategory(json._doc.category);
        setProvince(json._doc.province);
      }
    }
    if (!response.ok) {
      setError(json.error);
    }
    setIsLoading(false);
  };

  const updateProductInfo = async (
    newTitle,
    newPrice,
    newCategory,
    newProvince,
    newHistory,
    newPicture
  ) => {
    const response = await fetch("/api/market", {
      method: "PUT",
      body: JSON.stringify(
        newTitle,
        newPrice,
        newCategory,
        newProvince,
        newHistory,
        newPicture
      ),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      setProductUpdated(true); // show the message when productUpdated == true
      setTimeout(() => {
        setProductUpdated(false);
      }, 3000);
    }
    if (!response.ok) {
      setError(json.error);
    }
  };
  return {
    checkUserCredential,
    updateProductInfo,
    credential,
    isLoading,
    error,
    title,
    history,
    price,
    pictureUrl,
    category,
    province,
  };
};
