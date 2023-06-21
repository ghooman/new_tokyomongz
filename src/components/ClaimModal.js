import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { useSelector, useDispatch } from "react-redux";
import { setClaimModal } from "../store";
import { useContract, useContractWrite, Web3Button } from "@thirdweb-dev/react";
import LoadingModal from "./LoadingModal";
import { STAKING_TMHC_CONTRACT } from "../contract/contractAddress";

const ClaimModal = ({ language, reward }) => {
  const dispatch = useDispatch();
  const claimModal = useSelector((state) => state.claimModal.showClaim);
  const handleCloseModal = () => {
    dispatch(setClaimModal(!claimModal));
    document.body.style.overflow = "";
  };

  const [claimConfirmModal, setClaimConfirmModal] = useState(false);

  const handleConfirmModal = () => {
    setClaimConfirmModal(!claimConfirmModal);
  };
  return (
    <>
      <div className="modal-background">
        {language === "EN" ? (
          <div className="claim">
            <div className="claim__header">
              <span className="claim__header-title">
                Estimated amount of MZC
              </span>
              <span className="claim__header-mzc">
                <span className="claim__header-coin">{reward}</span>&nbsp;MZC
              </span>
            </div>
            <div className="claim__main">
              <span> [Note] </span>
              <ul>
                <li>
                  <span>-</span> ETH is required in order to receive MZC.
                </li>
                <li>
                  <span>-</span> During the claim process, claimable MZC
                  <br />
                  will be recalculated.
                </li>
                <li>
                  <span>-</span> MZC will be paid only for the applicable
                  <br />
                  NFTs from the holder's wallet.
                </li>
              </ul>
            </div>

            <div className="claim__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn--claim" onClick={handleConfirmModal}>
                Claim
              </button>
            </div>
          </div>
        ) : (
          <div className="claim">
            <div className="claim__header">
              <span className="claim__header-title">現在のClaim額</span>
              <span className="claim__header-mzc">
                <span className="claim__header-coin">{reward}</span>&nbsp;MZC
              </span>
            </div>
            <div className="claim__main">
              <span> [注意] </span>
              <ul>
                <li>
                  <span>-</span> MZCを受け取る際にガス代（ETH）が発生します。
                </li>
                <li>
                  <span>-</span>実際のClaim額はClaim実施時に再計算されるため
                  <br />
                  上記のClaim額と異なる場合があります。
                </li>
                <li>
                  <span>-</span>{" "}
                  ClaimされたMZCは連携中のウォレットに支払われます。
                </li>
                <li>
                  <span>-</span>{" "}
                  Staking中のNFTを別ウォレットに移動させた場合、そのNFTが獲得したMZCは消滅します
                </li>
              </ul>
            </div>

            <div className="claim__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Cancel
              </button>
              <button className="btn--claim" onClick={handleConfirmModal}>
                Claim
              </button>
            </div>
          </div>
        )}
      </div>
      {claimConfirmModal && (
        <ClaimConfirm
          claimConfirmModal={claimConfirmModal}
          setClaimConfirmModal={setClaimConfirmModal}
          language={language}
        />
      )}
    </>
  );
};

const ClaimConfirm = ({
  claimConfirmModal,
  setClaimConfirmModal,
  language,
}) => {
  const { contract } = useContract(STAKING_TMHC_CONTRACT);
  const { mutateAsync: claimAll, isLoading } = useContractWrite(
    contract,
    "claimAll"
  );
  console.log(isLoading);

  const call = async () => {
    try {
      const data = await claimAll([]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  const dispatch = useDispatch();
  const claimModal = useSelector((state) => state.claimModal.showClaim);
  const handleClaim = () => {
    dispatch(setClaimModal(!claimModal));
    document.body.style.overflow = "";
    call();
  };

  async function claimRewards() {
    await call();

    window.parent.location.reload();
  }

  return (
    <>
      <div className="modal-background">
        {language === "EN" ? (
          <div className="claim-confirm">
            <span className="claim-confirm__title">
              Would you like to apply for Claim?
            </span>
            <div className="claim-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => setClaimConfirmModal(!claimConfirmModal)}
              >
                Back
              </button>
              {/* <button className="btn--claim-confirm" onClick={handleClaim}>
                Apply
              </button> */}
              <Web3Button
                className="btn-web3"
                contractAddress={STAKING_TMHC_CONTRACT}
                action={() => claimRewards()}
              >
                Claim
              </Web3Button>
            </div>
          </div>
        ) : (
          <div className="claim-confirm">
            <span className="claim-confirm__title">
              クレームを申請しますか？
            </span>
            <div className="claim-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => setClaimConfirmModal(!claimConfirmModal)}
              >
                Back
              </button>
              {/* <button className="btn--claim-confirm" onClick={handleClaim}>
                Apply
              </button> */}
              <Web3Button
                className="btn-web3"
                contractAddress={STAKING_TMHC_CONTRACT}
                action={() => claimRewards()}
              >
                Claim
              </Web3Button>
            </div>
          </div>
        )}
      </div>
      {isLoading && <LoadingModal />}
    </>
  );
};

export default ClaimModal;
