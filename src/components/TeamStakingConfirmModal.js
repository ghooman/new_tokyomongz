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
  console.log("팀크리모달확정 지갑", walletAddress);
  console.log("팀크리모달확정 몽즈", teamStakingMongzData);
  console.log("팀크리모달확정 모모", teamStakingMomoData);

  const tmhcIds = teamStakingMongzData.id;
  const momoIds = teamStakingMomoData.map((momo) => momo.id);

  console.log("몽즈", tmhcIds);
  console.log("모모아이디", momoIds);
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
        // `https://mongz-api.sevenlinelabs.app/StakeTeam?address=${walletAddress}&tmhcIds=${tmhcIds}&momoIds=${momoIds}`
        {
          params: {
            address: walletAddress,
            tmhcIds: tmhcIds,
            momoIds: JSON.stringify(momoIds),
            // tmhcIds: tmhcIds,
            // address: walletAddress,
            // momoIds: momoIds,
          },
        }
      );
      console.log("스테이킹 리스트=========", res);
      // setStakingData(res.data);
    } catch (err) {
      console.log("스테이킹 리스트 에러 정보 ==========", err);
    } finally {
      console.log("스테이킹 보내는 정보 =======", walletAddress);
      console.log("스테이킹 보내는 정보 =======", tmhcIds);
      console.log("스테이킹 보내는 정보 =======", momoIds);
      console.log(
        "스테이킹 보내는 정보json =======",
        JSON.stringify(walletAddress)
      );

      // setDataStatus(true);
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
