import React from "react";
import "./TeamStakingConfirmModal.scss";
const TeamStakingConfirmModal = ({ language, setTeamStakingConfirmModal }) => {
  return (
    <div className="confirm-modal-background">
      <div className="confirm-modal__text">
        {language === "EN" ? (
          <>
            Mongz X MOMO <br />
            Would you like to proceed <br />
            the team staking?
          </>
        ) : (
          `シングルステークスをご希望ですか？`
        )}
      </div>
      <div className="confirm-modal__btn-box">
        <button
          className="confirm-modal__back-btn"
          onClick={() => setTeamStakingConfirmModal((prev) => !prev)}
        >
          Back
        </button>
        <button className="confirm-modal__confirm-btn">Team up</button>
      </div>
    </div>
  );
};

export default TeamStakingConfirmModal;
