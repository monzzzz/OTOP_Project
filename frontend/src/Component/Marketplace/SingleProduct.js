import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../Assets/style/Marketplace/SingleProduct.css";
import { useNavigate, useLocation } from "react-router-dom";
import { formatPrice } from "../../Utils/PriceFormat";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
// import { useCartContext } from "../../Hook/Cart/useCartContext";
export default function SingleProduct() {
  const { productId } = useParams();
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
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
      }
    };
    getQuantityFromURL();

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
    const newQuantity = quantity + 1;
    updateURL(newQuantity);
  };
  const removeQuantity = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      updateURL(newQuantity);
    }
  };
  // quantity update in the URL
  const updateURL = (newQuantity) => {
    const searchParams = new URLSearchParams(location.search);
    if (!newQuantity) {
      newQuantity = 0;
    }
    searchParams.set("quantity", newQuantity);
    const pathname = location.pathname;
    const newURL = pathname + "?" + searchParams.toString();
    navigate(newURL, { replace: true });
  };
  const handleAddtoCart = async (itemId, price) => {
    // in the database before navigate to the cart page, we have to check if the quantity numberr user summited less than the quantity of products avaiable
    if (!user.id) {
    }
    if (user.id) {
      const searchParams = new URLSearchParams(location.search);
      const quantityParam = searchParams.get("quantity");
      const ownerID = user.id;
      if (quantityParam !== "0") {
        const response = await fetch(
          `/api/cart/${itemId}?quantity=${quantityParam}`,
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
      {productData && (
        <div className="single-product-container">
          <div className="row g-0">
            <div className="col-sm-12 col-lg-6 product-image">
              <img src={productData.image} alt={productData._doc.title} />
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
                  <button
                    className="btn btn-primary add-to-cart-button"
                    onClick={() => {
                      handleAddtoCart(
                        productData._doc._id,
                        productData._doc.price
                      );
                    }}
                  >
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
