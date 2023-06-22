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
  const handleCloseModal = () => {
    dispatch(setCancelStakingModal(!cancelStakingModal));
    call();
    document.body.style.overflow = "";
  };

  // 언스테이킹
  const { contract: stakingTmhc } = useContract(STAKING_TMHC_CONTRACT);
  const { mutateAsync: unStake, unstakeIsLoading } = useContractWrite(
    stakingTmhc,
    "unStake"
  );

  const call = async () => {
    try {
      const unstakeData = await unStake([0, [selectData[0].id]]);
      console.info("contract call successs", unstakeData);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  async function cancelStaking() {
    await call();

    window.parent.location.reload();
  }

  //

  const handleUnStaking = async () => {
    const data = {
      address: walletAddress, // 현재 지갑
      // workNFT: isChecked,
      workNFT: [7],
      // 선택한 목록
    };

    try {
      const res = await axios.post(
        "http://35.77.226.185/api/unStakeTMHC",
        data
      );
      console.log("언스테이킹=================", res);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
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
              >
                Cancel Staking
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
              >
                Cancel Staking
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CancelStakingModal;
