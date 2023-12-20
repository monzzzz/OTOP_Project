import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";
// getItem by id and then check with the userId
export default function EditProduct() {
  const { productId } = useParams();
  const { user } = useAuthContext();
  const [credential, setCredential] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const checkUserCredential = async () => {
      const response = await fetch(`/api/market/products/${productId}`);
      const json = await response.json();
      if (response.ok) {
        console.log(user);

        // if (json._doc.sellerId === user.id) {
        //   setCredential(true);
        // }
      }
      if (!response.ok) {
      }
    };
    checkUserCredential();
  }, []);
  return (
    <div className="edit-your-product-page">
      {credential ? <div>HI</div> : <div>You don't have a credit</div>}
    </div>
  );
}
