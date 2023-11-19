import { useMediaQuery } from "react-responsive";
import SmallDevice from "./Nav-Screen/Nav_SmallDevice";
import LargeDevice from "./Nav-Screen/Nav_LargeDevice";
import "../../Assets/style/Nav/Navigation.css";
import { useState, useEffect } from "react";
export default function Navigation() {
  const isSmallDevice = useMediaQuery({
    query: "(max-width: 1024px)",
  });
  const isLargeDevice = useMediaQuery({
    query: "(min-width: 1024px)",
  });
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setSticky(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={`navigation-container ${isSticky ? "sticky" : ""}`}>
      {isSmallDevice && (
        <div>
          <SmallDevice />
        </div>
      )}
      {isLargeDevice && (
        <div>
          <LargeDevice />
        </div>
      )}
    </div>
  );
}
