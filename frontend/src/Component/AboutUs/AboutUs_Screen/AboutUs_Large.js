import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../../../Assets/style/AboutUs/AboutUs_Screen/AboutUs_Large.css";
import { useEffect, useState } from "react";

export default function AboutUsLarge() {
  const [scrollCircleProgress, setScrollCircleProgress] = useState(0);
  const [scrollIntroductionProgress, setScrollIntroductionProgress] =
    useState(0);
  const [scrollLocationProgress, setScrollLocationProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Logic for Circle Scroll
      const startCircleScroll = 10;
      const endCircleScroll = 100;
      let circleProgress =
        (scrollPosition - startCircleScroll) /
        (endCircleScroll - startCircleScroll);
      circleProgress = Math.min(Math.max(circleProgress, 0), 1);
      setScrollCircleProgress(circleProgress);

      // Logic for Introduction Scroll
      const startIntroductionScroll = 150;
      const endIntroductionScroll = 200;
      let introductionProgress =
        (scrollPosition - startIntroductionScroll) /
        (endIntroductionScroll - startIntroductionScroll);
      introductionProgress = Math.min(Math.max(introductionProgress, 0), 1);
      setScrollIntroductionProgress(introductionProgress);
      const startLocationScroll = 500;
      const endLocationScroll = 600;
      let locationProgess =
        (scrollPosition - startLocationScroll) /
        (endLocationScroll - startLocationScroll);
      introductionProgress = Math.min(Math.max(introductionProgress, 0), 1);
      setScrollLocationProgress(locationProgess);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const circleLeftStyle = {
    transform: `translateX(${12 + scrollCircleProgress * 38}%)`,
  };
  const circleRightStyle = {
    transform: `translateX(-${12 + scrollCircleProgress * 38}%)`,
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
                  scrollCircleProgress > 0.95 ? "circle-together" : ""
                }`}
              >
                {scrollCircleProgress > 0.95 ? "Traditee" : "Trade"}
              </div>
              <div
                style={circleRightStyle}
                className={`circle ${
                  scrollCircleProgress > 0.95 ? "circle-together" : ""
                }`}
              >
                {scrollCircleProgress > 0.95 ? "Traditee" : "Tradition"}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mission-container">
        <div
          className={`header-mission-container ${
            scrollIntroductionProgress > 0.5 ? "fade-in-active" : ""
          } fade-in-scroll`}
        >
          Mission
        </div>
        <div className="aboutus-mission-body d-flex">
          <div className={`aboutus-mission-image-container col-6 `}>
            <div className="aboutus-mission-image position-relative">
              <FontAwesomeIcon
                icon={faGlobe}
                className={`aboutus-globe w-80 ${
                  scrollIntroductionProgress > 0.99 ? "fade-in-active" : ""
                } fade-in-scroll-location`}
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`text-secondary aboutus-location-1 ${
                  scrollLocationProgress > 0.1 ? "fade-in-active" : ""
                } fade-in-scroll-location`}
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`text-secondary aboutus-location-2 ${
                  scrollLocationProgress > 0.7 ? "fade-in-active" : ""
                } fade-in-scroll-location`}
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`text-secondary aboutus-location-3 ${
                  scrollLocationProgress > 0.5 ? "fade-in-active" : ""
                } fade-in-scroll-location`}
              />
              <FontAwesomeIcon
                icon={faLocationDot}
                className={`text-secondary aboutus-location-4 ${
                  scrollLocationProgress > 0.3 ? "fade-in-active" : ""
                } fade-in-scroll-location`}
              />
            </div>
          </div>
          <div
            className={`aboutus-mission-paragraph d-flex align-items-center ${
              scrollIntroductionProgress > 0.99 ? "fade-in-active" : ""
            } fade-in-scroll col-6`}
          >
            <div className="mission-paragraph-text mb-1">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; At Traditee, our mission is to
              bridge the gap between the rich cultural heritage of Thailand's
              countryside and the global marketplace. We are more than just an
              online platform; we are a community-driven initiative dedicated to
              uplifting local artisans and small-scale producers.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
