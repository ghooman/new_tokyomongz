import React, { useState } from "react";
import "./TeamStakingConfirmModal.scss";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
const TeamStakingConfirmModal = ({
  language,
  setTeamStakingConfirmModal,
  teamStakingMongzData,
  selectData,
}) => {
  // 팀 스테이킹 등록할때 필요한 정보입니다.
  const walletAddress = useAddress();
  const tmhcIds = teamStakingMongzData.id;
  const momoIds = selectData.map((momo) => momo.id);
  // =========== 언스테이킹 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);
  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");

  const postTeamStakingNftList = async () => {
    // const data = {
    //   address: walletAddress,
    //   tmhcids: ,
    //   momoids: ,
    // };
    // setDataStatus(false);

    try {
      console.log("스테이킹 보내는 정보json =======", JSON.stringify(tmhcIds));
      console.log("스테이킹 보내는 정보json =======", JSON.stringify(momoIds));
      const res = await axios.post(
        "https://mongz-api.sevenlinelabs.app/StakeTeam",
        {},
        {
          params: {
            address: walletAddress,
            tmhcIds: tmhcIds,
            momoIds: JSON.stringify(momoIds),
          },
        }
      );
      console.log("스테이킹 리스트=========", res.data);
      setErrMsg(res.data[1]);
      setFailModalControl(true);
    } catch (err) {
      console.log("스테이킹 리스트 에러 정보 ==========", err);
      setErrMsg("Server Error");
      setFailModalControl(true);
    }
  };
  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setTeamStakingConfirmModal((prev) => !prev);
    }
  };
  return (
    <div className="modal-background" onClick={handleModalBackground}>
      <div className="confirm-modal-background">
        <div className="confirm-modal__text">
          {language === "EN" ? (
            <>
              Mongz X MOMO <br />
              Would you like to proceed <br />
              the team staking?
            </>
          ) : (
            `チームステーキングをご希望ですか？`
          )}
        </div>
        <div className="confirm-modal__btn-box">
          <button
            className="confirm-modal__back-btn"
            onClick={() => setTeamStakingConfirmModal((prev) => !prev)}
          >
            Back
          </button>
          <button
            className="confirm-modal__confirm-btn"
            onClick={postTeamStakingNftList}
          >
            Team up
          </button>
        </div>
      </div>
      {failModalControl && (
        <TeamStakingFailModal
          setFailModalControl={setFailModalControl}
          errMsg={errMsg}
          language={language}
        />
      )}
    </div>
  );
};

//////////////////////////////////////////////
// 컴펀클릭후 뜨는모달
const TeamStakingFailModal = ({
  setFailModalControl,
  errMsg,
  language,
  data,
}) => {
  console.log("팀스테이킹컨펌모달", data);
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
      // 임시로 workNFT가 없을때 문장을 바꿔놨습니다.
      errMsg = errMsg.replace(
        "스테이킹 처리 완료",
        "The staking process was successful."
      );
      // errMsg = `The staking process for ID ${data.workNFT} was successful.`;
    }
    console.log(errMsg);
  }

  console.log(errMsg);

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のステーキング処理に成功しました。") ||
      errMsg.includes("was successful.")
    ) {
      window.location.href = "/team";
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
export default TeamStakingConfirmModal;
