import "../../../Assets/style/Nav/Nav-Screen/Nav_Large_Device_Container.css";
import Search from "./Large_Device_Component/Search/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Nav_data } from "../../../Data/Nav/Nav_Data";
import { useAuthContext } from "../../../Hook/Authentication/useAuthContext";
import { faUser, faCartShopping } from "@fortawesome/free-solid-svg-icons";
export default function LargeDevice() {
  const { user, method } = useAuthContext();
  const methodValid = method === "sell";
  return (
    <nav className="Nav_Large_Device_Container ">
      <span className="path_container d-flex align-items-center">
        <span>
          <a href="/" className="LOGO">
            <img
              alt="logo"
              src={require("../../../Assets/picture/traditee_logo.png")}
              style={{ width: "8rem" }}
            />
          </a>
        </span>
        <span>
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
        </span>
        <span>
          <Search />
        </span>
      </span>
      <span className="text-end end_group">
        {methodValid && (
          <span>
            <a href="/sell" className="sell_button">
              Sell
            </a>
          </span>
        )}
        {!user && (
          <a href="/login" className="login_button">
            Login
          </a>
        )}
        {user && (
          <span>
            <a href="/cart" className="cart_button">
              <FontAwesomeIcon icon={faCartShopping} className="nav_icon" />
              Cart
            </a>
            <a href="/profile" className="nav_profile">
              <FontAwesomeIcon icon={faUser} className="nav_icon" />
              {user.username}
            </a>
          </span>
        )}
      </span>
    </nav>
  );
}
