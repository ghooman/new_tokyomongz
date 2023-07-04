import { useState, useRef, useEffect } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import "./Header.scss";
import headerLogo from "../assets/images/mongz-universe-logo.svg";
import linkIcon from "../assets/images/link-icon.svg";
import twitterIcon from "../assets/images/twitter-icon.svg";
import discordIcon from "../assets/images/discord-icon.svg";
import youtubeIcon from "../assets/images/youtube-icon.svg";
import openseaIcon from "../assets/images/opensea-icon.svg";
import mediumIcon from "../assets/images/medium-icon.svg";
import Main from "../pages/Main";
import Footer from "./Footer";
import MainMenu from "./MainMenu";
import Roadmap from "../pages/Roadmap";
import TmhcMain from "../pages/TmhcMain";
import Momo from "../pages/Momo";
import Test from "../pages/Test";
import AboutTmhc from "../pages/AboutTmhc";
import AboutMomo from "../pages/AboutMomo";
import Partners from "../pages/Partners";
import News from "../pages/News";
import WaitingModal from "./WaitingModal";
import EcoSystem from "../pages/EcoSystem";
import Terms from "../pages/Terms";
import Policy from "../pages/Policy";
import Copyright from "../pages/Copyright";
import Transaction from "../pages/Transaction";

