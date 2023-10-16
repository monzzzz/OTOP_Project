import "../../../Assets/style/Nav/Nav-Screen/Nav_Large_Device_Container.css";
import Search from "./Large_Device_Component/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav_data } from "../../../Data/Nav/Nav_Data";
export default function LargeDevice() {
  return (
    <nav className="Nav_Large_Device_Container ">
      <span className="path_container">
        <span>
          <a href="/" className="LOGO">
            <img
              alt="logo"
              src="../../../../public/logo.png"
              width="80px"
              height="30px"
            />
          </a>
        </span>
        {Nav_data.map((data, index) => {
          if (data.id !== "profile") {
            return (
              <span key={index} className="nav_path">
                <a
                  href={data.href}
                  className="text-decoration-none text-dark nav_link"
                >
                  <FontAwesomeIcon icon={data.icon} className="nav_icon" />
                  {data.text}
                </a>
              </span>
            );
          }
        })}
        <span>
          <Search />
        </span>
      </span>
      <span className="text-end">
        <a href="/login" className="nav_profile ">
          Login
        </a>
      </span>
    </nav>
  );
}
