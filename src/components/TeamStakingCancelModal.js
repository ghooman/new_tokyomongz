import React from "react";
import "./TeamStakingCancelModal.scss";
import momoDummyData from "../data/momoDummyData";
const TeamStakingCancelModal = ({
  teamStakingMongzData,
  teamStakingMomoData,
  setTeamStakingCancelModal,
  setTeamStakingCancelConfirmModal,
  selectData,
  language,
}) => {
  console.log("selectData", selectData);
  // 모모 등급 표시
  const getGradeNameForValue = (value) => {
    switch (value) {
      case "C":
        return "grade-C";
      case "R":
        return "grade-R";
      case "SR":
        return "grade-SR";
      case "UR":
        return "grade-UR";
      default:
        return "";
    }
  };
  // 모모 등급에 따른 부스팅 수치
  const getGradeNameForPercent = (value) => {
    switch (value) {
      case "C":
        return 10;
      case "R":
        return 30;
      case "SR":
        return 100;
      case "UR":
        return 300;
      default:
        return "";
    }
  };
  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setTeamStakingCancelModal((prev) => !prev);
      // document.body.style.overflow = "";
    }
  };
  return (
    <div className="modal-background" onClick={handleModalBackground}>
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
          {selectData[0].teamStakingNftData.map(
            (team) =>
              team.leader.id === selectData[0].id &&
              team.member.map((item) => (
                <div className="team-staking-cancel__momo-item" key={item.id}>
                  <div className="team-staking-cancel__momo-img">
                    <div
                      className={`momo-rating ${getGradeNameForValue(
                        item.rank
                      )}`}
                    >
                      {item.rank}
                    </div>
                    <img src={item.image} alt="momoImg" />
                  </div>
                  <span className="team-staking-cancel__momo-name">
                    {item.name}
                  </span>
                </div>
              ))
          )}
        </div>

        {language === "EN" ? (
          <div className="team-staking-cancel__text">
            Are you sure you want to cancel team staking? ETH is required to
            cancel staking.
            <br />
            <br />
            [Caution] <br />
            If the status of a NFT changes due to the NFT being sold,
            transferred, etc., you cannot receive MZC generated from the NFT.
          </div>
        ) : (
          <div className="team-staking-cancel__text">
            Team Stakingを解除してもよろしいですか？
            <br />
            <br />
            [注意] <br />
            Team Stakingを解除すると、自動的にMZCがClaimされます。
            各NFTごとにClaim額が１MZCに満たない場合は解除することはできません。
          </div>
        )}

        <div className="team-staking-cancel__btn-box">
          <button
            className="team-staking-cancel__back-btn"
            onClick={() => {
              setTeamStakingCancelModal((prev) => !prev);
              // document.body.style.overflow = "";
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
