import React from "react";
import "./TeamStakingConfirmModal.scss";
import { useAddress } from "@thirdweb-dev/react";
import axios from "axios";
const TeamStakingConfirmModal = ({
  language,
  setTeamStakingConfirmModal,
  teamStakingMongzData,
  teamStakingMomoData,
}) => {
  const walletAddress = useAddress();
  const tmhcIds = teamStakingMongzData.id;
  const momoIds = teamStakingMomoData.map((momo) => momo.id);

  console.log("몽즈", tmhcIds);
  console.log("모모아이디", momoIds);
  const postTeamStakingNftList = async () => {
    try {
      const res = await axios.post(
        "https://mongz-api.sevenlinelabs.app/StakeTeam",
        {},
        {
          params: {
            address: walletAddress,
            tmhcIds: JSON.stringify(tmhcIds),
            momoIds: JSON.stringify(momoIds),
          },
        }
      );
      console.log("스테이킹 리스트=========", res);
    } catch (err) {
      console.log("스테이킹 리스트 에러 정보 ==========", err);
    } finally {
    }
  };

  return (
    <div className="modal-background">
      <div className="confirm-modal-background">
        <div className="confirm-modal__text">
          {language === "EN" ? (
            <>
              Mongz X MOMO <br />
              Would you like to proceed <br />
              the team staking?
            </>
          ) : (
            `シングルステークスをご希望ですか？`
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
    </div>
  );
};

export default TeamStakingConfirmModal;
