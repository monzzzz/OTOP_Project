import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Assets/style/Marketplace/SingleProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatPrice } from "../../Utils/PriceFormat";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
import ContentLoader from "react-content-loader";
import Review from "./Review/Review";

export default function SingleProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [hook, setHook] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthContext();
  // const { dispatch } = useCartContext();
  useEffect(() => {
    const getQuantityFromURL = () => {
      const searchParams = new URLSearchParams(location.search);
      const quantityParam = searchParams.get("quantity");
      if (quantityParam) {
        setQuantity(parseInt(quantityParam));
        setHook(false);
      }
    };
    const fetchSingleProduct = async () => {
      setIsLoading(true);
      const response = await fetch(`/api/market/products/${productId}`);
      const json = await response.json();
      if (response.ok) {
        setIsLoading(false);
        setProductData(json);
        setHook(false);
      }
      if (!response.ok) {
        setIsLoading(false);
        setError(json.error);
        navigate(-2);
        navigate(`/error?message=${error}`);
      }
    };
    getQuantityFromURL();
    fetchSingleProduct();
  }, [hook, error, location.search, navigate, productId]);

  const addQuantity = (e) => {
    e.preventDefault();
    if (quantity < 10) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      updateURL(newQuantity);
    }
  };
  const removeQuantity = (e) => {
    e.preventDefault();
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateURL(newQuantity);
    }
  };
  // quantity update in the URL
  const updateURL = (newQuantity) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set("quantity", newQuantity);

    // Use the 'replace' method to update the URL without adding a history entry
    const newUrl = `${location.pathname}?${newSearchParams.toString()}`;
    window.history.replaceState({}, "", newUrl);
  };
  const handleAddtoCart = async (itemId, price) => {
    // in the database before navigate to the cart page, we have to check if the quantity numberr user summited less than the quantity of products avaiable
    if (!user.id) {
    }
    if (user.id) {
      const ownerID = user.id;
      if (quantity !== "0") {
        const response = await fetch(
          `/api/cart/${itemId}?quantity=${quantity}`,
          {
            method: "POST",
            body: JSON.stringify({ ownerID: ownerID, price }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const json = await response.json();
        if (!response.ok) {
          setError(json.error);
        }
        console.log("success");
      }
    }
  };
  return (
    <div className="single-product-page-container">
      <div>
        {isLoading ? (
          <div>
            <ContentLoader viewBox="0 0 380 200">
              <rect x="0" y="0" rx="5" ry="5" width="110" height="125" />
              <rect x="175" y="10" rx="4" ry="4" width="200" height="13" />
              <rect x="175" y="40" rx="3" ry="3" width="200" height="10" />
              <rect x="175" y="60" rx="3" ry="3" width="200" height="10" />
              <rect x="225" y="80" rx="3" ry="3" width="150" height="10" />
              <rect x="325" y="100" rx="3" ry="3" width="50" height="10" />
              <rect x="0" y="150" rx="3" ry="3" width="375" height="10" />
            </ContentLoader>
          </div>
        ) : (
          productData && (
            <div className="single-product-container">
              <div className="row g-0 mb-5">
                <div className="col-sm-12 col-lg-6 product-image">
                  <img
                    className="single-product-page-image"
                    src={productData.image}
                    alt={productData._doc.title}
                  />
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
                  <div className="bottom-part mb-4">
                    <div className="single-product-history-title mb-2">
                      History
                    </div>
                    <div className="single-product-province mb-3">
                      Origin: {productData._doc.province}
                    </div>
                    <div className="single-product-history mb-4">
                      {productData._doc.history}
                    </div>
                  </div>
                  <div className="buy-function">
                    <div className="buy-function-inner">
                      <div className="quantity-container">
                        <button
                          className="remove-quantity-button"
                          onClick={(e) => removeQuantity(e)}
                        >
                          -
                        </button>
                        <span className="quantity-amount">{quantity}</span>
                        <button
                          className="add-quantity-button"
                          onClick={(e) => addQuantity(e)}
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <button
                          className="add-to-cart-button"
                          onClick={() => {
                            handleAddtoCart(
                              productData._doc._id,
                              productData._doc.price
                            );
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Review productId={productData._doc._id} />
            </div>
          )
        )}
      </div>
      {/*add the review and able specific user to comment the product qualiity*/}
    </div>
  );
}

// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import "../../Assets/style/Marketplace/SingleProduct.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { formatPrice } from "../../Utils/PriceFormat";
// import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
// export default function SingleProduct() {
//   const { productId } = useParams();
//   const [productData, setProductData] = useState(null);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(0);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { user } = useAuthContext();
//   useEffect(() => {
//     const getQuantityFromURL = () => {
//       const searchParams = new URLSearchParams(location.search);
//       const quantityParam = searchParams.get("quantity");
//       if (quantityParam) {
//         setQuantity(parseInt(quantityParam));
//       }
//     };
//     getQuantityFromURL();

//     const fetchSingleProduct = async () => {
//       const response = await fetch(`/api/market/products/${productId}`);
//       const json = await response.json();
//       if (response.ok) {
//         setProductData(json);
//       }
//       if (!response.ok) {
//         setError(json.error);
//         navigate(-2);
//         navigate(`/error?message=${error}`);
//       }
//     };
//     fetchSingleProduct();
//   });

//   const addQuantity = () => {
//     const newQuantity = quantity + 1;
//     updateURL(newQuantity);
//   };
//   const removeQuantity = () => {
//     if (quantity > 0) {
//       const newQuantity = quantity - 1;
//       updateURL(newQuantity);
//     }
//   };
//   // quantity update in the URL
//   const updateURL = (newQuantity) => {
//     const searchParams = new URLSearchParams(location.search);
//     if (!newQuantity) {
//       newQuantity = 0;
//     }
//     searchParams.set("quantity", newQuantity);
//     const pathname = location.pathname;
//     const newURL = pathname + "?" + searchParams.toString();
//     navigate(newURL, { replace: true });
//   };
//   const handleAddtoCart = async (itemId, price) => {
//     // in the database before navigate to the cart page, we have to check if the quantity numberr user summited less than the quantity of products avaiable
//     const searchParams = new URLSearchParams(location.search);
//     const quantityParam = searchParams.get("quantity");
//     const ownerID = user.id;
//     if (quantityParam !== "0") {
//       const response = await fetch(
//         `/api/cart/${itemId}?quantity=${quantityParam}`,
//         {
//           method: "POST",
//           body: JSON.stringify({ ownerID: ownerID, price }),
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       const json = await response.json();
//       if (!response.ok) {
//         setError(json.error);
//       }
//       console.log("success");
//     }
//   };
//   return (
//     <div className="single-product-page-container">
//       {productData && (
//         <div className="single-product-container">
//           <div className="row g-0">
//             <div className="col-sm-12 col-lg-6 product-image">
//               <img src={productData.image} alt={productData._doc.title} />
//             </div>
//             <div className="col-sm-12 col-lg-6">
//               <div className="top-part mb-4 border-bottom">
//                 <div className="single-product-title">
//                   {productData._doc.title}
//                 </div>
//                 {productData._doc.category === "-" ? (
//                   <h6 className="mb-4">No Category</h6>
//                 ) : (
//                   <h6 className="mb-4">{productData._doc.category}</h6>
//                 )}
//                 <div className="single-product-price mb-3">
//                   {formatPrice(productData._doc.price)}
//                 </div>
//               </div>
//               <div className="bottom-part mb-3">
//                 <div className="single-product-history-title">History</div>
//                 <div className="single-product-province mb-2">
//                   Origin: {productData._doc.province}
//                 </div>
//                 <div className="single-product-history">
//                   {productData._doc.history}
//                 </div>
//               </div>
//               <div className="buy-function">
//                 <span className="quantity-container">
//                   <button
//                     className="remove-quantity-button"
//                     onClick={removeQuantity}
//                   >
//                     -
//                   </button>
//                   <span className="quantity-amount">{quantity}</span>
//                   <button className="add-quantity-button" onClick={addQuantity}>
//                     +
//                   </button>
//                 </span>
//                 <span>
//                   <button
//                     className="btn btn-primary add-to-cart-button"
//                     onClick={() => {
//                       handleAddtoCart(
//                         productData._doc._id,
//                         productData._doc.price
//                       );
//                     }}
//                   >
//                     Add to Cart
//                   </button>
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
