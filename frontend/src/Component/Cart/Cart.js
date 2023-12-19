import { useEffect, useState, useRef } from "react";
import "../../Assets/style/Cart/Cart.css";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../Utils/PriceFormat";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import { useMediaQuery } from "react-responsive";
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
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const isMediumScreen = useMediaQuery({ maxWidth: 1023, minWidth: 641 });
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });
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
    if (paymentTypeClick) {
      document.body.classList.add("no-scroll");
    }

    if (!paymentTypeClick) {
      document.body.classList.remove("no-scroll");
    }
  }, [[paymentTypeClick]]);
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
                        className={
                          "item-container rounded-3 d-flex flex-center justify-content-between p-3 mb-3"
                        }
                      >
                        <div
                          className={
                            isSmallScreen
                              ? "d-flex flex-column py-2 px-3"
                              : "cart-item-left-container p-2"
                          }
                        >
                          {isSmallScreen && (
                            <div className="d-flex justify-content-end mb-3">
                              <FontAwesomeIcon
                                className="remove-icon"
                                onClick={() => {
                                  deleteItemById(item._doc.itemId);
                                }}
                                icon={faRemove}
                              />
                            </div>
                          )}
                          <img
                            className={
                              isSmallScreen
                                ? "cart-page-product-image-small  mb-3"
                                : "cart-page-product-image-large"
                            }
                            src={item.image}
                            alt={item.productInfo.title}
                          />
                          <div className=" text-left ">
                            <div>
                              <div className="title-text">
                                {item.productInfo.title}
                              </div>
                              <div className="category-text">
                                {item.productInfo.category}
                              </div>
                              <div className="price-text">
                                {formatPrice(item.productInfo.price)}
                              </div>
                            </div>
                            {!isLargeDevice && (
                              <div className="d-flex justify-content-between align-self-end">
                                {isSmallScreen && (
                                  <span className="item-total-price-cart d-flex align-items-center">
                                    Total Price:{"  "}
                                    {formatPrice(
                                      item.productInfo.price *
                                        item._doc.quantity
                                    )}
                                  </span>
                                )}
                                {isMediumScreen && (
                                  <span className="item-total-price-cart d-flex align-items-center">
                                    {formatPrice(
                                      item.productInfo.price *
                                        item._doc.quantity
                                    )}
                                  </span>
                                )}

                                <span className="d-flex align-items-center">
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
                              </div>
                            )}
                          </div>
                        </div>
                        {isLargeDevice && (
                          <>
                            <div className="d-flex align-items-center">
                              {formatPrice(
                                item.productInfo.price * item._doc.quantity
                              )}
                            </div>
                            <div className="d-flex align-items-center">
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
                            </div>
                          </>
                        )}

                        {!isSmallScreen && (
                          <span>
                            <div>
                              <FontAwesomeIcon
                                className="remove-icon"
                                onClick={() => {
                                  deleteItemById(item._doc.itemId);
                                }}
                                icon={faRemove}
                              />
                            </div>
                          </span>
                        )}
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
        {paymentTypeClick &&
          (paymentType === "promptpay" ? (
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
          ))}
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
