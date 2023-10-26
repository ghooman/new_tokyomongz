import React from "react";
import "./TeamStakingCancelConfirmModal.scss";
// import TeamStakingCancelModal from "./TeamStakingCancelModal";
const TeamStakingCancelConfirmModal = ({
  language,
  setTeamStakingCancelConfirmModal,
}) => {
  return (
    <div className="cancel-confirm-modal-background">
      <div className="cancel-confirm-modal__text">
        {language === "EN" ? (
          <>
            Are you sure you want to cancel
            <br />
            team staking?
          </>
        ) : (
          `シングルステークスをご希望ですか？`
        )}
      </div>
      <div className="cancel-confirm-modal__btn-box">
        <button
          className="cancel-confirm-modal__back-btn"
          onClick={() => setTeamStakingCancelConfirmModal((prev) => !prev)}
        >
          Back
        </button>
        <button className="cancel-confirm-modal__confirm-btn">
          Cancel Staking
        </button>
      </div>
    </div>
  );
};

export default TeamStakingCancelConfirmModal;
