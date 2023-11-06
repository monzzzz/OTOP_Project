import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Component/Main/Main.js";
import Navigation from "./Component/Nav/Navigation.js";
import Sell from "./Component/Sell/Sell.js";
import Login from "./Component/Login/Login.js";
import BuySignup from "./Component/Signup/BuySignup.js";
import SellSignup from "./Component/Signup/SellSignup.js";
import Profile from "./Component/Profile/Profile.js";
import Marketplace from "./Component/Marketplace/Marketplace.js";
import SingleProduct from "./Component/Marketplace/SingleProduct.js";
import Error from "./Component/Error/Error.js";
import Cart from "./Component/Cart/Cart.js";
import PromptPay from "./Component/Cart/PaymentType/PromptPay.js";
export default function App() {
  return (
    <div className="App">
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      ></meta>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/sell" element={<Sell />}></Route>
          <Route path="/buysignup" element={<BuySignup />}></Route>
          <Route path="/sellsignup" element={<SellSignup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route
            path="/products/:productId"
            element={<SingleProduct />}
          ></Route>
          <Route path="/error" element={<Error />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/payment/promtpay" element={<PromptPay />} />
        </Routes>
      </BrowserRouter>
      <></>
    </div>
  );
}
