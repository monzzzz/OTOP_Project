import "../../../../../Assets/style/Nav/Nav-Screen/Small_Device_Component/Bars/Bars.css";
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Bars = (props) => {
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
        {props.data.map((item, index) => (
          <li key={index} className="nav_bar_item_left">
            <a href={item.href}>
              <FontAwesomeIcon icon={item.icon} className="nav_icon" />
              {item.text}
            </a>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Bars;
