import React, { useState } from "react";
import "./Modal.scss";
import nftExample from "../assets/images/nft-image.png";
import { useSelector, useDispatch } from "react-redux";
import { setCancelStakingModal } from "../store";
import {
  useContractWrite,
  useContract,
  Web3Button,
  useAddress,
} from "@thirdweb-dev/react";
import { STAKING_TMHC_CONTRACT } from "../contract/contractAddress";

import axios from "axios";

const CancelStakingModal = ({ selectData, setSelectData, language }) => {
  const dispatch = useDispatch();
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );
  const handleCloseModal = () => {
    dispatch(setCancelStakingModal(!cancelStakingModal));
    document.body.style.overflow = "";
  };
  const [cancelStakingConfirm, setCancelStakingConfirm] = useState(false);
  const handleConfirmModal = () => {
    setCancelStakingConfirm(!cancelStakingConfirm);
  };

  console.log(selectData);

  return (
    <>
      <div className="modal-background">
        {language === "EN" ? (
          <div className="cancel">
            {selectData.map((item, i) => (
              <div className="cancel__img-contents" key={item.id}>
                <div className="cancel__img">
                  <img src={item.image} alt="nft" />
                </div>
                <span className="cancel__img-title">{item.name}</span>
              </div>
            ))}
            <div className="cancel__text">
              <p>
                Are you sure you want to cancel staking? <br />
                ETH is required to cancel staking.
                <br />
                <br />
                [Caution] <br />
                If the wallet of NFT changes due to sale, wallet transfer, etc.,
                MZC generated from applicable NFT will not be distributed.
              </p>
            </div>
            <div className="cancel__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Back
              </button>
              <button
                className="btn--cancel-staking"
                onClick={handleConfirmModal}
              >
                Cancel Staking
              </button>
            </div>
          </div>
        ) : (
          <div className="cancel">
            {selectData.map((item, i) => (
              <div className="cancel__img-contents">
                <div className="cancel__img">
                  <img src={item.image} alt="nft" />
                </div>
                <span className="cancel__img-title">{item.name}</span>
              </div>
            ))}
            <div className="cancel__text">
              <p>
                Stakingをキャンセルしてもよろしいですか？
                <br />
                Stakingのキャンセルにはガス代（ETH）が発生します。
                <br />
                <br />
                [注意]
                <br />
                売却、譲渡等によりStaking中のNFTを別のウォレットに移動させた場合、移動したNFTが生成したこれまでのMZCは消滅します。
              </p>
            </div>
            <div className="cancel__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Back
              </button>
              <button
                className="btn--cancel-staking"
                onClick={handleConfirmModal}
              >
                Cancel Staking
              </button>
            </div>
          </div>
        )}
      </div>
      {cancelStakingConfirm && (
        <CancelStakingConfirmModal
          selectData={selectData}
          setSelectData={setSelectData}
          cancelStakingConfirm={cancelStakingConfirm}
          setCancelStakingConfirm={setCancelStakingConfirm}
          language={language}
        />
      )}
    </>
  );
};

