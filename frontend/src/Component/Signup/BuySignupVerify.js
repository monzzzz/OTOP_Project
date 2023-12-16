import "../../Assets/style/Signup/SignupVerify.css";
import { useState, createRef, useEffect } from "react";
import useBuySignupVerification from "../../Hook/Authentication/Buy/useBuySignupVerification";
import { useAuthContext } from "../../Hook/Authentication/useAuthContext";

export default function BuySignupVerify() {
  // change the page if the user verify or maybe send the sign that help user
  const [code, setCode] = useState(new Array(6).fill(""));
  const [codeResponse, setCodeResponse] = useState("");
  const inputRefs = Array.from({ length: 6 }, () => createRef());
  const { user } = useAuthContext();
  const { verify } = useBuySignupVerification();

  useEffect(() => {
    /* get the updated from the dispattch or useAuthcon */
    setCodeResponse(user);
    console.log(user);
  }, [user]);
  console.log(codeResponse);
  const handleChange = (element, index) => {
    const newCode = [...code];
    newCode[index] = element.value;
    setCode(newCode);

    if (element.value.length === 1 && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  const handleSubmit = async () => {
    const verificationCode = code.join("");
    const userId = user.id;
    try {
      const message = await verify(verificationCode, userId);
      console.log(message);
      setCodeResponse(message);
    } catch (error) {
      console.error("Verification error:", error);
    }
  };
  return (
    <div className="buy-signup-verify-container">
      <div>
        {codeResponse &&
          (codeResponse.isVerified ? (
            <div>
              <h2>Your code was successfully verified</h2>
            </div>
          ) : (
            <div className="d-flex flex-column align-items-center">
              <h1>Confirm Your Email Address</h1>
              <p className="mb-5">
                A 6-digit code has been sent to your email. Please enter it
                below to verify your account.
              </p>
              <div className="mb-5">
                {code.map((singleCode, index) => (
                  <input
                    key={index}
                    className="digit-input"
                    type="text"
                    maxLength="1"
                    value={singleCode}
                    onChange={(e) => handleChange(e.target, index)}
                    ref={inputRefs[index]}
                    style={{
                      width: "4rem",
                      height: "4rem",
                      textAlign: "center",
                    }}
                  />
                ))}
              </div>
              <button className="verify-button" onClick={handleSubmit}>
                Verify
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
