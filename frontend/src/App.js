import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./Hook/Authentication/useAuthContext.js";
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
import AboutUs from "./Component/AboutUs/AboutUs.js";
import Handbook from "./Component/Handbook/Handbook.js";
import PageNotFound from "./Component/PageNotFound/PageNotFound.js";
import BuySignupVerify from "./Component/Signup/BuySignupVerify.js";
export default function App() {
  const { user, method } = useAuthContext();

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
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route path="/sell" element={<Sell />}></Route>

          <Route path="/buysignup" element={<BuySignup />}></Route>
          <Route path="/about" element={<AboutUs />} />
          <Route path="/sellsignup" element={<SellSignup />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/marketplace" element={<Marketplace />}></Route>
          <Route
            path="/products/:productId"
            element={<SingleProduct />}
          ></Route>
          <Route path="/error" element={<Error />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/handbook" element={<Handbook />} />
          <Route path="/buysignup/verify" element={<BuySignupVerify />}></Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <></>
    </div>
  );
}
