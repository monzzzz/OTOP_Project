import { useEffect } from "react";
import { useYourProduct } from "../../../../Hook/Profile/useYourProduct";
import { useAuthContext } from "../../../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../../../Utils/PriceFormat";
import { useNavigate } from "react-router-dom";
import "../../../../Assets/style/Profile/Context/YourProduct.css";
export default function YourProduct() {
  const { error, yourListProduct, getYourProduct } = useYourProduct();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    getYourProduct(user.id);
  }, []);
  const handleYourProductClick = (productId) => {
    navigate(`/edit/your-product/${productId}`);
  };
  return (
    <div className="your-product-container">
      <h3 className="mb-4">Your Product</h3>
      <div className="your-items-list">
        {yourListProduct &&
          yourListProduct.map((product, index) => (
            <div
              className="each-your-product-container"
              key={index}
              onClick={() => {
                handleYourProductClick(product._doc._id);
              }}
            >
              <div className="your-product-image-container">
                <img
                  className="your-product-image"
                  src={product.imageUrl}
                  style={{ width: "100px" }}
                ></img>
              </div>
              <div>
                <div className="your-product-title">{product._doc.title}</div>
                <div>{formatPrice(product._doc.price)}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
