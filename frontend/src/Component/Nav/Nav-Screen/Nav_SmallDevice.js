import "../../../Assets/style/Nav/Nav-Screen/Nav_Small_Device.css";
import Bars from "./Small_Device_Component/Bars/Bars";
import Search from "./Small_Device_Component/Search/Search";
import { Nav_data } from "../../../Data/Nav/Nav_Data";
export default function SmallDevice() {
  return (
    <nav className="Nav_Small_Device_Container">
      <a href="/" className="LOGO">
        <img alt="logo" src="/logo.png" width="100px" height="30px" />
      </a>
      <Search />
      <Bars data={Nav_data} />
    </nav>
  );
}
