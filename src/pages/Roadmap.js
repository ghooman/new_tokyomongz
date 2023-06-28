import roadmapImg1 from "../assets/images/universe-roadmap-img1.png";
import roadmapImg2 from "../assets/images/universe-roadmap-img2.png";
import aboutLogo from "../assets/images/mongz-universe-logo.svg";
import "../styles/Roadmap.scss";

const Roadmap = ({ language }) => {
  return (
    <>
      <div className="roadmap">
        <div className="roadmap-background"></div>
        <div className="roadmap-top">
          <div className="roadmap-img1">
            <img src={roadmapImg1} alt="roadmap-img" />
          </div>
        </div>
        <div className="roadmap-bottom">

          <div className="roadmap-img2-box">
            <div className="roadmap-img2">

                <img src={roadmapImg2} alt="roadmap-img" />

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
