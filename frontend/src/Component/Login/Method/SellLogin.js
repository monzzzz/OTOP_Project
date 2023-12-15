import { useState } from "react";
import "../../../Assets/style/Login/Method/BuyLogin.css";
import { useSellLogin } from "../../../Hook/Authentication/Sell/useSellLogin";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
export default function SellLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { emailError, passwordError, isLoading, login } = useSellLogin();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
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
            <div className="d-flex justify-content-between mb-4">
              <span className="error">{passwordError}</span>
              <a href="/forget" className="forgot-password-text">
                Forgot password?
              </a>
            </div>
            <button
              disabled={isLoading}
              className="buy_login_submit_button mb-5"
            >
              Login
            </button>
          </form>
        </div>

        <p className="no_account_text">
          Don't have an account? <a href="/sellsignup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
