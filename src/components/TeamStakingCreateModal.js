import React, { useState } from "react";
import "./TeamStakingCreateModal.scss";

const TeamStakingCreateModal = ({
  teamStakingMongzData,
  selectData,
  setTeamStakingModal,
  setTeamStakingConfirmModal,
  getGradeNameForPercent,
  getGradeNameForValue,
  language,
}) => {
  console.log("language", language);
  // 모모를 등록하면 총 부스트가 몇이될지 추측
  // let totalBoost = 0;
  // selectData.forEach((item) => {
  //   totalBoost += getGradeNameForPercent(
  //     item.rank
  //   );
  // });

  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setTeamStakingModal((prev) => !prev);
      // document.body.style.overflow = "";
    }
  };
  // 등급에 따라 점수를 부여합니다.
  const rankScore = {
    UR: 4,
    SR: 3,
    R: 2,
    C: 1,
  };
  const sortedData = selectData.sort(
    (a, b) => rankScore[b.rank] - rankScore[a.rank]
  );

  // let boostPercent;
  // switch (selectData.length) {
  //   case 4 :
  //   boostPercent = selectData.reduce((acc, cur) => )
  // }

  console.log("모모 셀렉트데이터", selectData);
  return (
    <div className="create-modal-background" onClick={handleModalBackground}>
      <div className="create-modal-body">
        <div>
          <div className="create-modal-mongz-img">
            <img src={teamStakingMongzData.image} alt="mongzImg" />
          </div>
          <div className="create-modal-mongz-info">
            <span className="create-modal-mongz-title">
              {teamStakingMongzData.name}
            </span>
            {/* <span>
              Estimated BOOST <span>560%</span>
            </span>
            <span>
              (Default 10.81MZC/Day + BOOST 41.032MZC/Day =
              <span>49.952 MZC / DAY</span>)
            </span> */}
          </div>
        </div>
        <div className="create-modal-momo-box">
          {/* 팀 스테이킹 할 momo 데이터를 가지고 와서 뿌리기 */}
          {sortedData.map((item) => {
            return (
              <div className="momo-box__item">
                <div className="momo-item__img">
                  <div
                    className={`momo-rating ${getGradeNameForValue(item.rank)}`}
                  >
                    {item.rank}
                  </div>
                  <img src={item.image} alt="momoImg" />
                </div>
                <span className="momo-item__name">{item.name}</span>
                <span>Boost {getGradeNameForPercent(item.rank)}%</span>
              </div>
            );
          })}
        </div>
        {selectData.length >= 4 ? (
          <p className="momo-item__bonus"> Bonus Boost 20%</p>
        ) : null}
        {language === "EN" ? (
          <div className="create-modal-text-box">
            <ul className="create-modal-text-box-list">
              <li className="create-modal-text-box-list-item en">
                Up to 4 MOMO NFTs can be team-staked with a single TMHC NFT.
              </li>
              <br />
              <li className="create-modal-text-box-list-item en">
                If a holder team-stakes 4 MOMO NFT, they will receive a 20%
                bonus MZC.
              </li>
            </ul>
            <span className="create-modal-text-box-notice"> [Note]</span>
            <br />
            <ul className="create-modal-text-box-list">
              <li className="create-modal-text-box-list-item en">
                UR Rating PEACHz.MOMO NFT 300% Boost
              </li>
              <li className="create-modal-text-box-list-item en">
                SR Rating PEACHz.MOMO NFT 100% Boost
              </li>
              <li className="create-modal-text-box-list-item en">
                R Rating PEACHz.MOMO NFT 30% Boost
              </li>
              <li className="create-modal-text-box-list-item en">
                C Rating PEACHz.MOMO NFT 10% Boost
              </li>
            </ul>
          </div>
        ) : (
          <div className="create-modal-text-box">
            <span className="create-modal-text-box-notice"> [注意]</span>
            <br />
            <ul className="create-modal-text-box-list">
              <li className="create-modal-text-box-list-item">
                1つのTMHC NFTあたり最大4つのMOMO NFTとTeam Stakingできます。
              </li>
              <br />
              <li className="create-modal-text-box-list-item">
                4つのMOMO NFTでTeam Stakingを行うと、追加20％のボ
                ーナスMZCを受けることができます。
              </li>
            </ul>
            <span className="create-modal-text-box-notice"> [参考]</span>
            <br />
            <ul className="create-modal-text-box-list">
              <li className="create-modal-text-box-list-item">
                URグレード PEACHz.MOMO NFT 300% Boost
              </li>
              <li className="create-modal-text-box-list-item">
                SRグレード PEACHz.MOMO NFT 100% Boost
              </li>
              <li className="create-modal-text-box-list-item">
                Rグレード PEACHz.MOMO NFT 30% Boost
              </li>
              <li className="create-modal-text-box-list-item">
                Cグレード PEACHz.MOMO NFT 10% Boost
              </li>
            </ul>
          </div>
        )}

        <div className="create-modal-button-box">
          <button
            className="create-modal__back-btn"
            onClick={() => {
              setTeamStakingModal((prev) => !prev);
              // document.body.style.overflow = "";
            }}
          >
            Back
          </button>
          <button
            className="create-modal__staking-btn"
            onClick={() =>
              setTeamStakingConfirmModal(
                (prev) => !prev,
                teamStakingMongzData,
                selectData
              )
            }
          >
            Team Staking
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamStakingCreateModal;
