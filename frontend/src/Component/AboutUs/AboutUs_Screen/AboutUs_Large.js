import "../../../Assets/style/AboutUs/AboutUs_Screen/AboutUs_Large.css";
import { useEffect, useState } from "react";

export default function AboutUsLarge() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleCircleScroll = () => {
      const scrollPosition = window.scrollY;
      const startScroll = 10;
      const endScroll = 30;
      let progress = (scrollPosition - startScroll) / (endScroll - startScroll);
      progress = Math.min(Math.max(progress, 0), 1);

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleCircleScroll);

    return () => {
      window.removeEventListener("scroll", handleCircleScroll);
    };
  }, []);

  const circleLeftStyle = {
    transform: `translateX(${scrollProgress * 61}%)`,
  };
  const circleRightStyle = {
    transform: `translateX(-${scrollProgress * 61}%)`,
  };

  return (
    <div className="about-us-large-container">
      <div className="header-container d-flex">
        <div className="px-5 py-4">
          <div className="aboutus-header">About Us</div>
        </div>
      </div>
      <div className="hook-container d-flex">
        <div className="col-12 d-flex align-items-center">
          <div className="col-4">
            <div className="subtopic-text">
              <span className="traditee-text">Traditee</span>, Blending the Best
              of Trade and Tradition
            </div>
          </div>
          <div className="hook-container-right col-8">
            <div className="two-circle-container d-flex">
              <div
                style={circleLeftStyle}
                className={`circle ${
                  scrollProgress > 0.95 ? "circle-together" : ""
                }`}
              >
                {scrollProgress > 0.95 ? "Traditee" : "Trade"}
              </div>
              <div
                style={circleRightStyle}
                className={`circle ${
                  scrollProgress > 0.95 ? "circle-together" : ""
                }`}
              >
                {scrollProgress > 0.95 ? "Traditee" : "Tradition"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="introduction-container"></div>
    </div>
  );
}
