import React from "react";
import "./MoveTeamPageModal.scss";

const MoveTeamPageModal = ({
  language,
  setOpenMoveTeamModal,
  selectData,
  momoSelectData,
}) => {
  console.log("momoSelectData", momoSelectData);
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
    <div className="modal-background" onClick={handleModalBackground}>
      <div className="move-team__modal">
        {language === "EN" ? (
          <div className="modal-text-box">
            <p className="move__text">
              {selectData
                ? `${selectData[0]?.name.slice(4)} is being team-staked.`
                : momoSelectData
                ? `${momoSelectData[0].name.slice(-5)} is being team-staked.`
                : null}
              is being team-staked.
            </p>
            <p className="move__text">
              The cancellation is available on the Team-staking page.
            </p>
          </div>
        ) : (
          <div className="modal-text-box">
            <p className="move__text">
              {selectData
                ? `${selectData[0]?.name.slice(4)} is being team-staked.`
                : momoSelectData
                ? `${momoSelectData[0].name.slice(-5)} is being team-staked.`
                : null}
              は今チームステーキング中です。
            </p>
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
