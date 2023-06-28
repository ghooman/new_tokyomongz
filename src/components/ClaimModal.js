import React, { useEffect, useState } from "react";
import "./Modal.scss";
import { useSelector, useDispatch } from "react-redux";
import { setClaimModal } from "../store";
import {
  useAddress,
  useContract,
  useContractWrite,
  Web3Button,
} from "@thirdweb-dev/react";
import LoadingModal from "./LoadingModal";
import { STAKING_TMHC_CONTRACT } from "../contract/contractAddress";

import axios from "axios";

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
  const walletAddress = useAddress();

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

  async function claimRewards() {
    await call();

    window.parent.location.reload();
  }

  // claim ======================
  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");
  const handleClaim = async () => {
    const data = {
      address: walletAddress, // 현재 지갑
    };

    try {
      const res = await axios.post(
        "http://35.77.226.185/api/ClaimAllTMHC",
        data
      );
      console.log("클레임=================", res.data.msg);
      setErrMsg(res.data.msg);
      setFailModalControl(true);
      // window.location.reload();
    } catch (err) {
      console.log("클레임 에러===========", err);
    }
  };

  // =========== 클레임 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);
  console.log(failModalControl);

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
              <button className="btn-claim-confirm" onClick={handleClaim}>
                Claim
              </button>
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
              <button className="btn-claim-confirm" onClick={handleClaim}>
                Claim
              </button>
            </div>
          </div>
        )}
      </div>
      {/* {isLoading && <LoadingModal />} */}
      {failModalControl && (
        <ClaimFailModal
          setFailModalControl={setFailModalControl}
          errMsg={errMsg}
        />
      )}
    </>
  );
};

const ClaimFailModal = ({ setFailModalControl, errMsg }) => {
  if (errMsg.includes("트렌젝션 등록")) {
    errMsg = errMsg
      .replace(
        "의 Claim 트렌젝션 등록 완료",
        "のClaimリクエストを受け付けました。"
      )
      .replace(".", "");
  }
  if (errMsg.includes("Claim 트렌젝션 등록 완료")) {
    errMsg = errMsg
      .replace("스테이킹중인 ", "ステーキング中の")
      .replace(
        "의 모든 Claim 트렌젝션 등록 완료",
        "のすべてのClaimリクエストが完了しました。"
      )
      .replace(".", "");
  }
  if (errMsg === "현재 받을 수 있는 리워드가 없습니다.") {
    errMsg = "現在、受領可能なリワードがありません。";
  }
  if (errMsg.includes("너무 적습니다")) {
    errMsg = errMsg
      .replace(
        "의 리워드가 너무 적습니다. 현재 리워드 : ",
        "でもらえるリワードが少なすぎます。 現在のリワード : "
      )
      .replace("최소 리워드 : ", "最小申請可能リワード : ");
  }
  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のすべてのClaimリクエストが完了しました。") ||
      errMsg.includes("のClaimリクエストを受け付けました。")
    ) {
      window.location.reload();
    }
  };
  console.log(errMsg);

  return (
    <>
      <div className="modal-background">
        <div className="staking-fail">
          <span className="staking-fail__text">{errMsg}</span>
          <button className="btn-confirm" onClick={modalClose}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default ClaimModal;
