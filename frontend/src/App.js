import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from "./Main/Main.js";
import Navigation from "./Nav/Navigation.js";
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
        </Routes>
      </BrowserRouter>
      <></>
    </div>
  );
}
