import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Team.scss";
import coinIcon from "../assets/images/mzc-coin-icon.png";
import ClaimModal from "../components/ClaimModal";
import Nav from "../components/Nav";
import Pagination from "react-js-pagination";
import StakingModal from "../components/StakingModal";
import CancelStakingModal from "../components/CancelStakingModal";
import { ethers } from "ethers";
import abi from "../contract/newAbi";
import MzcAbi from "../contract/MzcAbi";

import {
  setSelectedState,
  setIsOpen,
  setClaimModal,
  setStakingModal,
  setCancelStakingModal,
} from "../store";

import {
  IMPORT_TMHC_CONTRACT,
  STAKING_TMHC_CONTRACT,
  MONGS_COIN,
} from "../contract/contractAddress";

import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import Web3 from "web3";
import axios from "axios";
import AndIcon from "../assets/images/and-icon.svg";
import TeamStakingCancelModal from "../components/TeamStakingCancelModal";
import TeamStakingCancelConfirmModal from "../components/TeamStakingCancelConfirmModal";

const Team = ({ language }) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const dispatch = useDispatch();
  // 드랍다운 보이기 / 안보이기
  const rotateRef = useRef();
  const isOpen = useSelector((state) => state.isOpen.isOpen);
  const handleDropdownClick = () => {
    dispatch(setIsOpen(!isOpen));
    rotateRef.current.style.transform = isOpen ? "" : "rotate(-180deg)";
  };

  // 드랍다운 아이템 선택시 글자변경
  const selectedState = useSelector((state) => state.selectedState.title);
  const handleSelectedItem = (text) => {
    dispatch(setSelectedState(text));
    dispatch(setIsOpen(!isOpen));
    setPage(1);
    setIsChecked([]);
    setSelectData([]);
    rotateRef.current.style.transform = "";
  };

  // 언어 변경시 셀렉트 박스 영어 또는 일본어 변경
  useEffect(() => {
    if (language === "JP") {
      dispatch(setSelectedState("すべて"));
    } else {
      dispatch(setSelectedState("All"));
    }
  }, [language, dispatch]);

  // 클레임 모달
  const claimModal = useSelector((state) => state.claimModal.showClaim);
  const handleClaimModal = () => {
    dispatch(setClaimModal(!claimModal));
    document.body.style.overflow = "hidden";
  };

  // 페이지네이션
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(queryPage ? parseInt(queryPage, 10) : 1);
  const navigate = useNavigate();
  const handlePageChange = (page) => {
    setPage(page);
    navigate(`?page=${page}`);
  };

  // 임시 5개씩 보이기
  const start = (page - 1) * 1;
  const end = start + 1;

  // 스테이킹 버튼 클릭시 데이터 저장하는 state
  const [selectData, setSelectData] = useState([]);

  // 스테이킹 모달
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleStakingModal = (image, name, id) => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
    setSelectData([{ image: image, name: name, id: id }]);
  };

  // 스테이킹 모달 여러개
  const handleAllStakingModal = () => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
  };

  // 스테이킹 취소 모달
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );
  const handleCancelStakingModal = (image, id, name) => {
    dispatch(setCancelStakingModal(!cancelStakingModal));
    document.body.style.overflow = "hidden";
    setSelectData([{ image: image, name: name, id: id }]);
  };

  // ===================== 체크 확인
  const [isChecked, setIsChecked] = useState([]);
  // =============== 체크박스 관리
  const handleChecked = (e, id, image, name) => {
    e.stopPropagation();
    console.log(e);
    const targetChecked = e.target.checked;
    if (targetChecked && isChecked.length >= 15) {
      // 선택 개수 제한
      e.preventDefault();
      if (language === "EN") {
        alert("You can only select up to 15.");
      } else {
        alert("最大15個まで選択できます。");
      }
      return;
    }
    if (e.target.checked) {
      setIsChecked([...isChecked, id]);
      const newData = selectData.filter((el) => el.id !== id);
      setSelectData(
        [...newData, { image: image, name: name, id: id }].sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
      setSelectData(selectData.filter((el) => el.id !== id));
    }
  };
  console.log("체크된 nft===========", isChecked);

  // =============== 전체 선택 ====================
  const [selectAll, setSelectAll] = useState(false);

  const handleAllChecked = () => {
    // setIsChecked
    if (isChecked.length === 0) {
      let allIds = teamStakingData
        .slice(start, end)
        .filter((item) => {
          return !stakingData.includes(item.id);
        })
        .map((item) => item.id);
      setIsChecked(allIds);

      let allDatas = teamStakingData
        .slice(start, end)
        .filter((item) => {
          return !stakingData.includes(item.id);
        })
        .map((item) => {
          return { image: item.image, name: item.name, id: item.id };
        });

      setSelectData(allDatas);
    } else {
      setIsChecked([]);
    }
  };
  ///////////////////////////////////////////////////////////////////////////////

  const walletAddress = useAddress();

  // ================== 스테이킹 리스트 ===============
  const [stakingData, setStakingData] = useState([]);
  const [teamStakingData, setTeamStakingData] = useState([]);
  const [newTeamStakingData, setNewTeamStakingData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ============== nft 목록 불러오기 / 스테이킹 목록 불러오기 ==========================
  // nft가져오기
  const { contract: importTmhc } = useContract(IMPORT_TMHC_CONTRACT);
  const { contract: mongzContract } = useContract(MONGS_COIN, MzcAbi);
  // ========== 값을 가져왔나 확인 =============
  const [dataStatus, setDataStatus] = useState(false);

  console.log(dataStatus);
  useEffect(() => {
    // setTeamStakingData(() => {
    //   return [];
    // });

    setIsChecked([]);
    setSelectData([]);

    // 팀스테이킹 데이터 가져오기
    const getTeamStakingData = async () => {
      // setDataStatus(false);

      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/getStakedTEAMWithVrify?address=${walletAddress}`
        );
        console.log("팀스테이킹 리스트=========", res.data[1]);
        const fetchTeamStakingList = res.data[1];
        const momoNftIds = [].concat(
          ...fetchTeamStakingList.map((item) => item.member)
        );
        console.log(momoNftIds);
        const tmhcNftIds = [].concat(
          ...fetchTeamStakingList.map((item) => item.leader)
        );
        console.log(tmhcNftIds);
        // setTeamStakingNftList(fetchTeamStakingList);

        await getTeamStakingMomoData(
          momoNftIds,
          tmhcNftIds,
          fetchTeamStakingList
        );
      } catch (err) {
        console.log("팀스테이킹 리스트 에러 ==========", err);
      } finally {
        // setDataStatus(true);
      }
    };
    // 모모 데이터 가져오기
    const getTeamStakingMomoData = async (
      momoNftIds,
      tmhcNftIds,
      fetchTeamStakingList
    ) => {
      try {
        const res = await axios.get(
          "https://mongz-api.sevenlinelabs.app/get_metadata_momo",
          {
            params: {
              tokenIds: JSON.stringify(momoNftIds), // 배열 nft아이디들
            },
          }
        );

        const changeMomoData = fetchTeamStakingList.map((item) => {
          return {
            ...item,
            member: item.member.map((id) =>
              res.data.find((member) => member.id === id)
            ),
          };
        });
        await getTeamStakingTmhcData(tmhcNftIds, changeMomoData);
      } catch (err) {
        console.log(err);
      }
    };

    // 도쿄몽즈 데이터 가져오기
    const getTeamStakingTmhcData = async (tmhcNftIds, changeMomoData) => {
      try {
        const res = await axios.get(
          "https://mongz-api.sevenlinelabs.app/get_metadata_tmhc",
          {
            params: {
              tokenIds: JSON.stringify(tmhcNftIds),
            },
          }
        );

        console.log("겟도쿄", res);

        const newData = res.data.map((item, index) => ({
          id: parseInt(item.name.slice(5)),
          name: item.name,
          image: item.image,
        }));
        console.log("뉴데이터", newData);
        console.log(changeMomoData);

        const finalStakingNftData = changeMomoData.map((item) => {
          return {
            ...item,
            leader: newData.find(
              (newDataItem) => newDataItem.id === item.leader
            ),
          };
        });
        //
        setTeamStakingData(newData); //tmhc의 정보들을 저장하며 이정보로 tmhc.id와팀스테이킹리더를 비교하는데 사용됩니다.
        setNewTeamStakingData(finalStakingNftData);
        setIsLoading(false);
      } catch (err) {
        console.log("도쿄에러", err);
        setIsLoading(false);
      } finally {
        // setIsLoading(false);
      }
    };

    const getReward = async () => {
      const data = {
        address: walletAddress, // 현재 지갑
      };
      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/calRewardTeamBatch?address=${walletAddress}`,
          {}
        );
        setReward(res.data);
        console.log("ㄹ리워드 ==========", res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getTeamStakingData();
    getReward();
    // setIsLoading(false);
  }, [walletAddress]);

  const [reward, setReward] = useState("");
  console.log(reward);
  // add mzc
  const addTokenToWallet = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const tokenContract = new ethers.Contract(
          MONGS_COIN,
          ["function symbol() view returns (string)"],
          signer
        );
        const symbol = await tokenContract.symbol();
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: MONGS_COIN,
              symbol: "MZC",
              decimals: 18,
              // image: 'https://gateway.ipfscdn.io/ipfs/QmZEaxyuHz8bTMfh8f5FD2TAm65Q7DxaycN4vcQEovCyxM/slg-logo.png',
            },
          },
        });
      } else {
        console.error("MetaMask is not installed");
      }
    } catch (error) {
      console.error(error);
    }
  };
  // mongz coin balance
  const { data: mzcBalanceData, isLoading: mczBalance } = useContractRead(
    mongzContract,
    "balanceOf",
    walletAddress
  );

  const mzcBalance = mzcBalanceData
    ? (parseInt(mzcBalanceData._hex, 16) / 10 ** 18).toFixed(2)
    : undefined;
  // 팀 스테이킹 취소,컨펌 상태 / 함수 입니다.
  const [teamStakingCancelModal, setTeamStakingCancelModal] = useState(false);
  const [teamStakingCancelConfirmModal, setTeamStakingCancelConfirmModal] =
    useState(false);
  const handleCancelTeamStakingModal = (
    image,
    id,
    name,
    teamStakingNftData
  ) => {
    document.body.style.overflow = "hidden";
    setTeamStakingCancelModal((prev) => !prev);
    setSelectData([
      {
        image: image,
        name: name,
        id: id,
        teamStakingNftData: teamStakingNftData,
      },
    ]);
  };
  // 모모 등급 표시
  const getGradeNameForValue = (value) => {
    switch (value) {
      case "C":
        return "grade-C";
      case "R":
        return "grade-R";
      case "SR":
        return "grade-SR";
      case "UR":
        return "grade-UR";
      default:
        return "";
    }
  };
  // 모모 등급에 따른 부스팅 수치
  const getGradeNameForPercent = (value) => {
    switch (value) {
      case "C":
        return 10;
      case "R":
        return 30;
      case "SR":
        return 100;
      case "UR":
        return 300;
      default:
        return "";
    }
  };
  // 스테이킹 처리로 보여지는 팀스테이킹 갯수가 0되었다면 page 숫자를 이전페이지로 이동시킵니다.
  useEffect(() => {
    if (isLoading || newTeamStakingData.length === 0) return;
    // 현재 상태와 페이지에 출력되는 몽즈들을 파악합니다.
    const itemsInCurrentPage = newTeamStakingData.slice(start, end);
    // 현재 페이지에 몽즈가 없을 경우
    if (page > 1 && itemsInCurrentPage.length === 0) {
      const newPage = page - 1;
      setPage(newPage);
      const searchParams = new URLSearchParams(location.search);
      searchParams.set("page", newPage.toString());
      navigate(`?${searchParams.toString()}`, { replace: true });
    }
    console.log("현재 페이지에 출력되는 아이템", itemsInCurrentPage);
  }, [
    page,
    selectedState,
    stakingData,
    newTeamStakingData,
    navigate,
    location.search,
  ]);
  return (
    <>
      <Nav />
      <div className="team-main-background">
        <div className="team-main-container">
          <div className="team-main__container-texture">
            {language === "EN" ? (
              <p className="container-texture__main-text">
                Team up TMHC & MOMO NFT together to stake and receive MZC
              </p>
            ) : (
              <p className="container-texture__main-text">
                TMHC NFTとPEACHz. MOMO NFTをセットでTeam
                StakingすることでMZCを獲得できます
              </p>
            )}

            {language === "EN" ? (
              <p className="container-texture__sub-text">
                MZC is a utility coin that belongs to the MUC ecosystem.
              </p>
            ) : (
              <p className="container-texture__sub-text">
                MZCは、MUC エコシステムに属するユーティリティコインです
              </p>
            )}

            <div className="container-texture__box">
              {language === "EN" ? (
                <Link to="https://multiuniversecentral.io/" target="_blank">
                  About MUC Ecosystem
                </Link>
              ) : (
                <Link to="https://multiuniversecentral.io/" target="_blank">
                  MUCエコシステムについて
                </Link>
              )}
              {language === "EN" ? (
                <Link
                  to="https://commseed.gitbook.io/multi-universe-central-muc/"
                  target="_blank"
                >
                  MUC White Paper
                </Link>
              ) : (
                <Link
                  to="https://commseed.gitbook.io/multi-universe-central-muc/"
                  target="_blank"
                >
                  MUCホワイトペーパー
                </Link>
              )}
            </div>
            {language === "EN" ? (
              <Link
                to="https://tmhc-support.notion.site/USERS-GUIDE-51271f936b7b4833b73abe573f37acc7"
                className="container-texture__btn--user-guide"
                target="_blank"
              >
                User's Guide
              </Link>
            ) : (
              <Link
                to="https://tmhc-support.notion.site/9322957c94ae499c8adc56298832e2f1"
                className="container-texture__btn--user-guide"
                target="_blank"
              >
                ご利用ガイド
              </Link>
            )}
          </div>
          <div className="current-balance">
            <span className="current-balance__title">Your Balance</span>
            <span className="current-balance__mzc">
              {mzcBalance}
              <span className="mzc">&nbsp;MZC</span>
            </span>
            <button className="btn-mzc" onClick={addTokenToWallet}>
              Add MZC MetaMask
            </button>
          </div>
          <div className="container__claim">
            {language === "EN" ? (
              <span className="claim__title">
                Team Single Staking Claimable MZC
              </span>
            ) : (
              <span className="claim__title">
                Team Single StakingのClaim可能額
              </span>
            )}
            <div className="claim__coin">
              <div>
                <span className="coin-icon">
                  <img src={coinIcon} alt="coin" />
                </span>
                {walletAddress ? (
                  reward !== "" ? (
                    reward !== 0 ? (
                      <div className="mzc">
                        <span className="coin">{reward.toFixed(3)}</span>
                        MZC
                      </div>
                    ) : (
                      <div className="mzc">
                        <span className="coin"> No MZC to Claim</span>
                      </div>
                    )
                  ) : null
                ) : (
                  <div className="mzc">
                    <span className="coin">Please Connect your Wallet</span>
                  </div>
                )}
              </div>
              <button
                type="button"
                className="btn-claim"
                onClick={handleClaimModal}
              >
                Claim
              </button>
            </div>
          </div>

          <div className="container__nft">
            <div className="nft__header">
              <span className="header__title">
                Tokyo Mongz Hills Club X MOMO Team Staking
              </span>

              <span className="header__text">
                Total :&nbsp;
                {(selectedState === "All" || selectedState === "すべて") && (
                  <span className="header__text--qtt">
                    {teamStakingData ? teamStakingData.length : 0}
                  </span>
                )}
                {(selectedState === "Staking" ||
                  selectedState === "Staking中") && (
                  <span className="header__text--qtt">
                    {teamStakingData
                      ? teamStakingData.filter((item) => {
                          return stakingData.includes(parseInt(item.id));
                        }).length
                      : 0}
                  </span>
                )}
                {(selectedState === "Ready for staking" ||
                  selectedState === "未Staking") && (
                  <span className="header__text--qtt">
                    {teamStakingData
                      ? teamStakingData.filter((item) => {
                          return !stakingData.includes(parseInt(item.id));
                        }).length
                      : 0}
                  </span>
                )}
                {language === "EN" ? "ea" : "個"}
              </span>
            </div>
            <div className="nft__main">
              {isLoading ? (
                <div className="loading">Now loading...</div>
              ) : walletAddress === undefined ||
                newTeamStakingData.length === 0 ? (
                <div className="empty-nft">
                  There are no NFTs in possession.
                </div>
              ) : // 만약 지갑이 연결되있고,NFT 1개이상 보유하고있다면 팀스테이킹 데이터를 출력합니다.
              newTeamStakingData && newTeamStakingData.length > 0 ? (
                <>
                  {newTeamStakingData.slice(start, end).map((team) => (
                    <div className="main__team-item-box">
                      <div className="main__team-item-top">
                        <div className="main__team-item-text">
                          <span className="main__team-item-title">
                            {team.leader.name}
                          </span>
                          {/* 임시 이벤트 기간에는 텍스트출력이 다릅니다. */}
                          <span className="main__team-item-total-percent">
                            EVENT (DEFAULT
                            <span className="main__team-item-percent">
                              &nbsp;100%&nbsp;
                            </span>
                            + BOOST&nbsp;
                            <span className="main__team-item-percent">
                              {Math.round(team.reward[1] * 100)}%
                            </span>
                            ) X 2
                          </span>
                          <span className="main__team-item-day-percent">
                            Default {team.rewardPerDay[0]}MZC/Day + BOOST{" "}
                            {team.rewardPerDay[1]}/Day =&nbsp;
                            <span className="main__team-item-percent">
                              {team.rewardPerDay[2]} / DAY
                            </span>{" "}
                            * 2(EVENT)
                          </span>
                        </div>
                        <div className="main__team-item-btn-box">
                          <button
                            className="main__team-item-cancel-btn"
                            onClick={() =>
                              handleCancelTeamStakingModal(
                                team.leader.image,
                                team.leader.id,
                                team.leader.name,
                                newTeamStakingData
                              )
                            }
                          >
                            Cancel Team Staking
                          </button>
                        </div>
                      </div>
                      <div className="main__team-item-bottom">
                        <div
                          className={`main__team-item-mongz-box ${
                            team.member.length >= 4 ? "main-item__bonus" : ""
                          }`}
                        >
                          <div className="main__team-item-mongz-img">
                            <img src={team.leader.image} alt="mongzImg" />
                          </div>
                          <span className="main__team-item-mongz-title">
                            {team.leader.name}
                          </span>
                          <span>100%</span>
                        </div>
                        <div className="main__team-item-and-icon">
                          <img src={AndIcon} alt="andIcon" />
                        </div>
                        <div className="main__team-item-momo-box-top">
                          <div className="main__team-item-momo-box-container">
                            {team.member.map((member) => (
                              <div className="main__team-item-momo-box">
                                <div className="main__team-item-momo-img">
                                  <div
                                    className={`momo-rating ${getGradeNameForValue(
                                      member.rank
                                    )}`}
                                  >
                                    {member.rank}
                                  </div>
                                  <img src={member.image} alt="momoImg" />
                                </div>
                                <span className="main__team-item-momo-title">
                                  {member.name}
                                </span>
                                <span>
                                  +{getGradeNameForPercent(member.rank)}%
                                </span>
                              </div>
                            ))}
                          </div>
                          {team.member.length >= 4 ? (
                            <p className="momo-item__bonus"> Bonus Boost 20%</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="loading">Now loading...</div>
              )}

              {teamStakingData === undefined ? null : (
                <div className="pagination-box">
                  <Pagination
                    // 현재 보고있는 페이지
                    activePage={page}
                    // 한페이지에 출력할 아이템수
                    itemsCountPerPage={1}
                    // 총 아이템수
                    totalItemsCount={
                      selectedState === "Staking" ||
                      selectedState === "Staking中"
                        ? teamStakingData.filter((item) => {
                            return stakingData.includes(parseInt(item.id));
                          }).length
                        : selectedState === "Ready for staking" ||
                          selectedState === "未Staking"
                        ? teamStakingData.filter((item) => {
                            return !stakingData.includes(parseInt(item.id));
                          }).length
                        : teamStakingData
                        ? teamStakingData.length
                        : 0
                    }
                    // 표시할 페이지수
                    pageRangeDisplayed={8}
                    prevPageText={"‹"}
                    nextPageText={"›"}
                    // 함수
                    onChange={handlePageChange}
                  ></Pagination>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 클레임 모달 */}
        {claimModal && (
          <ClaimModal
            language={language}
            reward={reward}
            claimType="teamClaim"
          />
        )}
        {/* 팀 스테이킹 취소 모달 */}
        {teamStakingCancelModal && (
          <TeamStakingCancelModal
            language={language}
            setTeamStakingCancelModal={setTeamStakingCancelModal}
            setTeamStakingCancelConfirmModal={setTeamStakingCancelConfirmModal}
            selectData={selectData}
          />
        )}
        {/* 팀 스테이킹 취소 확정 모달 */}
        {teamStakingCancelConfirmModal && (
          <TeamStakingCancelConfirmModal
            language={language}
            setTeamStakingCancelConfirmModal={setTeamStakingCancelConfirmModal}
            selectData={selectData}
          />
        )}
      </div>
    </>
  );
};

export default Team;
