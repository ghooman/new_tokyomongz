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

const CancelStakingModal = ({
  selectData,
  setSelectData,
  momoSelectData,
  setMomoSelectData,
  language,
}) => {
  const dispatch = useDispatch();
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );
  const handleCloseModal = () => {
    dispatch(setCancelStakingModal(!cancelStakingModal));
    // document.body.style.overflow = "";
  };
  const [cancelStakingConfirm, setCancelStakingConfirm] = useState(false);
  const handleConfirmModal = () => {
    setCancelStakingConfirm(!cancelStakingConfirm);
  };

  console.log(selectData);
  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };
  return (
    <>
      <div className="modal-background" onClick={handleModalBackground}>
        {language === "EN" ? (
          <div className="cancel">
            {selectData && selectData.length > 0 ? (
              <>
                {selectData.map((item, i) => (
                  <div className="cancel__img-contents" key={item.id}>
                    <div className="cancel__img">
                      <img src={item.image} alt="nft" />
                    </div>
                    <span className="cancel__img-title">{item.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                {momoSelectData.map((item, i) => (
                  <div className="cancel__img-contents" key={item.id}>
                    <div className="cancel__img">
                      <img src={item.image} alt="nft" />
                    </div>
                    <span className="cancel__img-title">{item.name}</span>
                  </div>
                ))}
              </>
            )}
            <div className="cancel__text">
              <p>
                Are you sure you want to cancel Staking?
                <br />
                You will automatically receive the MZC acquired by NFT when you
                cancel
                <br />
                <br />
                [Caution]
                <br />
                If the NFT in Staking is moved to another wallet by selling,
                transferring, etc. before claiming, the MZC that the NFT has
                acquired so far will disappear. If the claim amount is less than
                1 MZC for each NFT, MZC cannot be claimed.
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
            {selectData && selectData.length > 0 ? (
              <>
                {" "}
                {selectData.map((item, i) => (
                  <div className="cancel__img-contents">
                    <div className="cancel__img">
                      <img src={item.image} alt="nft" />
                    </div>
                    <span className="cancel__img-title">{item.name}</span>
                  </div>
                ))}
              </>
            ) : (
              <>
                {" "}
                {momoSelectData.map((item, i) => (
                  <div className="cancel__img-contents">
                    <div className="cancel__img">
                      <img src={item.image} alt="nft" />
                    </div>
                    <span className="cancel__img-title">{item.name}</span>
                  </div>
                ))}
              </>
            )}

            <div className="cancel__text">
              <p>
                Stakingを解除してもよろしいですか？
                <br />
                解除時にNFTが獲得したMZCを自動で受け取ります。
                <br />
                <br />
                [注意]
                <br />
                Staking中のNFTを、Claimする前に売却・譲渡等により別のウォレットに移動させた場合、そのNFTがそれまでに獲得したMZCは消滅します。
                <br />
                各NFTごとにClaim額が1MZCに満たない場合はMZCをClaimすることができません。
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
          momoSelectData={momoSelectData}
          setMomoSelectData={setMomoSelectData}
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
  momoSelectData,
  setMomoSelectData,
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
      workNFT:
        selectData && selectData.length > 0
          ? [selectData[0].id]
          : [momoSelectData[0].id],
    };

    console.log(data);
    try {
      let res;
      if (selectData && selectData.length > 0) {
        res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/unStakeTMHC?address=${walletAddress}&tokenIds=${JSON.stringify(
            [selectData[0].id]
          )}`
        );
      } else {
        res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/unStakeMOMO?address=${walletAddress}&tokenIds=${JSON.stringify(
            [momoSelectData[0].id]
          )}`
        );
      }

      console.log("언스테이킹=================", res.data[1]);
      setErrMsg(res.data[1]);
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

  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setCancelStakingConfirm(!cancelStakingConfirm);
    }
  };
  return (
    <>
      <div className="modal-background" onClick={handleModalBackground}>
        {language === "EN" ? (
          <div className="cancel-staking-confirm">
            <span className="cancel-staking-confirm__title">
              Are you sure you want to cancel staking?
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
              Stakingを<span className="text-red20">解除</span>
              してもよろしいですか？
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
    if (errMsg === "시스템 에러") {
      errMsg = "一時的なエラーが発生しました。 もう一度お試しください。";
    }

    if (errMsg.includes("청구 할 수 없습니다.")) {
      errMsg = errMsg
        .replace("가 획득한 청구금액은 ", "が獲得したClaim額が:")
        .replace(
          " 미만이므로 청구 할 수 없습니다. ",
          "に満たないためClaimすることができません。"
        )
        .replace("현재 MZC : ", "現在のリワード:");
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
    if (errMsg === "시스템 에러") {
      errMsg = "An error has occurred. Please try again.";
    }
    if (errMsg.includes("언스테이킹 실패")) {
      errMsg =
        "Unstaking failed. It contains NFTs that you do not own or are not in the process of staking.";
    }
    if (errMsg.includes("청구 할 수 없습니다.")) {
      errMsg = errMsg
        .replace("가 획득한 청구금액은 ", "'s reward is under ")
        .replace(" 미만이므로 청구 할 수 없습니다. ", ". ")
        .replace("현재 MZC : ", "Current Reward: ");
    }

    if (errMsg.includes("언스테이킹 완료")) {
      errMsg = errMsg.replace("언스테이킹 완료", " has been unstaked");
    }
  }

  const dispatch = useDispatch();
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のステーキングの解除処理が完了しました。") ||
      errMsg.includes("has been unstaked")
    ) {
      dispatch(setCancelStakingModal(!cancelStakingModal));
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

export default CancelStakingModal;
