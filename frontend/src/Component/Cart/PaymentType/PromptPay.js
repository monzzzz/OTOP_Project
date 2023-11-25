import { useState, useEffect } from "react";
import Script from "react-load-script";
import "../../../Assets/style/Cart/PaymentType/PromptPay.css";
export default function PromptPay() {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [urlLink, setUrlLink] = useState("");

  useEffect(() => {
    if (scriptLoaded) {
      window.Omise.setPublicKey("pkey_test_5xoev7sn4wflkzseb52");
    }
  }, [scriptLoaded]);

  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

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
      setUrlLink(json.imageObject.download_uri);

      // console.log("Charge created:", data);
    } catch (error) {
      console.error("Error sending source to backend:", error);
    }
  };

  return (
    <div className="promptpay-payment">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      {scriptLoaded ? (
        <>
          <form onSubmit={handleFormSubmit}>
            <button type="submit">Generate PromptPay QR Code</button>
          </form>
          {urlLink && (
            <div className="qrcode-image">
              <img src={urlLink} alt="promptpay-qrcode" />
            </div>
          )}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
