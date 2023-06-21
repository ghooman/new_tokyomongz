import roadmapImg1 from "../assets/images/universe-roadmap-img1.png";
import roadmapImg2En from "../assets/images/universe-roadmap-img2-en.png";
import roadmapImg2Jp from "../assets/images/universe-roadmap-img2-jp.png";
import aboutLogo from "../assets/images/mongz-universe-logo.svg";
import "../styles/Roadmap.scss";

const Roadmap = ({ language }) => {
  return (
    <>
      <div className="roadmap">
        <div className="roadmap-background"></div>
        <div className="roadmap-top">
          <p className="roadmap-img1-title">
            <div className="about-logo">
              <img src={aboutLogo} alt="logo" />
            </div>
            connecting METAVERSE and REAL WORLD
          </p>
          <div className="roadmap-img1">
            <img src={roadmapImg1} alt="roadmap-img" />
          </div>
        </div>
        <div className="roadmap-bottom">
          <p className="roadmap-img2-title">Mongz Universe Roadmap 2023</p>
          <div className="roadmap-img2-box">
            <div className="roadmap-img2">
              {language === "EN" ? (
                <img src={roadmapImg2En} alt="roadmap-img" />
              ) : (
                <img src={roadmapImg2Jp} alt="roadmap-img" />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
