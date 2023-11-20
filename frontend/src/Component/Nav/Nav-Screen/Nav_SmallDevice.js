import "../../../Assets/style/Nav/Nav-Screen/Nav_Small_Device.css";
import Bars from "./Small_Device_Component/Bars/Bars";
import Search from "./Small_Device_Component/Search/Search";
import { Nav_data } from "../../../Data/Nav/Nav_Data";
export default function SmallDevice() {
  return (
    <nav className="Nav_Small_Device_Container d-flex align-items-center">
      <a href="/" className="LOGO">
        <div className="logo-container">
          <img
            alt="logo"
            src={require("../../../Assets/picture/traditee_logo_small.png")}
            style={{ width: "2.5rem" }}
          />
        </div>
      </a>
      <Search />
      <Bars data={Nav_data} />
    </nav>
  );
}
