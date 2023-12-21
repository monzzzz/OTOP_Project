import { useState } from "react";
import { fetchBlob } from "../../Utils/Converter/blobFromBlobUrl";
import { blobToFile } from "../../Utils/Converter/blobToFile";
import { useAuthContext } from "../Authentication/useAuthContext";

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
  const { user } = useAuthContext();
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
    newPicture,
    productId
  ) => {
    const formData = new FormData();
    formData.append("newTitle", newTitle);
    formData.append("newPrice", newPrice);
    formData.append("newCategory", newCategory);
    formData.append("newProvince", newProvince);
    formData.append("newHistory", newHistory);
    formData.append("productId", productId);
    formData.append("userId", user.id);
    console.log(newPicture);
    if (newPicture) {
      const blob = await fetchBlob(newPicture);
      const fileName = newTitle;
      const file = blobToFile(blob, fileName);
      formData.append("file", file);
    }
    const response = await fetch("/api/market/products", {
      method: "PUT",
      body: formData,
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
