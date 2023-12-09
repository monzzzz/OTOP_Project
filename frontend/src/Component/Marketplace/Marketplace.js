import { useProductContext } from "../../Hook/Product/useProductContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../Assets/style/Marketplace/Marketplace.css";
import { formatPrice } from "../../Utils/PriceFormat";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Marketplace() {
  const { products, dispatch } = useProductContext();
  const [error, setError] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleBuy = (productId) => {
    navigate(`/products/${productId}?quantity=0`);
    return false;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const response = await fetch("/api/market/products");
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PRODUCT", payload: json });

        setIsLoading(false);
      }
      if (!response.ok) {
        setError(json.error);
        setIsLoading(false);
        navigate(-1);
        navigate(`/error?message=${error}`);
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="marketplace-page-container">
      <div className="row">
        {isLoading ? (
          <div></div>
        ) : (
          products.map((product, index) => {
            return (
              <div
                key={index}
                className="each-card-container rounded-4 col-sm-4 col-lg-3 g-5 "
              >
                <a
                  className="marketplace-buy-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuy(product._doc._id);
                  }}
                >
                  <img
                    className="img-fluid align-self-center"
                    src={product.image}
                    alt={product._doc.title}
                  />
                  <div className="">
                    <h5 className="">{product._doc.title}</h5>
                    <p className="">{product._doc.province}</p>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <h6 className="">{formatPrice(product._doc.price)}</h6>
                  </div>
                </a>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
