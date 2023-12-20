import { useState } from "react";

export const useChangeName = () => {
  const [homeError, setHomeError] = useState(null);
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
  return { changeName, homeError };
};
