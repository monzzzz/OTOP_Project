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
  console.log(products);
  return (
    <div className="marketplace-page-container">
      <div className="row">
        {products.map((product, index) => (
          <div
            key={index}
            className="card card_container rounded-4 col-sm-4 col-lg-3  mb-4"
          >
            <img className="card-img-top" src="..." />
            <div className="card-body">
              <h5 className="card-title">{product.title}</h5>
              <p className="card-text">{product.province}</p>
              <p className="card-text">{product.price}</p>
            </div>
            <div className="card-body">
              <a href="/marketplace/detail" className="card-link">
                Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