const CancelStakingConfirmModal = ({
  selectData,
  setSelectData,
  cancelStakingConfirm,
  setCancelStakingConfirm,
  language,
}) => {
  const walletAddress = useAddress();

  const dispatch = useDispatch();
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );
  // const handleCloseModal = () => {
  //   dispatch(setCancelStakingModal(!cancelStakingModal));
  //   call();
  //   document.body.style.overflow = "";
  // };

  // 언스테이킹
  // const { contract: stakingTmhc } = useContract(STAKING_TMHC_CONTRACT);
  // const { mutateAsync: unStake, unstakeIsLoading } = useContractWrite(
  //   stakingTmhc,
  //   "unStake"
  // );

  // const call = async () => {
  //   try {
  //     const unstakeData = await unStake([0, [selectData[0].id]]);
  //     console.info("contract call successs", unstakeData);
  //   } catch (err) {
  //     console.error("contract call failure", err);
  //   }
  // };

  // async function cancelStaking() {
  //   await call();

  //   window.parent.location.reload();
  // }

  //
  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");
  // ============ 로딩중 ================
  const [UnStakingIsLoading, setUnStakingIsLoading] = useState(false);

  const handleUnStaking = async () => {
    setUnStakingIsLoading(true);
    const data = {
      address: walletAddress, // 현재 지갑
      // workNFT: isChecked,
      workNFT: [selectData[0].id],
      // 선택한 목록
    };

    console.log(data);
    try {
      const res = await axios.post(
        "https://www.tokyo-test.shop/api/unStakeTMHC",
        data
      );
      console.log("언스테이킹=================", res.data.msg);
      setErrMsg(res.data.msg);
      setFailModalControl(true);
    } catch (err) {
      console.log(err);
    } finally {
      setUnStakingIsLoading(false);
    }
  };

  // =========== 언스테이킹 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);
  console.log(failModalControl);
  return (
    <>
      <div className="modal-background">
        {language === "EN" ? (
          <div className="cancel-staking-confirm">
            <span className="cancel-staking-confirm__title">
              Are you sure you want to cancel
              <br />
              your single staking?
            </span>
            <div className="cancel-staking-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => setCancelStakingConfirm(!cancelStakingConfirm)}
                disabled={UnStakingIsLoading}
              >
                Back
              </button>
              {/* <button
                className="btn--cancel-staking-confirm"
                onClick={handleCloseModal}
              >
                Cancel Staking
              </button> */}
              <button
                className="btn-unstaking-confirm"
                onClick={handleUnStaking}
                disabled={UnStakingIsLoading}
              >
                {UnStakingIsLoading ? "Loading..." : "Cancel Staking"}
              </button>
            </div>
          </div>
        ) : (
          <div className="cancel-staking-confirm">
            <span className="cancel-staking-confirm__title">
              ステーキングをキャンセルしてもよろしいですか？
            </span>
            <div className="cancel-staking-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => setCancelStakingConfirm(!cancelStakingConfirm)}
                disabled={UnStakingIsLoading}
              >
                Back
              </button>
              {/* <button
                className="btn--cancel-staking-confirm"
                onClick={handleCloseModal}
              >
                Cancel Staking
              </button> */}
              <button
                className="btn-unstaking-confirm"
                onClick={handleUnStaking}
                disabled={UnStakingIsLoading}
              >
                {UnStakingIsLoading ? "Loading..." : "Cancel Staking"}
              </button>
            </div>
          </div>
        )}
      </div>
      {failModalControl && (
        <UnStakingFailModal
          setFailModalControl={setFailModalControl}
          errMsg={errMsg}
          language={language}
        />
      )}
    </>
  );
};

const UnStakingFailModal = ({ setFailModalControl, errMsg, language }) => {
  if (language === "JP") {
    if (errMsg.includes("너무 적습니다")) {
      errMsg = errMsg
        .replace(
          "의 리워드가 너무 적습니다. 현재 리워드 : ",
          "でもらえるリワードが少なすぎます。 現在のリワード : "
        )
        .replace("최소 리워드 : ", "最小申請可能リワード : ");
    }
    if (errMsg.includes("언스테이킹 실패")) {
      errMsg =
        "ステーキングの解除が失敗しました。保有していない、またはステーキング中でないNFTが含まれています。";
    }

    if (errMsg.includes("언스테이킹 완료")) {
      errMsg = errMsg
        .replace("언스테이킹 완료", "のステーキングの解除処理が完了しました。")
        .replace(".", "");
    }
  } else {
    // ===================== EN ===========================
    if (errMsg.includes("언스테이킹 실패")) {
      errMsg =
        "Unstaking failed. It contains NFTs that you do not own or are not in the process of staking.";
    }
    if (errMsg.includes("너무 적습니다")) {
      errMsg = errMsg
        .replace(
          "의 리워드가 너무 적습니다. 현재 리워드 : ",
          "'s reward is too small. Current Reward: "
        )
        .replace("최소 리워드 : ", "Minimum Reward Required: ");
    }

    if (errMsg.includes("언스테이킹 완료")) {
      errMsg = errMsg.replace("언스테이킹 완료", " has been unstaked");
    }
  }

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のステーキングの解除処理が完了しました。") ||
      errMsg.includes("has been unstaked")
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

export default CancelStakingModal;
