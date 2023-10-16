import { useState } from "react";
import "../../../Assets/style/Login/Method/BuyLogin.css";
export default function BuyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { email, password };
    const response = await fetch("api/user/buy/signup", {
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
    }
  };
  return (
    <div className="buy_form_container">
      <form onSubmit={handleSubmit}>
        <h3 className="mb-3">Login</h3>
        <label>Email</label>
        <input
          type="text"
          className="form-control mb-3 input"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          required
        />
        <label>Password</label>
        <input
          type="password"
          className="form-control mb-3 input"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          required
        />
        <button className="sell_login_submit_button">Submit</button>
      </form>
    </div>
  );
}
