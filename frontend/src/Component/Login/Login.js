import "../../Assets/style/Login/Login.css";
import { useState } from "react";
import SellLogin from "./Method/SellLogin";
import BuyLogin from "./Method/BuyLogin";
export default function Login() {
  const [method, setMethod] = useState(false);
  const buyMethod = () => {
    setMethod(false);
  };
  const sellMethod = () => {
    setMethod(true);
  };
  return (
    <div className="login_page_container">
      <div className="login_container">
        <div className="button_method border-bottom">
          <span className="buy_method">
            <button
              className={method ? "button_off" : "button_on"}
              onClick={buyMethod}
            >
              Buy
            </button>
          </span>
          <span className="sell_method">
            <button
              className={method ? "button_on" : "button_off"}
              onClick={sellMethod}
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
