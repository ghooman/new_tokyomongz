import React from "react";
import "./TeamStakingCancelModal.scss";
import momoDummyData from "../data/momoDummyData";
const TeamStakingCancelModal = ({
  teamStakingMongzData,
  teamStakingMomoData,
  setTeamStakingCancelModal,
  setTeamStakingCancelConfirmModal,
  selectData,
}) => {
  console.log("팀캔슬모달", selectData);
  return (
    <div className="modal-background">
      <div className="team-staking-cancel__background">
        <div className="team-staking-cancel__mongz-info-box">
          <div className="team-staking-cancel__mongz-img">
            <img src={selectData[0].image} alt="mongzImg" />
          </div>
          <span className="team-staking-cancel__mongz-name">
            {selectData[0].name}
          </span>
        </div>
        <div className="team-staking-cancel__momo-box">
          {selectData[0].teamStakingNftData[0].member.map((item) => {
            return (
              <div className="team-staking-cancel__momo-item">
                <div className="team-staking-cancel__momo-img">
                  <img src={item.image} alt="momoImg" />
                </div>
                <span className="team-staking-cancel__momo-name">
                  {item.name}
                </span>
              </div>
            );
          })}
        </div>
        <div className="team-staking-cancel__text">
          Are you sure you want to cancel team staking? ETH is required to
          cancel staking.
          <br />
          <br />
          [Caution] <br />
          If the wallet of NFT changes due to sale, wallet transfer, etc., you
          cannot receive MZC generated from the NFT
        </div>
        <div className="team-staking-cancel__btn-box">
          <button
            className="team-staking-cancel__back-btn"
            onClick={() => {
              setTeamStakingCancelModal((prev) => !prev);
              document.body.style.overflow = "";
            }}
          >
            Back
          </button>
          <button
            className="team-staking-cancel__cancel-btn"
            onClick={() => setTeamStakingCancelConfirmModal((prev) => !prev)}
          >
            Cancel Staking
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamStakingCancelModal;
