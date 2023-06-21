import React from "react";
import footerLogo from "../assets/images/footer-logo.png";
import "./Footer.scss";
import { Link, Route, Routes } from "react-router-dom";

const Footer = ({ language }) => {
  return (
    <>
      <div className="footer">
        <div className="inner">
          <div className="footer-logo">
            <img src={footerLogo} alt="logo" />
          </div>
          <div className="footer-text">
            <p className="footer-copyright">
              COPYRIGHT Ⓒ HashLink. ALL RIGHTS RESERVED
            </p>
            <a className="footer-email" href="mailto:tmhc_support@hashlink.jp">
              tmhc_support@hashlink.jp
            </a>
            {language === "EN" ? (
              <ul className="footer-link-list">
                <li>
                  <a href="/terms">Terms of Use</a>
                </li>
                <li>
                  <a href="/privacy-policy">Privacy Policy</a>
                </li>
                <li>
                  <a href="/secondary-guide">Copyright Guide</a>
                </li>
              </ul>
            ) : (
              <ul className="footer-link-list">
                <li>
                  <a href="/terms">利用規約</a>
                </li>
                <li>
                  <a href="/privacy-policy">個人情報保護</a>
                </li>
                <li>
                  <a href="/secondary-guide">二次創作ガイドライン</a>
                </li>
                <li>
                  <a href="/transaction-rules">特定商取引法に基づく表記</a>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
