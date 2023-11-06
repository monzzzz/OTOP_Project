import Script from "react-load-script";

export default function PromptPay() {
  let Omise;
  const handleLoadScript = () => {
    console.log(window.OmiseCard);
    Omise = window.OmiseCard;
    Omise.configure({
      publicKey: "pkey_test_5xoev7sn4wflkzseb52",
    });
  };
  const checkOut = () => {
    Omise.open({
      amount: 12345,
      currency: "THB",
      defaultPaymentMethod: "promptpay",
    });
  };
  return (
    <div>
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleLoadScript} />
      <button
        onClick={() => {
          checkOut();
        }}
      >
        check out
      </button>
    </div>
  );
}
