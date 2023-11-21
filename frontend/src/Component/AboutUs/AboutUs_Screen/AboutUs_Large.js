import "../../../Assets/style/AboutUs/AboutUs_Screen/AboutUs_Large.css";
import { useEffect, useState } from "react";

export default function AboutUsLarge() {
  const [scrollCircleProgress, setScrollCircleProgress] = useState(0);
  const [scrollIntroductionProgress, setScrollIntroductionProgress] =
    useState(0);

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
      <div className="introduction-container">
        <div
          className={`header-introduction-container ${
            scrollIntroductionProgress > 0.95 ? "fade-in-active" : ""
          } fade-in-scroll`}
        >
          Introduction
        </div>
        <div className="aboutus-introduction-body d-flex">
          <div
            className={`aboutus-introduction-paragraph ${
              scrollIntroductionProgress > 0.99 ? "fade-in-active" : ""
            } fade-in-scroll col-7`}
          >
            <div className="mb-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; At Traditee, we proudly stand as a
              beacon of Thailand's rich heritage and craftsmanship, a unique
              marketplace born from the heart of our villages. Our platform is
              more than just a marketplace; it's a celebration of the
              government-backed OTOP (One Tambon One Product) campaign, an
              initiative that shines a light on the unparalleled skills of our
              local artisans.
            </div>
            <div className="mb-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here, tradition meets technology.
              Our online platform is meticulously designed to be a free
              marketplace, eliminating barriers and opening up a world of
              opportunities. We are committed to increasing the income of our
              villagers by showcasing a diverse array of traditional products to
              a global audience. From handcrafted goods to timeless art, our
              marketplace is a treasure trove of Thailand's cultural legacy.
            </div>
            <div className="mb-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessibility and simplicity are the
              cornerstones of our service. We believe that everyone, regardless
              of their technical savviness, should have the opportunity to
              explore and purchase these unique products. Our user-friendly
              interface ensures that navigating through our assortment of
              traditional offerings is a seamless and enjoyable experience.
            </div>
            <div className="mb-3">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Join us in our journey to empower
              our villages, preserve our traditions, and bring a piece of
              Thailand's soul into every home. Traditee is not just a
              marketplace; it's a gateway to explore, appreciate, and support
              the heart of our community craftsmanship.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
