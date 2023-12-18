import { useState } from "react";

export default function usePromptpay(amount, paymentType) {
  const [paymentInfo, setPaymentInfo] = useState("");
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    const paymentData = {
      amount: parseFloat(amount.toFixed(2)), // Example amount in satangs
      currency: "THB",
    };

    if (window.Omise) {
      window.Omise.createSource(
        "promptpay",
        paymentData,
        (statusCode, response) => {
          if (response.object === "source" && response.id) {
            sendSourceToBackend(response.id, response.amount).finally(() => {
              setIsLoading(false);
            });
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
      const response = await fetch("/api/payment/promptpay", {
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
      setPaymentInfo(json.data); //json.imageObject.download_uri

      // console.log("Charge created:", data);
    } catch (error) {
      console.error("Error sending source to backend:", error);
    }
  };
  return {
    scriptLoaded,
    paymentInfo,
    isLoading,
    handleFormSubmit,
    handleScriptLoad,
    sendSourceToBackend,
  };
}
