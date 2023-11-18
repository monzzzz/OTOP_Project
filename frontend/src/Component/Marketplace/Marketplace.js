import { useProductContext } from "../../Hook/Product/useProductContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/style/Marketplace/Marketplace.css";
import { formatPrice } from "../../Utils/PriceFormat";
export default function Marketplace() {
  const { products, dispatch } = useProductContext();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleBuy = (productId) => {
    navigate(`/products/${productId}?quantity=0`);
    return false;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/market/products");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PRODUCT", payload: json });
      }
      if (!response.ok) {
        setError(json.error);
        navigate(-1);
        navigate(`/error?message=${error}`);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="marketplace-page-container">
      <div className="row">
        {products.map((product, index) => {
          return (
            <div
              key={index}
              className="card card_container rounded-4 col-sm-4 col-lg-3 mb-4"
            >
              <img
                className="card-img-top"
                src={product.image}
                alt={product._doc.title}
              />
              <div className="card-body">
                <h5 className="card-title">{product._doc.title}</h5>
                <p className="card-text">{product._doc.province}</p>
              </div>
              <div className="card-body d-flex justify-content-between align-items-end">
                <h6 className="card-text">{formatPrice(product._doc.price)}</h6>
                <a
                  href="/marketplace"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(product._doc._id);
                  }}
                >
                  Buy
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