const Header = () => {
  const socialMenu = [
    {
      id: 1,
      title: "Twitter",
      img: twitterIcon,
      address: "https://twitter.com/TMHC_Official",
    },
    {
      id: 2,
      title: "Discord",
      img: discordIcon,
      address: "https://discord.com/invite/Bg8d9maq3e",
    },
    {
      id: 3,
      title: "Youtube",
      img: youtubeIcon,
      address: " https://www.youtube.com/c/TokyoMongzHillsClubOfficial",
    },
    {
      id: 4,
      title: "Opensea",
      img: openseaIcon,
      address: "https://opensea.io/ja/collection/tmhc",
    },
    {
      id: 5,
      title: "Medium",
      img: mediumIcon,
      address: "https://tmhcofficial.medium.com/",
    },
  ];

  // 언어 버튼 컨트롤
  const [languageBtn, setLanguageBtn] = useState(false);

  const handleLangugeBtn = () => {
    setLanguageBtn(!languageBtn);
    if (socialBtn === true) {
      setSocialBtn(false);
    }
  };

  // 언어 버튼 이름 변경
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "EN"
  );

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  // const [language, setLanguage] = useState("EN");
  const handleSelectedLang = (e) => {
    setLanguage(e.target.name);
    setLanguageBtn(false);
    // console.log(e);
  };

  // 소셜 버튼 컨트롤
  const [socialBtn, setSocialBtn] = useState(false);
  const handleSocialBtn = () => {
    setSocialBtn(!socialBtn);
    if (languageBtn === true) {
      setLanguageBtn(false);
    }
  };

  // const [isHovering, setIsHovering] = useState(false);

  const location = useLocation();
  const mainPage = location.pathname === "/";

  // 반응형 모바일 메뉴 컨트롤
  const [mMenuOnOff, setMmenuOnOff] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1280) {
        setMmenuOnOff(() => {
          document.body.style.overflow = "";
          return false;
        });
      }
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMmenuOnOff = () => {
    setMmenuOnOff((prevMmenuOnOff) => {
      const newMmenuOnOff = !prevMmenuOnOff;
      if (newMmenuOnOff) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
      return newMmenuOnOff;
    });
  };
  const handleMenuClicked = () => {
    setMmenuOnOff(() => {
      document.body.style.overflow = "";
      return false;
    });
  };

  // 반응형 준비중 모달 띄우기
  const [showWaitingModal, setShowWaitingModal] = useState(false);
  const handleMWaitingModal = (e) => {
    e.preventDefault();
    setMmenuOnOff(() => {
      document.body.style.overflow = "";
      return false;
    });
    setShowWaitingModal((prev) => {
      if (!showWaitingModal) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }

      return !prev;
    });
  };

  return (
    <>
      <div className={`header ${mainPage ? "transparent" : ""}`}>
        <div className="inner">
          <Link to="/" className="header-logo">
            <img src={headerLogo} alt="logo" />
          </Link>

          <ul className="sub-menu">
            <MainMenu
              language={language}
              showWaitingModal={showWaitingModal}
              setShowWaitingModal={setShowWaitingModal}
            />
            <li className="wallet-box">
              <ConnectWallet />
            </li>
            <li>
              <button
                type="button"
                className="btn--language"
                onClick={handleLangugeBtn}
              >
                <span className="current-language">
                  <span className="material-symbols-outlined"> language </span>
                  {language}
                </span>
              </button>
              {languageBtn && (
                <ul className="language-menu">
                  <li>
                    <button
                      name="EN"
                      className="btn--language-items"
                      onClick={(e) => handleSelectedLang(e)}
                    >
                      EN
                    </button>
                  </li>
                  <li>
                    <button
                      name="JP"
                      className="btn--language-items"
                      onClick={(e) => handleSelectedLang(e)}
                    >
                      JP
                    </button>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button className="social-btn" onClick={handleSocialBtn}>
                <img src={linkIcon} alt="Link" />
              </button>
              {socialBtn && (
                <ul className="social-menu">
                  {socialMenu.map((item) => (
                    <li key={item.id}>
                      <button
                        className="btn--social-items"
                        onClick={() => window.open(item.address, "_blank")}
                      >
                        <img src={item.img} alt={item.title} />
                        {item.title}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>

          {/* ----------- */}
          {/* 반응형 메뉴 */}
          {/* ----------- */}
          <div className="m-menu">
            <div
              className={mMenuOnOff ? "m-main-menu active" : "m-main-menu"}
              onClick={handleMmenuOnOff}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div
              className={
                mMenuOnOff
                  ? "m-main-menu__list-background active-menu"
                  : "m-main-menu__list-background"
              }
            >
              <ul className="m-main-menu__list">
                <li className="list__header">
                  <button
                    type="button"
                    className="btn--language"
                    onClick={handleLangugeBtn}
                  >
                    <span className="current-language">
                      <span className="material-symbols-outlined">
                        {" "}
                        language{" "}
                      </span>
                      {language}
                    </span>
                  </button>
                  {languageBtn && (
                    <ul className="language-menu">
                      <li>
                        <button
                          name="EN"
                          className="btn--language-items"
                          onClick={(e) => handleSelectedLang(e)}
                        >
                          EN
                        </button>
                      </li>
                      <li>
                        <button
                          name="JP"
                          className="btn--language-items"
                          onClick={(e) => handleSelectedLang(e)}
                        >
                          JP
                        </button>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="wallet-box">
                  <ConnectWallet />
                </li>
                <li className="m-main-menu__items">
                  <span className="m-main-menu__sub-title">Mongz Univers</span>
                  <Link to="/roadmap" onClick={handleMenuClicked}>
                    Universe Roadmap
                  </Link>
                  <Link to="/about-tmhc" onClick={handleMenuClicked}>
                    #001 Tokyo Mongz Hills Club
                  </Link>
                  <Link to="/about-momo" onClick={handleMenuClicked}>
                    #002 PEATCHz.MOMO
                  </Link>
                  <Link to="" onClick={handleMWaitingModal}>
                    #003 INU PROJECT
                  </Link>
                  <Link to="" onClick={handleMWaitingModal}>
                    #004 KIJI PROJECT
                  </Link>
                </li>
                <li className="m-main-menu__items">
                  <span className="m-main-menu__sub-title">Utility</span>
                  <Link to="" onClick={handleMWaitingModal}>
                    Mint
                  </Link>
                  <Link to="/tmhc" onClick={handleMenuClicked}>
                    Reward
                  </Link>
                  <Link
                    to="https://bridge.tokyomongzhillsclub.com/"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    Bridge (PLT TO ETH)
                  </Link>
                  <Link to="" onClick={handleMWaitingModal}>
                    Governance
                  </Link>
                </li>
                <li className="m-main-menu__items">
                  <span className="m-main-menu__sub-title">Eco-System</span>
                  <Link
                    to="https://multiuniversecentral.io/"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    Eco System
                  </Link>
                  <Link
                    to="https://multi-universe-coin.gitbook.io/muc-white-paper"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    MUC Whitepaper
                  </Link>
                </li>
                <li className="m-main-menu__items">
                  <span className="m-main-menu__sub-title">More</span>
                  <Link to="/news" onClick={handleMenuClicked}>
                    News
                  </Link>
                  <Link
                    to="https://tmhc-support.notion.site/TMHC-SUPPORT-8aac60df925d444891a8f7a083195b90"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    How to
                  </Link>
                  {language === "EN" ? (
                    <Link
                      to="https://tmhc-support.notion.site/TMHC-SUPPORT-8aac60df925d444891a8f7a083195b90"
                      target="_blank"
                      onClick={handleMenuClicked}
                    >
                      Help
                    </Link>
                  ) : (
                    <Link
                      to="https://tmhc-support.notion.site/tmhc-7eb0250de5f14d408bdadf7a0ea921c3"
                      target="_blank"
                      onClick={handleMenuClicked}
                    >
                      Help
                    </Link>
                  )}
                  <Link
                    to="https://www.hashlink.jp/"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    About Us
                  </Link>
                  <Link to="/partners" onClick={handleMenuClicked}>
                    Partners
                  </Link>
                </li>
                <li className="m-main-menu__items">
                  <span className="m-main-menu__sub-title">Buy</span>
                  <Link
                    to="https://opensea.io/ja/collection/tmhc"
                    target="_blank"
                    onClick={handleMenuClicked}
                  >
                    Tokyo Mongs Hills Club
                  </Link>
                  <Link to="/about-momo" onClick={handleMenuClicked}>
                    Peachz.MOMO
                  </Link>
                </li>
                <li className="m-main-menu__items">
                  <div className="social-items">
                    {socialMenu.slice(0, 3).map((item) => (
                      <button
                        key={item.id}
                        className="m-btn--social-items"
                        onClick={() => window.open(item.address, "_blank")}
                      >
                        <img src={item.img} alt={item.title} />
                      </button>
                    ))}
                  </div>
                  <div className="social-items">
                    {socialMenu.slice(3, 6).map((item) => (
                      <button
                        key={item.id}
                        className="m-btn--social-items"
                        onClick={() => window.open(item.address, "_blank")}
                      >
                        <img src={item.img} alt={item.title} />
                      </button>
                    ))}
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Main language={language} />} />
        <Route path="/roadmap" element={<Roadmap language={language} />} />
        <Route path="/about-tmhc" element={<AboutTmhc language={language} />} />
        <Route path="/about-momo" element={<AboutMomo language={language} />} />
        <Route path="/tmhc" element={<TmhcMain language={language} />} />
        <Route path="/muc-momo" element={<Momo language={language} />} />
        <Route path="/test" element={<Test />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/news" element={<News />} />
        <Route path="/eco-system" element={<EcoSystem language={language} />} />
        <Route path="/terms" element={<Terms language={language} />} />
        <Route
          path="/privacy-policy"
          element={<Policy language={language} />}
        />
        <Route
          path="/secondary-guide"
          element={<Copyright language={language} />}
        />
        <Route path="/transaction-rules" element={<Transaction />} />
      </Routes>
      {mainPage ? null : <Footer language={language} />}

      {/* 메인 메뉴 map메서드 사용 나중에 다시 확인해보기 */}
      {/* <ul className="main-memu">
            {mainMenu.map((item, i) => (
              <li
                key={item.id}
                name={item.id}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <span className="main-menu__title">{item.title}</span>
                {isHovering && (
                  <ul
                    className="main-menu__sub"
                    onMouseEnter={() => setIsHovering(true)}
                  >
                    <li>
                      <Link to={item.link1}>{item.li1}</Link>
                    </li>
                    <li>
                      <Link to={item.link2}>{item.li2}</Link>
                    </li>
                    {item.li3 === undefined ? null : (
                      <li>
                        <Link to={item.link3}>{item.li3}</Link>
                      </li>
                    )}
                    {item.li4 === undefined ? null : (
                      <li>
                        <Link to={item.link4}>{item.li4}</Link>
                      </li>
                    )}
                    {item.li5 === undefined ? null : (
                      <li>
                        <Link to={item.link5}>{item.li5}</Link>
                      </li>
                    )}
                  </ul>
                )}
              </li>
            ))}
          </ul> */}

      {showWaitingModal && (
        <WaitingModal
          setShowWaitingModal={setShowWaitingModal}
          language={language}
        />
      )}
    </>
  );
};

export default Header;
