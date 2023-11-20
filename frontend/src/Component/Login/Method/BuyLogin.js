import { useState } from "react";
import "../../../Assets/style/Login/Method/BuyLogin.css";
import { useBuyLogin } from "../../../Hook/Authentication/Buy/useBuyLogin";
import { useGoogleLogin } from "@react-oauth/google";
export default function BuyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { emailError, passwordError, isLoading, login } = useBuyLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      // dispatch({ type: "LOGIN", payload: tokenResponse.access_token });
      localStorage.setItem(
        "token",
        JSON.stringify({ token: tokenResponse.access_token })
      );
      console.log(tokenResponse);
    },

    onError: () => console.log("fail"),
  });
  return (
    <div className="buy_login_page_container">
      <div className="buy_login_container">
        <div className="input-container">
          <h3 className="mb-4">Login</h3>
          <form onSubmit={handleSubmit}>
            <label className="mb-1">Email</label>
            <input
              className="input-login-container mb-1"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <p className=" mb-3 error">{emailError}</p>
            <label className="mb-1">Password</label>
            <input
              className="input-login-container mb-1"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            <p className=" mb-4 error">{passwordError}</p>
            <button disabled={isLoading} className="buy_login_submit_button">
              Login
            </button>
          </form>
        </div>
        <p className="d-flex justify-content-center mb-2">or</p>
        <button
          className="buy_login_submit_button d-flex align-items-center justify-content-center w-100 mb-4"
          onClick={() => googleLogin()}
        >
          <img
            style={{ marginRight: "5px", width: "20px" }}
            alt="google"
            src={require("../../../Assets/picture/Google_logo.png")}
          />
          <p className="mb-0 login-text">Google</p>
        </button>
        <p className="no_account_text">
          Don't have an account? <a href="/buysignup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
