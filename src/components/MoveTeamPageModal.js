import React from "react";
import "./MoveTeamPageModal.scss";

const MoveTeamPageModal = ({
  language,
  handleMoveTeamModal,
  setOpenMoveTeamModal,
}) => {
  const handleCloseModal = () => {
    document.body.style.overflow = "";
    setOpenMoveTeamModal((prev) => !prev);
  };

  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div onClick={handleModalBackground} className="modal-background">
      <div className="move-team__modal">
        {language === "EN" ? (
          <div className="modal-text-box">
            <p className="move__text">is being team-staked.</p>
            <p className="move__text">
              The cancellation is available on the Team-staking page.
            </p>
          </div>
        ) : (
          <div className="modal-text-box">
            <p className="move__text">は今チームステーキング中です。</p>
            <p className="move__text">
              チームステーキングのキャンセルはチームテーキングページで可能です
            </p>
          </div>
        )}
        <button className="btn--ok" onClick={() => handleCloseModal()}>
          OK
        </button>
      </div>
    </div>
  );
};

export default MoveTeamPageModal;