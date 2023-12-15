import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";
export const useBuyLogin = () => {
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();
  const login = async (email, password) => {
    setIsLoading(true);
    const response = await fetch("/api/user/buy/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      if (json.error === "Account doesn't exist") {
        setEmailError(json.error);
      }
      if (json.error === "The password is incorrect") {
        setPasswordError(json.error);
      }
      if (json.error === "All field must be filled") {
        setPasswordError(json.error);
      }
      if (json.error === "Email is invalid") {
        setEmailError(json.error);
      }
    }
    if (response.ok) {
      setIsLoading(false);
      const data = { json: json, method: "buy" };
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({ type: "LOGIN", payload: json, method: "buy" });
      navigate("/");
    }
  };

  return { login, isLoading, emailError, passwordError };
};
