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
    <div>
      <div onClick={handleModalBackground} className="modal-background">
        {language === "EN" ? (
          <div className="claim">
            <div className="claim__header">
              <span className="claim__header-title">
                영어버전에 나오는 팝업 모달입니다.(디자인 아직 미정)
              </span>
            </div>
            <div className="claim__main">
              <ul>
                <li>
                  <span>is being team-staked.</span>
                </li>
                <li>
                  <span>
                    The cancellation is available on the Team-staking page.
                  </span>
                </li>
              </ul>
            </div>

            <div className="claim__btn">
              <button
                className="btn--cancel"
                onClick={() => handleCloseModal()}
              >
                OK
              </button>
            </div>
          </div>
        ) : (
          <div className="claim">
            <div className="claim__header">
              <span className="claim__header-title">
                일본어버전에 나오는 팝업 모달입니다.(디자인 아직 미정)
              </span>
              <span className="claim__header-mzc">
                {/* <span className="claim__header-coin">{reward}</span>&nbsp;MZC */}
              </span>
            </div>
            <div className="claim__main">
              <ul>
                <li>
                  <span>は今チームステーキング中です。</span>
                </li>
                <li>
                  <span>
                    チームステーキングのキャンセルはチームテーキングページで可能です
                  </span>
                </li>
              </ul>
            </div>

            <div className="claim__btn">
              <button
                className="btn--cancel"
                onClick={() => handleCloseModal()}
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MoveTeamPageModal;
