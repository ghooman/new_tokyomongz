import React, { useEffect, useState } from "react";
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
            <p className="waiting__title">TBD</p>
            <p className="waiting__title">TBD</p>
          </div>
        ) : (
          <div className="modal-text-box">
            <p className="waiting__title">TBD</p>
            <p className="waiting__title">TBD</p>
          </div>
        )}
        <button className="btn--cancel" onClick={() => handleCloseModal()}>
          OK
        </button>
      </div>
    </div>
  );
};

export default MoveTeamPageModal;
