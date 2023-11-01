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
                영어버전에 나오는 팝업 모달입니다.
              </span>
              <span className="claim__header-mzc">
                {/* <span className="claim__header-coin">{reward}</span>&nbsp;MZC */}
              </span>
            </div>
            <div className="claim__main">
              <span> [Notice] </span>
              <ul>
                <li>
                  <span>-</span> 더미 텍스트입니다.
                </li>
                <li>
                  <span>-</span> If the holder sells an NFT that is currently
                  being staked, or moves it to a different wallet, they will not
                  receive the reward MZC assigned to the NFT.
                </li>
                <li>
                  <span>-</span> IThe MZC that is currently displayed in your
                  wallet is not confirmed. It will be recalculated during the
                  claim process.
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
                일본어버전에 나오는 팝업 모달입니다.
              </span>
              <span className="claim__header-mzc">
                {/* <span className="claim__header-coin">{reward}</span>&nbsp;MZC */}
              </span>
            </div>
            <div className="claim__main">
              <span> [注意] </span>
              <ul>
                <li>
                  <span>-</span> 더미 텍스트입니다.
                </li>
                <li>
                  <span>-</span>
                  ClaimされたMZCは連携中のウォレットに支払われます。
                </li>
                <li>
                  <span>-</span>
                  Staking中のNFTをClaimする前に売却、譲渡等により別のウォレットに移動させた場合、そのNFTがそれまでに獲得したMZCは消滅します。
                </li>
                <li>
                  <span>-</span>
                  各NFTごとにClaim額が1MZCに満たない場合はMZCをClaimすることができません。
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
