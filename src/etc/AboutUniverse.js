import "../styles/AboutUniverse.scss";
import tmhcMenu from "../assets/images/tmhc-menu-img.png";
import momoMenu from "../assets/images/momo-menu-img.png";
import { Link } from "react-router-dom";

const AboutUniverse = () => {
  return (
    <>
      <div className="about-universe">
        <div className="inner">
          <ul>
            <li className="about-universe__items">
              <Link to="/about-tmhc">
                <div className="about-universe__img">
                  <img src={tmhcMenu} alt="tmhc" />
                  <span className="items__title">
                    #001 Tokyo Mongz Hills Club
                  </span>
                </div>
              </Link>
            </li>
            <li className="about-universe__items">
              <Link to="/about-momo">
                <div className="about-universe__img">
                  <img src={momoMenu} alt="momo" />
                  <span className="items__title">#002 PEACHz.MOMO</span>
                </div>
              </Link>
            </li>
            <li className="about-universe__items">
              <div className="about-universe__img">
                COMING SOON
                <span className="items__title empty">#003 INU PROJECT</span>
              </div>
            </li>
            <li className="about-universe__items">
              <div className="about-universe__img">
                <span className="items__title empty">#004 KIJI PROJECT</span>
                COMING SOON
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default AboutUniverse;
