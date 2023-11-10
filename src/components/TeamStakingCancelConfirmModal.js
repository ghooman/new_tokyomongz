import React, { useState } from "react";
import "./TeamStakingCancelConfirmModal.scss";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
// import TeamStakingCancelModal from "./TeamStakingCancelModal";
const TeamStakingCancelConfirmModal = ({
  language,
  setTeamStakingCancelConfirmModal,
  selectData,
}) => {
  // 팀 스테이킹 등록할때 필요한 정보입니다.
  const walletAddress = useAddress();
  const tokenId = selectData[0].id;
  // =========== 언스테이킹 실패 모달 컨트롤 =============
  const [failModalControl, setFailModalControl] = useState(false);
  // ================ 실패 메시지 ==============
  const [errMsg, setErrMsg] = useState("");

  const postUnTeamStakingNftList = async () => {
    try {
      console.log("스테이킹 보내는 정보json =======", JSON.stringify(tokenId));
      const res = await axios.post(
        "https://mongz-api.sevenlinelabs.app/unStakeTeam",
        {},
        {
          params: {
            address: walletAddress,
            tokenId: tokenId,
          },
        }
      );
      console.log("스테이킹 리스트=========", res.data);
      setErrMsg(res.data[1]);
      setFailModalControl(true);
    } catch (err) {
      console.log("스테이킹 리스트 에러 정보 ==========", err);
    }
  };
  const handleModalBackground = (e) => {
    if (e.target === e.currentTarget) {
      setTeamStakingCancelConfirmModal((prev) => !prev);
    }
  };
  return (
    <div
      className="team-staking-cancel-confirm-modal-background"
      onClick={handleModalBackground}
    >
      <div className="cancel-confirm-modal-background">
        <div className="cancel-confirm-modal__text">
          {language === "EN" ? (
            <>
              Are you sure you want to cancel
              <br />
              team staking?
            </>
          ) : (
            "チームステーキングを解除してもよろしいですか？"
            // `Team Stakingを解除してもよろしいですか`
            // 임시 피그마 없어서 이전 문구 사용했습니다.
          )}
        </div>
        <div className="cancel-confirm-modal__btn-box">
          <button
            className="cancel-confirm-modal__back-btn"
            onClick={() => setTeamStakingCancelConfirmModal((prev) => !prev)}
          >
            Back
          </button>
          <button
            className="cancel-confirm-modal__confirm-btn"
            onClick={postUnTeamStakingNftList}
          >
            Cancel Staking
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
        "ステーキングの解除が失敗しました。保有していない、またはステーキング中でないNFTが含まれています。 1MZC未満はキャンセルできません。";
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
        "Unstaking failed. It contains NFTs that you do not own or are not in the process of staking. Anything less than 1MZC cannot be cancelled.";
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

  console.log(errMsg);

  const modalClose = () => {
    setFailModalControl(false);
    if (
      errMsg.includes("のステーキングの解除処理が完了しました") ||
      errMsg.includes("has been unstaked")
    ) {
      window.location.reload();
    }
  };
  console.log(errMsg);

  return (
    <>
      <div className="cancel-fail-modal-background">
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
export default TeamStakingCancelConfirmModal;
