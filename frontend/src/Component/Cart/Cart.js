import { useEffect, useState, useRef } from "react";
import "../../Assets/style/Cart/Cart.css";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../Utils/PriceFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import PaymentPopUp from "./PaymentPopUp";
import PromptPay from "./PaymentType/PromptPay";
import useCart from "../../Hook/Cart/useCart";
export default function Cart() {
  const [active, setActive] = useState(false);
  const [select, setSelect] = useState(false);
  const [paymentTypeClick, setPaymentTypeClick] = useState(false);
  const paymentRef = useRef(null);
  const itemsRef = useRef(null);
  const { user } = useAuthContext();
  const userId = user ? user.id : null;
  const {
    cartInfo,
    error,
    process,
    paymentType,
    addQuantity,
    deleteItemById,
    getCartItem,
    decreaseQuantity,
    handlePaymentTypeChange,
  } = useCart(active);

  useEffect(() => {
    getCartItem();
  }, [userId, process]);
  useEffect(() => {
    // When the component mounts
    document.body.classList.add("no-scroll");

    // When the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, []);
  useEffect(() => {});
  const scrollToPayment = () => {
    paymentRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const handleQrCodeReady = () => {
    scrollToPayment();
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  console.log(paymentTypeClick);
  return (
    <div className="cart-page-container">
      <div ref={itemsRef} className="top-cart-page-container">
        {cartInfo &&
          (cartInfo.total_price <= 0 ? (
            <div>
              <h1>No item in the Cart</h1>
            </div>
          ) : (
            <div className={active ? "blur" : ""}>
              <h1 className="mb-3">Cart</h1>
              <div className="items-container">
                {cartInfo.result.map((item) => {
                  if (item._doc.quantity !== 0) {
                    return (
                      <div
                        key={item._doc.itemId}
                        className="card item-container rounded-3 d-flex justify-content-between p-3 mb-3"
                      >
                        <div className="row">
                          <div className="col-6">
                            <span className="left-item-container p-2 d-flex align-content-center">
                              <img
                                className="cart-page-product-image"
                                src={item.image}
                                alt={item.productInfo.title}
                              />
                              <div className="text-left">
                                <div className="title-text">
                                  {item.productInfo.title}
                                </div>
                                <div className="category-text">
                                  {item.productInfo.category}
                                </div>
                              </div>
                            </span>
                          </div>
                          <div className="col-6 d-flex justify-content-end ">
                            <div className="d-flex flex-column justify-content-between align-items-end ">
                              <div>
                                <FontAwesomeIcon
                                  className="remove-icon"
                                  onClick={() => {
                                    deleteItemById(item._doc.itemId);
                                  }}
                                  icon={faRemove}
                                />
                              </div>
                              <span className="right-item-container mb-3">
                                <span className="quantity-container">
                                  <button
                                    className="remove-quantity-button"
                                    onClick={() => {
                                      decreaseQuantity(
                                        item._doc.quantity,
                                        item._doc.itemId
                                      );
                                    }}
                                  >
                                    -
                                  </button>
                                  <span className="quantity-amount">
                                    {item._doc.quantity}
                                  </span>
                                  <button
                                    className="add-quantity-button"
                                    onClick={() => {
                                      addQuantity(
                                        item._doc.quantity,
                                        item._doc.itemId
                                      );
                                    }}
                                  >
                                    +
                                  </button>
                                </span>
                              </span>
                              <div></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
              <div className="card conclusion-price-container ">
                <div className="d-flex justify-content-end align-content-center">
                  <div className="d-flex justify-content-between gap-3">
                    <span className="d-flex align-items-center">
                      Total price: {formatPrice(cartInfo.total_price)}
                    </span>
                    <span>
                      <button
                        className="cart-checkout-button"
                        onClick={() => {
                          setActive(true);
                        }}
                      >
                        Check out
                      </button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      {select && <div className="cart-page-space"></div>}
      <div
        ref={paymentRef}
        className="payment-operation-container d-flex flex-column"
      >
        {paymentType === "promptpay" ? (
          <div>
            <PromptPay
              paymentType={paymentType}
              amount={cartInfo.total_price}
              onQrCodeReady={handleQrCodeReady}
              clickScrollToTop={handleScrollTop}
              setPaymentTypeClick={setPaymentTypeClick}
              onPaymentType={paymentTypeClick}
            />
          </div>
        ) : (
          ""
        )}
      </div>

      <PaymentPopUp
        active={active}
        setPaymentType={handlePaymentTypeChange}
        setActive={setActive}
        setSelect={setSelect}
        setPaymentTypeClick={setPaymentTypeClick}
      />
    </div>
  );
}
