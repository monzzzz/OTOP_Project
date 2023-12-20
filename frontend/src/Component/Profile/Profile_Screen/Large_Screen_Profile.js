import { useState } from "react";
import Home_Profile from "./Context/Home_Profile";
import YourProduct from "./Context/YourProduct";
import "../../../Assets/style/Profile/Large_Screen_Profile.css";
import { useAuthContext } from "../../../Hook/Authentication/useAuthContext";
export default function LargeScreenProfile() {
  const [render, setRender] = useState("home");
  const { user } = useAuthContext();
  const handleClickChange = (page) => {
    setRender(page);
  };
  return (
    <div className="large-screen-profile-container">
      <div className="row">
        <div className="side-bar col-2">
          <li
            className="mb-3"
            onClick={() => {
              handleClickChange("home");
            }}
          >
            Home
          </li>
          <li
            className="mb-3"
            onClick={() => {
              handleClickChange("history");
            }}
          >
            Order History
          </li>
          <li
            className="mb-3"
            onClick={() => {
              handleClickChange("comment");
            }}
          >
            Comment
          </li>
          {user && (
            <li
              className="mb-3"
              onClick={() => {
                handleClickChange("yourproduct");
              }}
            >
              Your product
            </li>
          )}
        </div>
        <div className="col-9">
          {render === "home" && <Home_Profile />}
          {render === "yourproduct" && <YourProduct />}
        </div>
      </div>
    </div>
  );
}
