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
  //   const changeProductInfo = async (productId) => {
  //     const response = await fetch("/api/market")
  //   }
  return {
    checkUserCredential,
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
