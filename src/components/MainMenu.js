import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setActiveTab } from "../store";
import "./MainMenu.scss";
import WaitingModal from "../components/WaitingModal";

const MainMenu = ({ language, showWaitingModal, setShowWaitingModal }) => {
  const activeTab = useSelector((state) => state.activeTab.num);
  const dispatch = useDispatch();

  const handleWaitingModal = (e) => {
    e.preventDefault();
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
      <ul className="main-memu">
        <li>
          <span className="main-menu__title">MONGz.UNIVERSE</span>
          <ul className="main-menu__sub">
            <li>
              <Link to="/roadmap">Mongz Universe Roadmap</Link>
            </li>
            <li>
              <Link to="/about-tmhc">#001 Tokyo Mongz Hills Club</Link>
            </li>
            <li>
              <Link to="/about-momo">#002 PEACHz.MOMO</Link>
            </li>
            <li>
              <Link to="https://universalstallion.io/" target="_blank">
                #003 Universal Stallion
              </Link>
            </li>
            <li>
              <Link to="" onClick={handleWaitingModal}>
                #004 KIJI PROJECT
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <span className="main-menu__title">Utility</span>
          <ul className="main-menu__sub">
            <li>
              <Link to="https://mint.tokyomongzhillsclub.com/" target="_blank">
                Mint
              </Link>
            </li>
            <li>
              <Link to="/tmhc" onClick={() => dispatch(setActiveTab(0))}>
                Reward
              </Link>
            </li>
            <li>
              <Link to="https://bridge.tokyomongzhillsclub.com" target="_blank">
                Bridge (PLT TO ETH)
              </Link>
            </li>

            <li>
              <Link to="" onClick={handleWaitingModal}>
                Governance
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <span className="main-menu__title">Eco-System</span>
          <ul className="main-menu__sub">
            <li>
              <Link to="https://multiuniversecentral.io/" target="_blank">
                MUC Eco-System
              </Link>
            </li>
            <li>
              <Link
                to="https://commseed.gitbook.io/multi-universe-central-muc/"
                target="_blank"
              >
                MUC Whitepaper
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <span className="main-menu__title">More</span>
          <ul className="main-menu__sub">
            <li>
              <Link to="/news">News</Link>
            </li>

            {language === "EN" ? (
              <li>
                <Link
                  to="https://tmhc-support.notion.site/TMHC-SUPPORT-8aac60df925d444891a8f7a083195b90"
                  target="_blank"
                >
                  Help
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="https://tmhc-support.notion.site/tmhc-7eb0250de5f14d408bdadf7a0ea921c3"
                  target="_blank"
                >
                  Help
                </Link>
              </li>
            )}

            <li>
              <Link to="https://www.hashlink.jp/" target="_blank">
                About Us
              </Link>
            </li>

            <li>
              <Link to="/partners">Partners</Link>
            </li>
          </ul>
        </li>
        <li>
          <span className="main-menu__title">Purchase</span>
          <ul className="main-menu__sub">
            <li>
              <Link to="https://opensea.io/ja/collection/tmhc" target="_blank">
                Tokyo Mongs Hills Club
              </Link>
            </li>
            <li>
              <Link
                to="https://mint.tokyomongzhillsclub.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                PEACHz.MOMO
              </Link>
            </li>
          </ul>
        </li>
      </ul>
      {showWaitingModal && (
        <WaitingModal
          setShowWaitingModal={setShowWaitingModal}
          language={language}
        />
      )}
    </>
  );
};

export default MainMenu;
