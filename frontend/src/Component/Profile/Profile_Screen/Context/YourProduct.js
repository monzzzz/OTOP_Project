import { useEffect } from "react";
import { useYourProduct } from "../../../../Hook/Profile/useYourProduct";
import { useAuthContext } from "../../../../Hook/Authentication/useAuthContext";
import { formatPrice } from "../../../../Utils/PriceFormat";
import { useNavigate } from "react-router-dom";
import ContentLoader from "react-content-loader";
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
        {yourListProduct ? (
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
                  alt="product"
                ></img>
              </div>
              <div>
                <div className="your-product-title">{product._doc.title}</div>
                <div>{formatPrice(product._doc.price)}</div>
              </div>
            </div>
          ))
        ) : (
          <ContentLoader viewBox="0 0 400 300">
            <rect x="0" y="10" rx="4" ry="4" width="400" height="70" />
            <rect x="0" y="90" rx="4" ry="4" width="400" height="70" />
            <rect x="0" y="170" rx="4" ry="4" width="400" height="70" />
          </ContentLoader>
        )}
      </div>
    </div>
  );
}
