import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "../styles/TmhcMain.scss";
import ClaimModal from "../components/ClaimModal";
import StakingModal from "../components/StakingModal";
import CancelStakingModal from "../components/CancelStakingModal";
import Nav from "../components/Nav";
import {
  setSelectedState,
  setIsOpen,
  setClaimModal,
  setStakingModal,
} from "../store";

import momoDummyData from "../data/momoDummyData";

const Momo = ({ language }) => {
  const dispatch = useDispatch();

  // 드랍다운 보이기 / 안보이기
  const rotateRef = useRef();
  const isOpen = useSelector((state) => state.isOpen.isOpen);
  const handleDropdownClick = () => {
    dispatch(setIsOpen(!isOpen));
    rotateRef.current.style.transform = isOpen ? "" : "rotate(-180deg)";
  };

  // 드랍다운 아이템 선택시 글자변경
  const selectedState = useSelector((state) => state.selectedState.title);
  const handleSelectedItem = (text) => {
    dispatch(setSelectedState(text));
    dispatch(setIsOpen(!isOpen));
  };

  // 클레임 모달
  const claimModal = useSelector((state) => state.claimModal.showClaim);
  const handleClaimModal = () => {
    dispatch(setClaimModal(!claimModal));
    document.body.style.overflow = "hidden";
  };

  // 스테이킹 모달
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleStakingModal = () => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
  };

  return (
    <>
      <Nav />
      <div>
        <p style={{ color: "black" }}></p>
      </div>
      <div className="tmhc-main-background">
        <div className="tmhc-main-container">
          <Link className="container__btn--user-guide">이용 가이드</Link>
          <div className="container__texture">
            {(language === "KO" && (
              <p className="texture__main-text">
                PEACHz MOMO NFT를 스테이킹 하고 *MZC를 받아가세요
              </p>
            )) ||
              (language === "EN" && (
                <p className="texture__main-text">
                  Stacking PEACHz MOMONFT and take *MZC.
                </p>
              ))}

            {(language === "KO" && (
              <p className="texture__sub-text">
                MZC는 MUC 에코시스템에 속한 유틸코인입니다.
              </p>
            )) ||
              (language === "EN" && (
                <p className="texture__sub-text">
                  MZC is a util coin belonging to the MUC ecosystem.
                </p>
              ))}

            <div className="texture__box">
              <Link>MUC에코시스템 소개</Link>
              <span>·</span>
              <Link>MCU White Paper</Link>
            </div>
          </div>
          <div className="container__claim">
            <span className="claim__title">Claimable MZC</span>
            <div className="claim__coin">
              <span className="coin-icon">
                <img src="" alt="coin" />
              </span>
              <div className="mzc">
                <input type="text" name="coin" defaultValue="0" readOnly />
                MZC
              </div>
              <button
                type="button"
                className="btn-claim"
                onClick={handleClaimModal}
              >
                Claim
              </button>
            </div>
          </div>
          <div className="container__nft">
            <div className="nft__header">
              <span className="header__text">NFT List</span>
              <div>
                <button className="btn--all-staking">일괄 스테이킹</button>
                <span className="header__text">
                  Total : <span className="header__text--qtt">0</span> ea
                </span>

                <div className="state-select-box">
                  <button
                    className="btn--state-select"
                    onClick={handleDropdownClick}
                  >
                    {selectedState}
                  </button>
                  <span className="material-symbols-outlined" ref={rotateRef}>
                    expand_more
                  </span>
                  {isOpen && (
                    <ul className="state-select-list">
                      <li
                        className="state-item all"
                        onClick={() => handleSelectedItem("전체")}
                      >
                        전체
                      </li>
                      <li
                        className="state-item staking"
                        onClick={() => handleSelectedItem("스테이킹 중")}
                      >
                        스테이킹 중
                      </li>
                      <li
                        className="state-item before-staking"
                        onClick={() => handleSelectedItem("스테이킹 대기중")}
                      >
                        스테이킹 대기중
                      </li>
                    </ul>
                  )}
                </div>
              </div>
            </div>
            <div className="nft__main">
              {momoDummyData.length === 0 ? (
                <div className="empty-nft">보유중인 NFT가 없습니다.</div>
              ) : (
                <ul className="main__momo-list">
                  {momoDummyData.map((el) => (
                    <li className="momo-item" key={el.id}>
                      <div className="momo-images">
                        <img src={el.momoImg} alt="nft" />
                      </div>
                      <div className="momo-info">
                        <span className="momo-name">{el.momoName}</span>
                        <span className="momo-staking-state">
                          Ready for Staking
                        </span>
                        <button
                          className="btn--staking"
                          onClick={handleStakingModal}
                        >
                          싱글 스테이킹
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <div className="pagenation"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 클레임 모달 */}
      {claimModal && <ClaimModal />}
      {/* 스테이킹 모달 */}
      {stakingModal && <StakingModal />}
      {/* 스테이킹 취소 모달 */}
      {/* <CancelStakingModal /> */}
    </>
  );
};

export default Momo;
