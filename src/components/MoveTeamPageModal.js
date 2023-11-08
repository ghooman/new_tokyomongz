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
    // document.body.style.overflow = "";
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
                ? `${selectData[0]?.name.slice(4)}`
                : momoSelectData
                ? `${momoSelectData[0].name.slice(-5)}`
                : null}
              &nbsp;These NFTs are being Team-staked.
            </p>
            <p className="move__text">
              The cancellation is available on the Team-staking page.
            </p>
          </div>
        ) : (
          <div className="modal-text-box">
            <p className="move__text">
              {selectData
                ? `${selectData[0]?.name.slice(4)}`
                : momoSelectData
                ? `${momoSelectData[0].name.slice(-5)}`
                : null}
              は今チームステーキング中です。
            </p>
            <p className="move__text">
              はチームステーキング中です。
              チームステーキングのキャンセルはチームステーキングページで可能です。
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
