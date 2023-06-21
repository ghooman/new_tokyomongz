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

import abi from "../pages/newAbi";
import Web3 from "web3";

const StakingModal = ({
  language,
  selectData,
  setSelectData,
  setIsChecked,
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

  return (
    <>
      <div className="modal-background">
        <div className="staking-modal">
          <div className="staking__count">Total: {selectData.length}</div>
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
          {language === "EN" ? (
            <div className="staking__text">
              <p>
                Would you like to apply for staking?
                <br />
                ETH is required for staking.
                <br />
                <br />
                [Caution]
                <br />
                <br />
                If the wallet of NFT changes due to sale, transfer, and etc.,
                MZC generated from applicable NFT will not be distributed.
              </p>
            </div>
          ) : (
            <div className="staking__text">
              <p>
                Stakingを申請しますか？ <br />
                Stakingの申請にはガス代（ETH）が発生します。 <br />
                また、Staking後にStakingをキャンセルされる場合もガス代が（ETH）が発生いたします。
                <br />
                <br />
                [注意]
                <br />
                <br />
                売却、譲渡等によりStaking中のNFTを別のウォレットに移動させた場合、移動したNFTが生成したこれまでのMZCは消滅します。
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
          stakingConfirm={stakingConfirm}
          setStakingConfirm={setStakingConfirm}
          language={language}
          setIsChecked={setIsChecked}
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
  language,
  setIsChecked,
}) => {
  // address
  const walletAddress = useAddress();
  const dispatch = useDispatch();
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleCloseModal = () => {
    dispatch(setStakingModal(!stakingModal));
    call();
    setSelectData((prev) => []);
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
      const stakeData = await stake([0, selectData.map((el) => el.id)]);
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
              >
                Back
              </button>
              {/* <button
                className="btn--staking-confirm"
                onClick={handleCloseModal}
              >
                Apply
              </button> */}
              <Web3Button
                className="btn-web3"
                contractAddress={STAKING_TMHC_CONTRACT}
                action={() => stakingNft()}
              >
                Apply
              </Web3Button>
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
              >
                Back
              </button>
              {/* <button
                className="btn--staking-confirm"
                onClick={handleCloseModal}
              >
                Apply
              </button> */}
              <div className="btn-apply-box">
                <Web3Button
                  className="btn-web3"
                  contractAddress={STAKING_TMHC_CONTRACT}
                  action={() => stakingNft()}
                >
                  Apply
                </Web3Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StakingModal;
