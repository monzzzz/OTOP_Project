import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../../../Assets/style/AboutUs/AboutUs_Screen/AboutUs_Large.css";
import { useEffect, useState } from "react";

export default function AboutUsLarge() {
  const [scrollCircleProgress, setScrollCircleProgress] = useState(0);
  const [scrollInternationalProgress, setScrollInternationalProgress] =
    useState(0);
  const [scrollVillagerProgress, setScrollVillagerProgress] = useState(0);
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

      // Logic for internatinal mission Scroll
      const startIntroductionScroll = 150;
      const endIntroductionScroll = 300;
      let introductionProgress =
        (scrollPosition - startIntroductionScroll) /
        (endIntroductionScroll - startIntroductionScroll);
      introductionProgress = Math.min(Math.max(introductionProgress, 0), 1);
      setScrollInternationalProgress(introductionProgress);
      //
      const startLocationScroll = 500;
      const endLocationScroll = 600;
      let locationProgess =
        (scrollPosition - startLocationScroll) /
        (endLocationScroll - startLocationScroll);
      locationProgess = Math.min(Math.max(locationProgess, 0), 1);
      setScrollLocationProgress(locationProgess);
      // villager mission scroll
      const startVillagerScroll = 600;
      const endVillagerScroll = 700;
      let villagerProgess =
        (scrollPosition - startVillagerScroll) /
        (endVillagerScroll - startVillagerScroll);
      villagerProgess = Math.min(Math.max(villagerProgess, 0), 1);
      setScrollVillagerProgress(villagerProgess);
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
            scrollInternationalProgress > 0.5 ? "fade-in-active" : ""
          } fade-in-scroll`}
        >
          Mission
        </div>
        <div className="aboutus-mission-body">
          <div className="aboutus-global-container d-flex">
            <div className="aboutus-mission-image-container col-6 d-flex align-items-center ">
              <div className="aboutus-mission-image position-relative">
                <FontAwesomeIcon
                  icon={faGlobe}
                  className={`aboutus-globe w-80 ${
                    scrollInternationalProgress > 0.99 ? "fade-in-active" : ""
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
                scrollInternationalProgress > 0.99 ? "fade-in-active" : ""
              } fade-in-scroll col-6`}
            >
              <div className="mission-paragraph-text mb-1">
                <h3 className="mb-3">Globalizing Thai Traditions</h3>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Our foremost mission is to bring
                the vibrant and rich traditions of Thailand to the global stage,
                creating a bridge between local Thai culture and international
                travelers. Through our platform, we offer an English-language
                feature specifically designed to cater to global audiences,
                ensuring that the beauty and authenticity of Thai traditions are
                easily accessible and appreciated worldwide. By providing this
                gateway, we aim to foster a deeper understanding and
                appreciation of Thai culture among international visitors,
                making it effortless for them to explore and connect with the
                unique heritage and traditions that Thailand has to offer.
              </div>
            </div>
          </div>
          <div className="aboutus-villager-mission-container d-flex">
            <div className="col-6 d-flex ">
              <img
                src={require("../../../Assets/picture/aboutUsVillager.png")}
              ></img>
            </div>
            <div
              className={`col-6 d-flex flex-column pt-5  aboutus-villager-mission-paragraph ${
                scrollVillagerProgress > 0.99 ? "fade-in-active" : ""
              } fade-in-scroll `}
            >
              <div>
                <h3 className="mb-3">Supporting Villagers</h3>
              </div>
              <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; At the heart of our mission is a
                commitment to empowering Thai villagers, particularly those
                participating in the OTOP (One Tambon One Product) program. Our
                marketplace is uniquely positioned as a non-profit platform,
                charging the minimal possible fees to ensure that the maximum
                benefits reach the local artisans and producers. This approach
                not only aids in increasing the income of these villagers but
                also enhances their ability to sell their products to a broader
                audience. By eliminating financial barriers and providing an
                easy-to-use platform, we aim to uplift these communities,
                ensuring that their skills and crafts not only survive but
                thrive in the modern market. Our goal is to create a sustainable
                ecosystem where tradition meets opportunity, and local talents
                find a global audience.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
