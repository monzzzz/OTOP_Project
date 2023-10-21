import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Component/Main/Main.js";
import Navigation from "./Component/Nav/Navigation.js";
import Sell from "./Component/Sell/Sell.js";
import Login from "./Component/Login/Login.js";
import BuySignup from "./Component/Signup/BuySignup.js";
import SellSignup from "./Component/Signup/BuySignup.js";
import Profile from "./Component/Profile/Profile.js";
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
        </Routes>
      </BrowserRouter>
      <></>
    </div>
  );
}
