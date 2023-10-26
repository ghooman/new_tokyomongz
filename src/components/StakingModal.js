import React, { useState } from "react";
import "./Modal.scss";
import { useDispatch, useSelector } from "react-redux";
import { setStakingModal } from "../store";
import {
  useContract,
  useContractWrite,
  Web3Button,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import {
  STAKING_TMHC_CONTRACT,
  IMPORT_TMHC_CONTRACT,
} from "../contract/contractAddress";

import abi from "../contract/newAbi";
import Web3 from "web3";

import axios from "axios";

const StakingModal = ({
  language,
  selectData,
  setSelectData,
  momoSelectData,
  setMomoSelectData,
  setIsChecked,
  isChecked,
}) => {
  const dispatch = useDispatch();
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);

  const handleCloseModal = () => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "";
  };

  const [stakingConfirm, setStakingConfirm] = useState(false);

  const handleConfirmModal = () => {
    setStakingConfirm(!stakingConfirm);
  };

  console.log(selectData);
  console.log(isChecked);

  return (
    <>
      <div className="modal-background">
        <div className="staking-modal">
          {/* <div className="staking__count">Total: {selectData.length}</div> */}
          {selectData && selectData.length > 0 ? (
            <div className="staking__img-box">
              {selectData.map((item) => (
                <div className="staking__img-contents" key={item.id}>
                  <div className="staking__img">
                    <img src={item.image} alt="nft" />
                  </div>
                  <span className="staking__img-title">{item.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="staking__img-box">
              {momoSelectData.map((item) => (
                <div className="staking__img-contents" key={item.id}>
                  <div className="staking__img">
                    <img src={item.image} alt="nft" />
                  </div>
                  <span className="staking__img-title">{item.name}</span>
                </div>
              ))}
            </div>
          )}

          {language === "EN" ? (
            <div className="staking__text">
              <p>
                Would you like to apply the staking?
                <br />
                <br />
                - Holders can only claim the reward if they have at least 1 MZC
                per each NFT being staked.
                <br />
                <br />- If the holder sells an NFT that is currently being
                staked, or moves it to a different wallet, they will not receive
                the reward MZC assigned to the NFT.
              </p>
            </div>
          ) : (
            <div className="staking__text">
              <p>
                Stakingを申請しますか？
                <br />
                <br />
                [注意]
                <br />
                <br />
                各NFTごとにClaim額が1MZCに満たない場合はMZCをClaimすることができません。
                <br />
                <br />.
                Staking中のNFTをClaimする前に売却、譲渡等により別のウォレットに移動させた場合、そのNFTがそれまでに獲得したMZCは消滅します。
              </p>
            </div>
          )}
          {language === "EN" ? (
            <div className="staking__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Back
              </button>
              <button className="btn--staking" onClick={handleConfirmModal}>
                Apply Staking
              </button>
            </div>
          ) : (
            <div className="staking__btn">
              <button className="btn--cancel" onClick={handleCloseModal}>
                Back
              </button>
              <button className="btn--staking" onClick={handleConfirmModal}>
                Apply Staking
              </button>
            </div>
          )}
        </div>
      </div>

      {stakingConfirm && (
        <StakingConfirmModal
          selectData={selectData}
          setSelectData={setSelectData}
          momoSelectData={momoSelectData}
          setMomoSelectData={setMomoSelectData}
          stakingConfirm={stakingConfirm}
          setStakingConfirm={setStakingConfirm}
          language={language}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
      )}
    </>
  );
};

const StakingConfirmModal = ({
  stakingConfirm,
  setStakingConfirm,
  selectData,
  setSelectData,
  momoSelectData,
  setMomoSelectData,
  language,
  setIsChecked,
  isChecked,
}) => {
  // address
  const walletAddress = useAddress();
  const dispatch = useDispatch();
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleCloseModal = () => {
    dispatch(setStakingModal(!stakingModal));
    call();
    setSelectData((prev) => []);
    setMomoSelectData((prev) => []);
    document.body.style.overflow = "";
    setIsChecked((prev) => []);
  };

  // 스테이킹
  const { contract } = useContract(STAKING_TMHC_CONTRACT);
  const { contract: importContract } = useContract(IMPORT_TMHC_CONTRACT);

  const { mutateAsync: stake, isLoading } = useContractWrite(contract, "stake");
  console.log(stake);
  console.log(isLoading);

  const call = async () => {
    try {
      let stakeData;
      if (selectData && selectData.length > 0) {
        stakeData = await stake([0, selectData.map((el) => el.id)]);
      } else {
        stakeData = await stake([0, momoSelectData.map((el) => el.id)]);
      }
      console.info("contract call successs", stakeData);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // approveAll
  // const { mutateAsync: setApprovalForAll, isLoading: approveAllIsLoading } =
  //   useContractWrite(importContract, "setApprovalForAll");

  // const approveCall = async () => {
  //   try {
  //     const data = await setApprovalForAll([STAKING_TMHC_CONTRACT, true]);

  //     console.info("contract call successs", data);
  //   } catch (err) {
  //     console.error("contract call failure", err);
  //   }
  // };

  // // approve check
  // const { data: approveData, isLoading: approveDataIsLoading } =
  //   useContractRead(
  //     importContract,
  //     "isApprovedForAll",
  //     walletAddress,
  //     STAKING_TMHC_CONTRACT
  //   );

  const approveCall = () => {
    const contractAddress = IMPORT_TMHC_CONTRACT; // ERC1155 컨트랙트 주소
    const contractABI = abi; // 컨트랙트 ABI

    // const gasLimit = await contract.methods.setApprovalForAll(approvedAddress, isApproved).estimateGas({ from: yourAddress });

    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://ethereum.rpc.thirdweb.com")
    );

    const newContract = new web3.eth.Contract(contractABI, contractAddress); // 컨트랙트 인스턴스 생성

    const approvedAddress = STAKING_TMHC_CONTRACT; // 승인할 주소
    const isApproved = true; // 승인 여부

    // setApprovalForAll 함수 호출
    newContract.methods
      .setApprovalForAll(approvedAddress, isApproved)
      .send({ from: walletAddress })
      .then((receipt) => {
        console.log("Transaction receipt:", receipt);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  async function stakingNft() {
    // if (approveData) {
    //   await call();
    // } else {
    // await approveCall();
    await call();

    window.parent.location.reload();
  }

  console.log(isChecked);
  console.log(selectData);

  // ==================== 스테이킹 ======================
  console.log(walletAddress);

  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");

  // ============== 로딩중 ==============
  const [stakingIsLoading, setStakingIsLoading] = useState(false);

  // ========= api data ===========
  let workNFT;
  if (isChecked.length === 0) {
    if (selectData && selectData.length > 0) {
      workNFT = [selectData[0].id];
    } else if (momoSelectData && momoSelectData.length > 0) {
      workNFT = [momoSelectData[0].id];
    }
  } else {
    workNFT = isChecked;
  }

  const data = {
    address: walletAddress, // 현재 지갑
    workNFT,
  };

  console.log("포스트데이터", data);

  console.log("포스트데이터", data);

  console.log("셀렉트데이터", selectData);
  const handleStaking = async () => {
    setStakingIsLoading(true);

    console.log(data);
    try {
      let res;
      if (selectData && selectData.length > 0) {
        res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/StakeTMHC?address=${walletAddress}&tokenIds=${
            isChecked.length === 0 ? [selectData[0].id] : isChecked
          }`
          // {
          //   params: {
          //     address: walletAddress,
          //     tokenIds: isChecked.length === 0 ? [selectData[0].id] : isChecked,
          //   },
          // }
        );
      } else {
        res = await axios.post(
          `https://mongz-api.sevenlinelabs.app/StakeMOMO?address=${walletAddress}&tokenIds=${
            isChecked.length === 0 ? [momoSelectData[0].id] : isChecked
          }`
          // {
          //   params: {
          //     address: walletAddress,
          //     tokenIds: isChecked.length === 0 ? [momoSelectData[0].id] : isChecked,
          //   },
          // }
        );
      }

      console.log("스테이킹=================", res.data);
      setErrMsg(res.data[1]);
      setFailModalControl(true);
    } catch (err) {
      console.log(err);
    } finally {
      setStakingIsLoading(false);
    }
  };

  console.log(errMsg);
  console.log("체크드", isChecked);

  // =========== 스테이킹 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);
  console.log(failModalControl);
  return (
    <>
      {language === "EN" ? (
        <div className="modal-background">
          <div className="staking-confirm">
            <span className="staking-confirm__title">
              Would you like to apply for a single Staking?
            </span>
            <div className="staking-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => {
                  setStakingConfirm(!stakingConfirm);
                }}
                disabled={stakingIsLoading}
              >
                Back
              </button>
              {/* <button
                className="btn--staking-confirm"
                onClick={handleCloseModal}
              >
                Apply
              </button> */}
              <button
                className="btn-staking-confirm"
                onClick={handleStaking}
                disabled={stakingIsLoading}
              >
                {stakingIsLoading ? "Loading..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="modal-background">
          <div className="staking-confirm">
            <span className="staking-confirm__title">
              シングルステーキングを適用しますか？
            </span>
            <div className="staking-confirm__btn">
              <button
                className="btn--cancel"
                onClick={() => {
                  setStakingConfirm(!stakingConfirm);
                }}
                disabled={stakingIsLoading}
              >
                Back
              </button>
              <button
                className="btn-staking-confirm"
                onClick={handleStaking}
                disabled={stakingIsLoading}
              >
                {stakingIsLoading ? "Loading..." : "Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
      {failModalControl && (
        <StakingFailModal
          setFailModalControl={setFailModalControl}
          errMsg={errMsg}
          language={language}
          data={data}
        />
      )}
    </>
  );
};

const StakingFailModal = ({ setFailModalControl, errMsg, language, data }) => {
  if (language === "JP") {
    if (errMsg === "시스템 에러") {
      errMsg = "一時的なエラーが発生しました。 もう一度お試しください。";
    }

    if (errMsg === "스테이킹 처리 실패 이미 스테이킹중인 NFT가 있습니다.") {
      errMsg =
        "ステーキング処理に失敗しました。 すでにステーキング中のNFTが含まれています。";
    }
    if (errMsg.includes("처리 완료")) {
      errMsg = errMsg.replace(
        "스테이킹 처리 완료",
        "のステーキング処理に成功しました。"
      );
    }
  } else {
    if (errMsg === "시스템 에러") {
      errMsg = "An error has occurred. Please try again.";
    }

    if (errMsg === "스테이킹 처리 실패 이미 스테이킹중인 NFT가 있습니다.") {
      errMsg =
        "The Staking process failed. It contains NFTs that are already staking.";
    }
    if (errMsg.includes("처리 완료")) {
      errMsg = `The staking process for ID ${data.workNFT} was successful.`;
    }
    console.log(errMsg);
  }

  console.log(errMsg);

  const dispatch = useDispatch();
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のステーキング処理に成功しました。") ||
      errMsg.includes("was successful.")
    ) {
      dispatch(setStakingModal(!stakingModal));
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

export default StakingModal;
