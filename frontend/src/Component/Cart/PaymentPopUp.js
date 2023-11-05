import "../../Assets/style/Cart/PaymentPopUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
export default function PaymentPopUp(props) {
  return (
    <div>
      {props.active ? (
        <div className=" payment-pop-up-container">
          <button
            className="w-100 d-flex justify-content-end"
            onClick={() => {
              props.setActive(false);
            }}
          >
            <FontAwesomeIcon icon={faRemove} />
          </button>
          <div className="type-payment-container">
            <a
              className="d-flex justify-content-center border-bottom pb-3"
              href="/payment/promtpay"
            >
              <img
                src={require("../../Assets/picture/prompt-pay-logo.jpg")}
              ></img>
            </a>
            <a
              className="d-flex justify-content-center border-bottom"
              href="/payment/credit"
            >
              <img
                src={require("../../Assets/picture/visa-mastercard-logos.png")}
              ></img>
            </a>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
