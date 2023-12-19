import { useEffect, useState } from "react";
import Script from "react-load-script";
import "../../../Assets/style/Cart/PaymentType/PromptPay.css";
import { CountdownTimer } from "./CountdownExpires";
import ContentLoader from "react-content-loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import usePromptpay from "../../../Hook/Cart/PaymentType/usePromptpay";
import { formatPrice } from "../../../Utils/PriceFormat";
export default function PromptPay(props) {
  const [qrCodeLoad, setQrCodeLoad] = useState(false);
  const {
    isLoading,
    paymentInfo,
    scriptLoaded,
    handleFormSubmit,
    handleScriptLoad,
  } = usePromptpay(props.amount * 100, props.paymentType);
  useEffect(() => {
    if (scriptLoaded) {
      window.Omise.setPublicKey("pkey_test_5xoev7sn4wflkzseb52");
    }
    if (
      props.paymentType === "promptpay" &&
      scriptLoaded === true &&
      props.onPaymentType === true
    ) {
      handleFormSubmit(props.amount);
    }
  }, [scriptLoaded, props.onPaymentType]);
  const handleQrCodeLoad = () => {
    setQrCodeLoad(true);
  };
  useEffect(() => {
    if (!isLoading && paymentInfo && qrCodeLoad) {
      props.onQrCodeReady();
      setQrCodeLoad(false);
    }
  }, [isLoading, paymentInfo, qrCodeLoad, props.onQrCodeReady]);

  const scrollToTop = () => {
    props.clickScrollToTop();
    props.setPaymentTypeClick(false);
  };

  return (
    <div className="promptpay-payment">
      <Script url="https://cdn.omise.co/omise.js" onLoad={handleScriptLoad} />
      {scriptLoaded ? (
        <div className="promptpay-container">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-5">Payment</h1>

            <FontAwesomeIcon
              icon={faArrowUp}
              onClick={scrollToTop}
              className="arrow-font-size"
            ></FontAwesomeIcon>
          </div>

          {isLoading ? (
            <div>
              <ContentLoader viewBox="0 0 380 200">
                <rect x="0" y="0" rx="5" ry="5" width="110" height="150" />
                <rect x="175" y="10" rx="3" ry="3" width="200" height="10" />
                <rect x="175" y="30" rx="3" ry="3" width="200" height="10" />
                <rect x="225" y="60" rx="3" ry="3" width="150" height="10" />
                <rect x="325" y="80" rx="3" ry="3" width="50" height="10" />
              </ContentLoader>
            </div>
          ) : (
            paymentInfo && (
              <div className="promptpay-qr-frame d-flex">
                <div className="qrcode-image-container col-lg-5 col-md-5 col-sm-12">
                  <img
                    src={paymentInfo.source.scannable_code.image.download_uri}
                    alt="promptpay-qrcode"
                    onLoad={() => {
                      handleQrCodeLoad();
                    }}
                    className="qrcode-image"
                    style={{ width: "80%" }}
                  />
                </div>
                <div className="col-lg-7 col-md-7 col-sm-12 d-flex flex-column">
                  <div className="promptpay-qrcode-amount mb-3">
                    Amount: {formatPrice(paymentInfo.source.amount / 100)}{" "}
                  </div>
                  <div className="promptpay-expired-date">
                    Expired:{" "}
                    <CountdownTimer expiryDate={paymentInfo.expires_at} />
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
