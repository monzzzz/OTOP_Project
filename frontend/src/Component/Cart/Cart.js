import { useEffect, useState } from "react";
import "../../Assets/style/Cart/Cart.css";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../Utils/PriceFormat";
export default function Cart() {
  const [cartInfo, setCartInfo] = useState("");
  const [error, setError] = useState(null);
  const [hook, setHook] = useState(false);
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  //
  useEffect(() => {
    const getCartItem = async () => {
      if (userId) {
        const response = await fetch(`/api/cart/${userId}`);
        const json = await response.json();
        if (response.ok) {
          setCartInfo(json);
          console.log(cartInfo);
          setHook(false);
        }
        if (!response.ok) {
          setError(json.error);
          setHook(false);
        }
      }
    };
    getCartItem();
  }, [userId, hook]);

  const addQuantity = async (quantity, productID) => {
    const newQuantity = quantity + 1;
    const response = await fetch("/api/cart", {
      method: "PUT",
      body: JSON.stringify({
        quantity: newQuantity,
        ownerID: userId,
        productID: productID,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();
    console.log(json);
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setHook(true);
    }
  };
  const decreaseQuantity = (quantity, id) => {};

  return (
    <div className="cart-page-container">
      {cartInfo && (
        <div>
          <h1 className="mb-3">Cart</h1>
          <div className="items-container">
            {cartInfo.result.map((item) => (
              <div
                key={item._doc.itemId}
                className="card item-container rounded-3 d-flex justify-content-between p-3 mb-3"
              >
                <div className="row">
                  <div className="col-6">
                    <span className="left-item-container d-flex align-content-center">
                      <img src={item.image} alt={item.productInfo.title} />
                      <div className="text-left">
                        <div className="title-text">
                          {item.productInfo.title}
                        </div>
                      </div>
                    </span>
                  </div>
                  <div className="col-6 d-flex justify-content-end align-items-center">
                    <span className="right-item-container">
                      <span className="quantity-container">
                        <button className="remove-quantity-button">-</button>
                        <span className="quantity-amount">
                          {item._doc.quantity}
                        </span>
                        <button
                          className="add-quantity-button"
                          onClick={() => {
                            addQuantity(item._doc.quantity, item._doc.itemId);
                          }}
                        >
                          +
                        </button>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card conclusion-price-container ">
            <div className="d-flex justify-content-end align-content-center">
              <div className="d-flex justify-content-between gap-3">
                <span className="d-flex align-items-center">
                  Total price: {formatPrice(cartInfo.total_price)}
                </span>
                <span>
                  <button className="btn btn-primary">Check out</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
