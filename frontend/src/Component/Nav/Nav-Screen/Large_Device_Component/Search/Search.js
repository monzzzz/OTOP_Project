import React, { useState } from "react";
import "../../../../../Assets/style/Nav/Nav-Screen/Large_Device_Component/Search/Search.css";
export default function SearchBar() {
  const [input, setInput] = useState("");
  const handleChange = (value) => {
    setInput(value);
  };
  return (
    <div className="nav_search_container">
      <div className="input-wrapper">
        <input placeholder="Search heros, items, ID" />
        <i
          className="fa fa-search nav_search_icon"
          onChange={(e) => handleChange(e.target.value)}
        ></i>
      </div>
    </div>
  );
}
