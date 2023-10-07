import "../../../Assets/style/Nav/Nav-Screen/Nav_Large_Device_Container.css";
import Search from "./Large_Device_Component/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStore } from "@fortawesome/free-solid-svg-icons";
import { faBook } from "@fortawesome/free-solid-svg-icons";
export default function LargeDevice() {
  return (
    <nav className="Nav_Large_Device_Container ">
      <span className="path_container">
        <span>
          <a href="/" className="LOGO">
            <img alt="logo" src="/logo.png" width="100px" height="30px" />
          </a>
        </span>
        <span className="nav_path">
          <a
            href="/marketplace"
            className="text-decoration-none text-dark nav_link"
          >
            <FontAwesomeIcon icon={faStore} className="nav_icon" />
            Marketplace
          </a>
        </span>
        <span className="nav_path">
          <a href="/about" className="text-decoration-none text-dark nav_link">
            <FontAwesomeIcon icon={faBook} className="about_us_icon" />
            About Us
          </a>
        </span>
        <span>
          <Search />
        </span>
      </span>

      <span className="text-end">
        <a href="/profile" className="nav_profile ">
          <i className="fa fa-user nav_icon text-dark"></i>
          Profile
        </a>
      </span>
    </nav>
  );
}
