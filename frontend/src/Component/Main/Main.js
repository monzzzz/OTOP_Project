import { useMediaQuery } from "react-responsive";
import Large_Device_Carousel from "./Carousel_Screen/Large_Device_Carousel";
import "../../Assets/style/Main/Main.css";
// temporary data test (later on, we receive data by using node js)
const picture_carousel = [
  {
    image: require("../../Assets/picture/silicon_valley.jpg"),
    title: "Silicon Valley",
    description: "",
  },
  {
    image: require("../../Assets/picture/google_hq.jpg"),
    title: "Google Headquarter",
    description: "",
  },
];
//

export default function Main() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="Main-container">
      <div className="Carousel-container">
        {isSmallDevice && <div></div>}
        {isLargeDevice && <div><Large_Device_Carousel data={picture_carousel} />
        </div>}
      </div>
      <div className="Main-top-item-container"></div>
    </div>
  );
}
