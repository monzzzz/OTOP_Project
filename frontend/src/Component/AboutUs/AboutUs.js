import "../../Assets/style/AboutUs/AboutUs.css";
import AboutUsLarge from "./AboutUs_Screen/AboutUs_Large";
import AboutUsSmall from "./AboutUs_Screen/AboutUs_Small";
import { useMediaQuery } from "react-responsive";
export default function AboutUs() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  return (
    <div className="about-us-container">
      {isSmallDevice && (
        <div>
          <AboutUsSmall />
        </div>
      )}
      {isLargeDevice && (
        <div>
          <AboutUsLarge />
        </div>
      )}
    </div>
  );
}
