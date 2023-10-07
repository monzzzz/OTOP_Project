import "../../../../../Assets/style/Nav/Nav-Screen/Small_Device_Component/Bars/Bars.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";

const Bars = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

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
        <li className="sidebar_item_marketplace">
          <a href="/marketplace">
            <FontAwesomeIcon icon={faStore} className="nav_icon" />
            Marketplace
          </a>
        </li>
        <li className="sidebar_item_profile">
          <a href="/profile">
            <i className="fa fa-user nav_icon"></i>
            Profile
          </a>
        </li>
      </div>
    </div>
  );
};

export default Bars;
