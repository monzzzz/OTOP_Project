import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Assets/style/Marketplace/SingleProduct.css";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../../Utils/PriceFormat";
export default function SingleProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(`/api/market/products/${productId}`);
      const json = await response.json();
      if (response.ok) {
        setProductData(json);
      }
      if (!response.ok) {
        setError(json.error);
        navigate(-2);
        navigate(`/error?message=${error}`);
      }
    };
    fetchSingleProduct();
  });
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };
  const removeQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="single-product-page-container">
      {productData && (
        <div className="single-product-container">
          <div className="row g-0">
            <div className="col-sm-12 col-lg-6 product-image">
              <img src={productData.image} />
            </div>
            <div className="col-sm-12 col-lg-6">
              <div className="top-part mb-4 border-bottom">
                <div className="single-product-title">
                  {productData._doc.title}
                </div>
                {productData._doc.category === "-" ? (
                  <h6 className="mb-4">No Category</h6>
                ) : (
                  <h6 className="mb-4">{productData._doc.category}</h6>
                )}
                <div className="single-product-price mb-3">
                  {formatPrice(productData._doc.price)}
                </div>
              </div>
              <div className="bottom-part mb-3">
                <div className="single-product-history-title">History</div>
                <div className="single-product-province mb-2">
                  Origin: {productData._doc.province}
                </div>
                <div className="single-product-history">
                  {productData._doc.history}
                </div>
              </div>
              <div className="buy-function">
                <span className="quantity-container">
                  <button
                    className="remove-quantity-button"
                    onClick={removeQuantity}
                  >
                    -
                  </button>
                  <span className="quantity-amount">{quantity}</span>
                  <button className="add-quantity-button" onClick={addQuantity}>
                    +
                  </button>
                </span>
                <span>
                  <button className="btn btn-primary add-to-cart-button">
                    Add to Cart
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
