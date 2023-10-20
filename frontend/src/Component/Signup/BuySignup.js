import { useState } from "react";
import { useSignup } from "../../Hook/Authentication/useSignup";
import "../../Assets/style/Signup/BuySignup.css";
export default function BuySignup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, isLoading, passwordError, emailError } = useSignup();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, password);
  };
  return (
    <div className="buy_signup_page_container">
      <div className="buy_signup_container">
        <div className="buy_form_container">
          <form onSubmit={handleSubmit}>
            <h3 className="mb-4">Sign Up</h3>
            <label className="mb-1">Email</label>
            <input
              type="email"
              className="form-control mb-1 input"
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
              className="form-control mb-1 input"
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
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
