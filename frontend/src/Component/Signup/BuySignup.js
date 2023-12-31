import { useState } from "react";
import { useBuySignup } from "../../Hook/Authentication/Buy/useBuySignup";
import "../../Assets/style/Signup/Signup.css";
export default function BuySignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { signup, isLoading, passwordError, emailError, usernameError } =
    useBuySignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(username, email, password);
  };
  return (
    <div className="buy_signup_page_container">
      <div className="buy_signup_container">
        <div className="buy_form_container">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4">Sign Up</h3>
            <label className="mb-1">Username</label>
            <input
              type="text"
              className="input-signup-container mb-1 input"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
              required
            />
            <p className=" mb-3 error">{usernameError}</p>
            <label className="mb-1">Email</label>
            <input
              type="email"
              className="input-signup-container mb-1 "
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              required
            />
            <p className=" mb-3 error">{emailError}</p>
            <label className="mb-1">Password</label>
            <input
              type="password"
              className="input-signup-container mb-1 "
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              required
            />
            <p className=" mb-4 error">{passwordError}</p>
            <button
              disabled={isLoading}
              className="buy_signup_submit_button w-100"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
