// use when we want to get the information about product to render (in this page, we will use title, price and province)
import { useProductContext } from "../../Hook/Product/useProductContext";
import { useEffect } from "react";

import "../../Assets/style/Marketplace/Marketplace.css";
export default function Marketplace() {
  const { products, dispatch } = useProductContext();
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await fetch("/api/market/products");
      const json = await response.json(); // in the backend, every of my object send the json text
      if (response.ok) {
        dispatch({ type: "SET_PRODUCT", payload: json });
      }
    };
    fetchProduct();
  }, []);
  return (
    <div className="marketplace-page-container">
      <div className="row">
        {products.map((product, index) => {
          console.log("product:", product);
          return (
            <div
              key={index}
              className="card card_container rounded-4 col-sm-4 col-lg-3  mb-4"
            >
              <img className="card-img-top" src={product.image} />
              <div className="card-body">
                <h5 className="card-title">{product._doc.title}</h5>
                <p className="card-text">{product._doc.province}</p>
              </div>
              <div className="card-body d-flex justify-content-between align-items-end">
                <h6 className="card-text">{product._doc.price} Bath</h6>
                <a href="/marketplace/detail" className="btn btn-primary">
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
