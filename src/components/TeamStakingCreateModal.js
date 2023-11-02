import React, { useState } from "react";
import "./TeamStakingCreateModal.scss";

const TeamStakingCreateModal = ({
  teamStakingMongzData,
  teamStakingMomoData,
  setTeamStakingModal,
  setTeamStakingConfirmModal,
  getGradeNameForPercent,
  getGradeNameForValue,
}) => {
  // 모모를 등록하면 총 부스트가 몇이될지 추측
  // let totalBoost = 0;
  // teamStakingMomoData.forEach((item) => {
  //   totalBoost += getGradeNameForPercent(
  //     item.attributes[item.attributes.length - 1].value
  //   );
  // });
  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setTeamStakingModal((prev) => !prev);
      document.body.style.overflow = "";
    }
  };
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
            <span>
              Estimated BOOST <span>560%</span>
            </span>
            <span>
              (Default 10.81MZC/Day + BOOST 41.032MZC/Day =
              <span>49.952 MZC / DAY</span>)
            </span>
          </div>
        </div>
        <div className="create-modal-momo-box">
          {/* 팀 스테이킹 할 momo 데이터를 가지고 와서 뿌리기 */}
          {teamStakingMomoData.map((item) => {
            return (
              <div className="momo-box__item">
                <div className="momo-item__img">
                  <div
                    className={`momo-rating ${getGradeNameForValue(
                      item.attributes[item.attributes.length - 1].value
                    )}`}
                  >
                    {item.attributes[item.attributes.length - 1].value}
                  </div>
                  <img src={item.image} alt="momoImg" />
                </div>
                <span className="momo-item__name">{item.name}</span>
                <span>
                  Boost{" "}
                  {getGradeNameForPercent(
                    item.attributes[item.attributes.length - 1].value
                  )}
                  %
                </span>
              </div>
            );
          })}
        </div>
        <div className="create-modal-text-box">
          <ul>
            <li>
              Up to 4 MOMO NFTs can be team-staked with a single TMHC NFT.
            </li>
            <li>
              If a holder team-stakes 4 MOMO NFT, they will receive a 20% bonus
              MZC.
            </li>
          </ul>
          <span> [Note]</span>

          <ul>
            <li>UR Rating PEACHz.MOMO NFT 300% Boost</li>
            <li> SR Rating PEACHz.MOMO NFT 100% Boost</li>
            <li> R Rating PEACHz.MOMO NFT 30% Boost</li>
            <li> C Rating PEACHz.MOMO NFT 10% Boost</li>
          </ul>
        </div>
        <div className="create-modal-button-box">
          <button
            className="create-modal__back-btn"
            onClick={() => {
              setTeamStakingModal((prev) => !prev);
              document.body.style.overflow = "";
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
                teamStakingMomoData
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
