import { useState } from "react";
import Home_Profile from "./Context/Home_Profile";
import "../../../Assets/style/Profile/Large_Screen_Profile.css";
export default function LargeScreenProfile() {
  const [render, setRender] = useState("home");
  const handleClickChange = (page) => {
    setRender(page);
  };
  return (
    <div className="large-screen-profile-container">
      <div className="row">
        <div className="side-bar col-2">
          <li
            onClick={() => {
              handleClickChange("home");
            }}
          >
            Home
          </li>
          <li
            onClick={() => {
              handleClickChange("history");
            }}
          >
            Order History
          </li>
        </div>
        <div className="col-9">{render === "home" && <Home_Profile />}</div>
      </div>
    </div>
  );
}
