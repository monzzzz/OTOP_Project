import { useState } from "react";

export const useHomeProfile = () => {
  const [homeError, setHomeError] = useState(null);
  const [addressList, setAddressList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const changeName = async (userId, method, newName, onSuccess) => {
    setHomeError(null);
    const response = await fetch("/api/profile/home", {
      method: "PUT",
      body: JSON.stringify({ userId, method, newName }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      if (onSuccess) onSuccess();
      const userInfo = localStorage.getItem("user");
      const userObject = JSON.parse(userInfo);
      userObject.json.username = newName;
      const updatedUsername = JSON.stringify(userObject);
      localStorage.setItem("user", updatedUsername);
    }
    if (!response.ok) {
      setHomeError(json.error);
      console.log(json.error);
    }
  };
  const addAddress = async (
    userId,
    firstName,
    lastName,
    address,
    province,
    postalCode
  ) => {
    setIsLoading(true);
    const response = await fetch("/api/profile/home/address", {
      method: "POST",
      body: JSON.stringify({
        userId,
        firstName,
        lastName,
        address,
        province,
        postalCode,
      }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (response.ok) {
      setIsLoading(false);
    }
    if (!response.ok) {
      setHomeError(json.error);
    }
  };

  const getAddress = async (userId) => {
    setIsLoading(true);
    const response = await fetch(`/api/profile/home/address/${userId}`);
    const json = await response.json();
    if (!response.ok) {
      setHomeError(json.error);
    }
    if (response.ok) {
      setAddressList(json);
    }
    setIsLoading(false);
  };
  const deleteAddress = async (userId, addressId) => {
    const response = await fetch(
      `/api/profile/home/address/${userId}?addressId=${addressId}`,
      {
        method: "DELETE",
      }
    );
    const json = await response.json();
    if (!response.ok) {
      setHomeError(json.error);
    }
  };
  return {
    changeName,
    homeError,
    addAddress,
    getAddress,
    deleteAddress,
    addressList,
    isLoading,
  };
};
