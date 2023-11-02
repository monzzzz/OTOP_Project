import { useEffect, useState } from "react";
import "../../Assets/style/Cart/Cart.css";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../Utils/PriceFormat";
export default function Cart() {
  const [cartInfo, setCartInfo] = useState("");
  const [error, setError] = useState(null);
  const { user } = useAuthContext();
  const userId = user ? user.id : null;

  useEffect(() => {
    const getCartItem = async () => {
      if (userId) {
        const response = await fetch(`/api/cart/${userId}`);
        const json = await response.json();
        if (response.ok) {
          setCartInfo(json);
        }
        if (!response.ok) {
          setError(json.error);
        }
      }
    };
    getCartItem();
  });

  return (
    <div className="cart-page-container">
      {cartInfo && (
        <div>
          <h1 className="mb-3">Cart</h1>
          <div className="items-container">
            {cartInfo.result.map((item, index) => (
              <div
                key={index}
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
                        <span className="quantity-amount">{}</span>
                        <button className="add-quantity-button">+</button>
                      </span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="card conclusion-price-container">
            <div>Total price: {formatPrice(cartInfo.total_price)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
