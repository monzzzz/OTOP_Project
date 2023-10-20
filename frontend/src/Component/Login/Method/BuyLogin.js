import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../../Assets/style/Login/Method/BuyLogin.css";
export default function BuyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("/api/user/buy/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setEmail("");
      setPassword("");
      setError(null);
      console.log("new email added");
      navigate(-1);
      navigate("home");
    }
  };
  return (
    <div className="buy_login_page_container">
      <div className="buy_login_container">
        <div className="input-container">
          <h3>Login</h3>
          <form onSubmit={handleSubmit}>
            <label className="mb-1">Email</label>
            <input
              className="form-control mb-3 input"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <label className="mb-1">Password</label>
            <input
              className="form-control mb-3 input"
              type="text"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            <button className="buy_login_submit_button">Submit</button>
          </form>
        </div>
        <p className="no_account_text">
          Don't have an account? <a href="/buysignup">Sign Up</a>
        </p>
      </div>
    </div>
  );
}
