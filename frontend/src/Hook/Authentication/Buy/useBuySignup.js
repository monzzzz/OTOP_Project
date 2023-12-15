import { useState } from "react";
import { useAuthContext } from "../useAuthContext";
import { useNavigate } from "react-router-dom";

export const useBuySignup = () => {
  const [passwordError, setPasswordError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [usernameError, setUsernameError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const signup = async (username, email, password, status) => {
    setIsLoading(true);
    setEmailError(null);
    setPasswordError(null);

    const response = await fetch("/api/user/buy/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, status }),
    });
    const json = await response.json();
    if (!response.ok) {
      setIsLoading(false);
      if (json.error === "Password is not strong enough") {
        setPasswordError();
      }
      if (json.error === "Email is invalid") {
        setEmailError(json.error);
      }
      if (json.error === "All field must be filled") {
        setPasswordError(json.error);
      }
      if (json.error === "Email already existed") {
        setEmailError(json.error);
      }
      if (json.error === `${username} already in use`) {
        setUsernameError(json.error);
      }
    }
    if (response.ok) {
      // save the user to local storage
      const data = { json: json, method: "buy" };
      localStorage.setItem("user", JSON.stringify(data));
      // update the useAuthContext
      dispatch({ type: "LOGIN", payload: json, method: "buy" });
      navigate("/buysignup/verify");
      setIsLoading(false);
    }
  };
  return { signup, isLoading, passwordError, emailError, usernameError };
};
