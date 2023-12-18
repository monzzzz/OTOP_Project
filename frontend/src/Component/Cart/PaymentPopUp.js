import "../../Assets/style/Cart/PaymentPopUp.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
export default function PaymentPopUp(props) {
  const selectPaymentType = (type) => {
    props.setPaymentType(type);
    props.setActive(false);
    props.setSelect(true);
  };
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
            <button
              className="d-flex justify-content-center border-bottom pb-3"
              onClick={() => selectPaymentType("promptpay")}
            >
              <img
                src={require("../../Assets/picture/prompt-pay-logo.jpg")}
                alt="promptpay"
              ></img>
            </button>
            <button
              className="d-flex justify-content-center border-bottom"
              onClick={() => selectPaymentType("credit")}
            >
              <img
                src={require("../../Assets/picture/visa-mastercard-logos.png")}
                alt="credit card"
              ></img>
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
