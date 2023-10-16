import "../../Assets/style/Login/Login.css";
import { useState } from "react";
import SellLogin from "./Method/SellLogin";
import BuyLogin from "./Method/BuyLogin";
export default function Login() {
  const [method, setMethod] = useState(false);
  const changeMethod = () => {
    setMethod(!method);
  };
  return (
    <div className="login_page_container">
      <div className="login_container">
        <div className="button_method">
          <span>
            <button
              className={method ? "button_off" : "button_on"}
              onClick={changeMethod}
            >
              Buy
            </button>
          </span>
          <span>
            <button
              className={method ? "button_on" : "button_off"}
              onClick={changeMethod}
            >
              Sell
            </button>
          </span>
        </div>
        <div className="form_component">
          {method ? <SellLogin /> : <BuyLogin />}
        </div>
      </div>
    </div>
  );
}
