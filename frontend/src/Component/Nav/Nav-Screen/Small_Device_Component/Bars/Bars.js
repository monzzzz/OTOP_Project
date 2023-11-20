import "../../../../../Assets/style/Nav/Nav-Screen/Small_Device_Component/Bars/Bars.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuthContext } from "../../../../../Hook/Authentication/useAuthContext";
import {
  faUserCircle,
  faMagnifyingGlassDollar,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
const Bars = (props) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { user, method } = useAuthContext();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
  }, [isSidebarOpen]);
  const methodValid = method === "sell";
  return (
    <div className="sidebar-container">
      <div className="bar_nav">
        <i className="fa fa-bars fa-lg" onClick={toggleSidebar}></i>
      </div>
      <div className={isSidebarOpen ? "nav_menu active" : "nav_menu"}>
        <div className="row nav_head_menu container-fluid ">
          <div className="col-5"></div>
          <div className="col-2 text_menu">Menu</div>
          <div className="col-5 text-end mt-1">
            <i className="fa fa-arrow-right fa-lg" onClick={toggleSidebar}></i>
          </div>
        </div>
        {props.data.map((item, index) => (
          <li key={index} className="nav_bar_item_left">
            <a href={item.href}>
              <FontAwesomeIcon icon={item.icon} className="nav_icon" />
              {item.text}
            </a>
          </li>
        ))}

        {methodValid && (
          <li className="sell_li">
            <a href="/sell" className="sell_button_small">
              <FontAwesomeIcon
                icon={faMagnifyingGlassDollar}
                className="nav_icon"
              />
              Sell
            </a>
          </li>
        )}
        <li className="sell_li">
          <a href="/cart" className="sell_button_small">
            <FontAwesomeIcon icon={faCartShopping} className="nav_icon" />
            Cart
          </a>
        </li>

        {!user && (
          <li className="nav_bar_login_button rounded-2 ">
            <a href="/login" className="nav_small_login_button">
              Login
            </a>
          </li>
        )}
        {user && (
          <a href="/profile" className="profile_text">
            <FontAwesomeIcon icon={faUserCircle} className="nav_icon" />
            {user.username}
          </a>
        )}
      </div>
    </div>
  );
};

export default Bars;
