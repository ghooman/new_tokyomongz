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

const ClaimModal = ({ language, reward, claimType }) => {
  console.log(claimType, "클레임타입");
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

  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  return (
    <>
      <div className="modal-background" onClick={handleModalBackground}>
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
              <span> [Notice] </span>
              <ul>
                <li>
                  <span>-</span> ETH is required in order to receive MZC.
                </li>
                <li>
                  <span>-</span> Claimable MZC will be recalculated during the
                  claim process.
                </li>
                <li>
                  <span>-</span> MZC will be paid only for the applicable NFTs
                  from the holder's wallet.
                  <br />
                </li>
                <li>
                  <span>-</span> If NFT can not be found in the holder’s wallet,
                  the applicable MZC for the NFT will be excluded from the total
                  amount of MZC received.
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
                  <span>-</span>{" "}
                  実際のClaim額はClaim実施時に再計算されるため上記のClaim額と異なる場合があります。
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
          claimType={claimType}
        />
      )}
    </>
  );
};

const ClaimConfirm = ({
  claimConfirmModal,
  setClaimConfirmModal,
  language,
  claimType,
}) => {
  const walletAddress = useAddress();
  console.log("지갑주소", walletAddress);

  const { contract } = useContract(STAKING_TMHC_CONTRACT);
  const { mutateAsync: claimAll, isLoading } = useContractWrite(
    contract,
    "claimAll"
  );

  const call = async () => {
    try {
      const data = await claimAll([]);
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  async function claimRewards() {
    await call();

    window.parent.location.reload();
  }

  // claim ======================
  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");

  // ========== 로딩중 ============
  const [claimIsLoading, setClaimIsLoading] = useState(false);

  const handleClaim = async (claimType) => {
    setClaimIsLoading(true);
    const data = {
      address: walletAddress, // 현재 지갑
    };

    try {
      if (claimType === "tmhcClaim") {
        const res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/ClaimTMHCAll?address=${walletAddress}`
        );
        setErrMsg(res.data[1]);
        setFailModalControl(true);
      } else if (claimType === "momoClaim") {
        const res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/ClaimMOMOAll?address=${walletAddress}`
        );
        setErrMsg(res.data[1]);
        setFailModalControl(true);
      } else if (claimType === "teamClaim") {
        const res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/ClaimTeamAll?address=${walletAddress}`
        );
        setErrMsg(res.data[1]);
        setFailModalControl(true);
        console.log("클레임 에러 확인", res);
      }

      // window.location.reload();
    } catch (err) {
      console.log("클레임 에러===========", err);
    } finally {
      setClaimIsLoading(false);
    }
  };

  // =========== 클레임 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);

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
                disabled={claimIsLoading}
              >
                Back
              </button>
              {/* <button className="btn--claim-confirm" onClick={handleClaim}>
                Apply
              </button> */}
              <button
                className="btn-claim-confirm"
                onClick={() => handleClaim(claimType)}
                disabled={claimIsLoading}
              >
                {claimIsLoading ? "Loading..." : "Claim"}
              </button>
            </div>
          </div>
        ) : (
          <div className="claim-confirm">
            <span className="claim-confirm__title">Claimを申請しますか？</span>
            <div className="claim-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => setClaimConfirmModal(!claimConfirmModal)}
                disabled={claimIsLoading}
              >
                Back
              </button>
              {/* <button className="btn--claim-confirm" onClick={handleClaim}>
                Apply
              </button> */}
              <button
                className="btn-claim-confirm"
                onClick={() => handleClaim(claimType)}
                disabled={claimIsLoading}
              >
                {claimIsLoading ? "Loading..." : "Claim"}
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
          language={language}
        />
      )}
    </>
  );
};

const ClaimFailModal = ({ setFailModalControl, errMsg, language }) => {
  console.log("메시지===========", errMsg);
  if (language === "JP") {
    if (errMsg.includes("모든 Claim 트렌젝션 등록 완료")) {
      errMsg = errMsg
        .replace("스테이킹 중인 ", "ステーキング中の")
        .replace(
          "의 모든 Claim 트렌젝션 등록 완료",
          "のすべてのClaimリクエストが完了しました。"
        )
        .replace(
          "모든 Claim 트렌젝션 등록 완료",
          "すべてのClaimリクエストが完了しました。"
        )
        .replace(".", "");
    }

    if (errMsg === "시스템 에러") {
      errMsg = "一時的なエラーが発生しました。 もう一度お試しください。";
    }

    if (errMsg.includes("트렌젝션 등록")) {
      errMsg = errMsg
        .replace(
          "의 Claim 트렌젝션 등록 완료",
          "のClaimリクエストを受け付けました。"
        )
        .replace(".", "");
    }

    if (errMsg === "현재 받을 수 있는 리워드가 없습니다.") {
      errMsg = "現在、受領可能なリワードがありません。";
    }
    // ID {tokenid}가 획득한 청구금액은 {self.MinimumReward}MZC 미만이므로 청구 할 수 없습니다. 현재 MZC : {rewardEth}
    if (errMsg.includes("청구 할 수 없습니다.")) {
      errMsg = errMsg
        .replace("가 획득한 청구금액은 ", "が獲得したClaim額が:")
        .replace(
          " 미만이므로 청구 할 수 없습니다. ",
          "に満たないためClaimすることができません。"
        )
        .replace("현재 MZC : ", "現在のリワード:");
    }
  } else {
    // ============================================ English ====================================
    if (errMsg === "시스템 에러") {
      errMsg = "An error has occurred. Please try again.";
    }
    if (errMsg.includes("모든 Claim 트렌젝션 등록 완료")) {
      errMsg = errMsg
        .replace(
          "스테이킹 중인 ",
          "All claim transition registration has been completed for "
        )
        .replace("모든 Claim 트렌젝션 등록 완료", " that is being staked.")
        .replace("의 모든 Claim 트렌젝션 등록 완료", " that is being staked.");
    }
    if (errMsg === "현재 받을 수 있는 리워드가 없습니다.") {
      errMsg = "There are currently no claimable rewards.";
    }

    // if (errMsg === "의 Claim 트렌젝션 등록 완료") {
    //   errMsg = errMsg.replace(
    //     "의 Claim 트렌젝션 등록 완료",
    //     "'s claim transaction has been registered"
    //   );
    // }

    if (errMsg.includes("청구 할 수 없습니다.")) {
      errMsg = errMsg
        .replace("가 획득한 청구금액은 ", "'s reward is under ")
        .replace(" 미만이므로 청구 할 수 없습니다. ", ". ")
        .replace("현재 MZC : ", "Current Reward: ");
    }
  }

  const dispatch = useDispatch();
  const claimModal = useSelector((state) => state.claimModal.showClaim);

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のすべてのClaimリクエストが完了しました。") ||
      errMsg.includes("のClaimリクエストを受け付けました。") ||
      errMsg.includes("すべてのClaimリクエストが完了しました。") ||
      errMsg.includes(
        "All claim transition registration has been completed for"
      ) ||
      errMsg.includes("claim requests have been completed.")
    ) {
      dispatch(setClaimModal(!claimModal));
      window.location.reload();
    }
  };
  console.log(errMsg);

  return (
    <>
      <div className="modal-background">
        <div className="staking-fail">
          <p className="staking-fail__text">{errMsg}</p>
          <button className="btn-confirm" onClick={modalClose}>
            OK
          </button>
        </div>
      </div>
    </>
  );
};

export default ClaimModal;
