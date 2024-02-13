import tmhcCoin from "../assets/images/mzc-coin-icon.png";
// ================ pc img =====================
import aboutMomo1en from "../assets/images/about-momo-img1-en.png";
import aboutMomo1jp from "../assets/images/about-momo-img1-jp.png";

// =============== mo img ======================
import aboutMomo1enM from "../assets/images/about-momo-img1-en-m.png";
import aboutMomo1jpM from "../assets/images/about-momo-img1-jp-m.png";

import momoVid from "../assets/new_hashlink_main_video.mp4";

import "../styles/AboutMomo.scss";

const AboutMomo = ({ language }) => {
  return (
    <>
      <div className="about-momo">
        <div className="about-momo__video-box">
          <video
            src={momoVid}
            autoPlay
            muted
            loop
            playsinline
            className="about-momo__video"
          ></video>
        </div>
        {/* ======================= pc img ====================== */}
        <div className="about-momo__img1">
          {language === "EN" ? (
            <img src={aboutMomo1en} alt="momo1" />
          ) : (
            <img src={aboutMomo1jp} alt="momo1" />
          )}
        </div>

        {/* ======================= mobile img ====================== */}
        <div className="about-momo__img1-m">
          {language === "EN" ? (
            <img src={aboutMomo1enM} alt="momo1" />
          ) : (
            <img src={aboutMomo1jpM} alt="momo1" />
          )}
        </div>
      </div>
    </>
  );
};

export default AboutMomo;
