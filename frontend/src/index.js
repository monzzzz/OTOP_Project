import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/js/bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "popper.js/dist/umd/popper";
import "font-awesome/css/font-awesome.css";
// google provider
import { GoogleOAuthProvider } from "@react-oauth/google";

// Context
import { AuthContextProvider } from "./Context/AuthenticationContext/AuthContext";
import { ProductContextProvider } from "./Context/AuthenticationContext/ProductContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="163951458426-d2cdh9d0t887aamna7fjt43po7ihjcvp.apps.googleusercontent.com">
      <AuthContextProvider>
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </AuthContextProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
