import React from "react";
import "./TeamStakingCancelModal.scss";
import mongzDummyData from "../data/tmhcDummyData";
import momoDummyData from "../data/momoDummyData";
const TeamStakingCancelModal = () => {
  return (
    <div className="team-staking-cancel__background">
      <div className="team-staking-cancel__mongz-info-box">
        <div className="team-staking-cancel__mongz-img">
          <img src={mongzDummyData[0].tmhcImg} alt="mongzImg" />
        </div>
        <span className="team-staking-cancel__mongz-name">
          {mongzDummyData[0].tmhcName}
        </span>
      </div>
      <div className="team-staking-cancel__momo-box">
        {momoDummyData.slice(0, 4).map((item) => {
          return (
            <div className="team-staking-cancel__momo-item">
              <div className="team-staking-cancel__momo-img">
                <img src={item.momoImg} alt="momoImg" />
              </div>
              <span className="team-staking-cancel__momo-name">
                {item.momoName}
              </span>
            </div>
          );
        })}
      </div>
      <div className="team-staking-cancel__text">
        Are you sure you want to cancel team staking? ETH is required to cancel
        staking.
        <br />
        <br />
        [Caution] <br />
        If the wallet of NFT changes due to sale, wallet transfer, etc., you
        cannot receive MZC generated from the NFT
      </div>
      <div className="team-staking-cancel__btn-box">
        <button className="team-staking-cancel__back-btn">Back</button>
        <button className="team-staking-cancel__cancel-btn">
          Cancel Staking
        </button>
      </div>
    </div>
  );
};

export default TeamStakingCancelModal;
