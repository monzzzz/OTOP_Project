import { useState, useEffect } from "react";
import Script from "react-load-script";
import "../../../Assets/style/Cart/PaymentType/PromptPay.css";
export default function PromptPay({ paymentType }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [data, setData] = useState("");

  useEffect(() => {
    if (scriptLoaded) {
      window.Omise.setPublicKey("pkey_test_5xoev7sn4wflkzseb52");
    }
    if (paymentType === "promptpay" && scriptLoaded === true) {
      handleFormSubmit();
    }
  }, [scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleFormSubmit = () => {
    const paymentData = {
      amount: 10000, // Example amount in satangs
      currency: "THB",
    };

    if (window.Omise) {
      window.Omise.createSource(
        "promptpay",
        paymentData,
        (statusCode, response) => {
          if (response.object === "source" && response.id) {
            sendSourceToBackend(response.id, response.amount);
            console.log(response);
          } else {
            console.error(response);
          }
        }
      );
    } else {
      console.error("Omise library not loaded");
    }
  };
  const sendSourceToBackend = async (sourceId, amount) => {
    try {
      const response = await fetch("/payment/promptpay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sourceId, amount }), // pass sourceId an attribute
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      setData(json.data); //json.imageObject.download_uri

      // console.log("Charge created:", data);
    } catch (error) {
      console.error("Error sending source to backend:", error);
    }
  };

  return (
    <div className="promptpay-payment">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      {scriptLoaded ? (
        <div className="promptpay-container">
          <h1 className="mb-5">Payment</h1>

          {data && (
            <div className="promptpay-qr-frame d-flex">
              <div className="qrcode-image-container col-lg-5 col-md-5 col-sm-12">
                <img
                  src={data.source.scannable_code.image.download_uri}
                  alt="promptpay-qrcode"
                  className="qrcode-image"
                  style={{ width: "80%" }}
                />
              </div>
              <div className="col-lg-7 col-md-7 col-sm-12 d-flex flex-column">
                <div className="promptpay-qrcode-amount mb-3">
                  Amount: {data.source.amount} {data.source.currency}
                </div>
                <div>Expired: {data.expires_at}</div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}
