import React from "react";
import mainVdieo from "../assets/new_hashlink_main_video.mp4";
import "../styles/Main.scss";
import Footer from "../components/Footer";
import mainLinkImg from "../assets/images/main-link-img.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Main = ({ language }) => {
  const navigate = useNavigate();
  const handlePage = () => {
    navigate("");
  };

  return (
    <>
      <div className="main-background">
        <div className="main-video">
          <video src={mainVdieo} autoPlay muted loop></video>
        </div>
        <Footer language={language} />
      </div>

      {/* <Link
        to="https://mint.tokyomongzhillsclub.com/"
        target="_blank"
        className="main-link"
        onClick={handlePage}
        rel="noopener noreferrer"
      >
        <div className="main-link__img">
          <img src={mainLinkImg} alt="link-img" />
        </div>
        <div className="main-link__text-box">
          <p className="main-link__text">PEACHz.MOMO Mint Site</p>
        </div>
      </Link> */}
    </>
  );
};

export default Main;
