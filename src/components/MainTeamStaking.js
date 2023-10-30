import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/TmhcMain.scss";
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
import mongsDummyData from "../data/tmhcDummyData";
import momoDummyData from "../data/momoDummyData";
import TeamStakingCreateModal from "./TeamStakingCreateModal";
import TeamStakingConfirmModal from "./TeamStakingConfirmModal";

const MainTeamStaking = ({ language, clickStakingMongzData }) => {
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
  const [page, setPage] = useState(1);
  const handlePageChange = (page) => {
    setPage(page);
  };
  // 데이터 15개씩 보이기
  const start = (page - 1) * 15;
  const end = start + 15;

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
    console.log("check", e.target.checked);
    console.log("select data", selectData);
    if (selectData.length === 4 && e.target.checked) {
      alert("팀 스테이킹은 최대 4개까지 모모를 선택 할 수 있습니다");
      return;
    }
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
  console.log("체크된 데이터", selectData);

  // =============== 전체 선택 ====================
  const [selectAll, setSelectAll] = useState(false);

  const handleAllChecked = () => {
    // setIsChecked
    if (isChecked.length === 0) {
      let allIds = nftData
        .slice(start, end)
        .filter((item) => {
          return !stakingData.includes(item.id);
        })
        .map((item) => item.id);
      setIsChecked(allIds);

      let allDatas = nftData
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

  // nft가져오기
  const { contract: importTmhc } = useContract(IMPORT_TMHC_CONTRACT);
  const { contract: mongzContract } = useContract(MONGS_COIN, MzcAbi);

  const walletAddress = useAddress();
  console.log(walletAddress);
  // const {
  //   data: nftData,
  //   isLoading,
  //   error,
  // } = useOwnedNFTs(importTmhc, walletAddress);
  //
  // console.log(nftData);

  //

  const web3 = new Web3(
    new Web3.providers.HttpProvider("https://eth.llamarpc.com")
  );
  const contractAddress = "0xa4057dadA9217A8E64Ee7d469A5A7e7c40B7380f"; // ERC-1155 컨트랙트 주소를 입력합니다.
  // const walletAddress = "0xC25E8566d0E493681fBFF114ff29642feA68b8Ac"; // 지갑 주소를 입력합니다.
  // const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 잔액을 조회할 자산 ID 배열을 입력합니다.
  const tokenIds = Array(10000)
    .fill()
    .map((v, i) => i + 1);

  const contract = new web3.eth.Contract(abi, contractAddress); // ERC-1155 컨트랙트 ABI와 주소를 입력합니다.

  // const nftData2 = [{}];

  const [nftData, setNftData] = useState([]);
  const [momoNftData, setMomoNftData] = useState([]);
  const [teamStakingMomoData, setTeamStakingMomoData] = useState([]);
  const [teamStaking, setTeamStaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (momoNftData) {
      setIsLoading(() => {
        return false;
      });
    } else {
      setIsLoading(() => {
        return true;
      });
    }
  }, [momoNftData]);
  // ================== 스테이킹 리스트 ===============
  const [stakingData, setStakingData] = useState([]);
  console.log("스테이킹 nft 목록 ==========", stakingData);
  // ============== nft 목록 불러오기 / 스테이킹 목록 불러오기 ==========================

  //https://jp.object.ncloudstorage.com/tmhc-meta/106.json

  // ========== 값을 가져왔나 확인 =============
  const [dataStatus, setDataStatus] = useState(false);

  console.log(dataStatus);
  useEffect(() => {
    setNftData(() => {
      return [];
    });

    setIsChecked([]);
    setSelectData([]);

    const fetchNFTs = async () => {
      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/getOwnedMOMO?address=${walletAddress}`
        );
        console.log(res);
        let fetchedNFTs = res.data;
        const fetchedNFTsIds = JSON.stringify(fetchedNFTs);
        console.log(fetchedNFTsIds);
        await getBalanceOfBatch(fetchedNFTsIds);
      } catch (err) {
        console.log(err);
      }
    };
    const getBalanceOfBatch = async (fetchedNFTsIds) => {
      try {
        console.log("페치엔애프티", fetchedNFTsIds);
        const res = await axios.get(
          "https://mongz-api.sevenlinelabs.app/get_metadata_momo",
          {
            params: {
              tokenIds: fetchedNFTsIds, // 배열 nft아이디들
            },
          }
        );
        // 빈객체 제외시키기
        const nonEmptyObjects = res.data.filter(
          (obj) => Object.keys(obj).length > 0
        );
        setMomoNftData(nonEmptyObjects);
        setTeamStakingMomoData(nonEmptyObjects);
      } catch (err) {
        console.log(err);
      }
    };
    // async function getBalanceOfBatch() {
    //   const balances = await contract.methods
    //     .balanceOfBatch(Array(tokenIds.length).fill(walletAddress), tokenIds)
    //     .call(); // balanceOfBatch 함수를 사용하여 지갑의 다수의 자산 ID에 대한 잔액을 일괄적으로 가져옵니다.
    //   // console.log(balances);
    //   const promises = [];

    //   for (let i = 0; i < balances.length; i++) {
    //     if (balances[i] === "1") {
    //       promises.push(
    //         // axios.get("http://127.0.0.1:8000/api/get_json_data", {
    //         axios.get("https://www.tokyo-test.shop/api/get_json_data", {
    //           params: {
    //             id: i + 1,
    //           },
    //         })
    //       );
    //     }
    //     // console.log(promises);
    //   }

    //   Promise.all(promises)
    //     .then((responses) => {
    //       console.log(responses);
    //       const newData = responses.map((res, index) => ({
    //         id: parseInt(res.data.name.slice(5)),
    //         name: res.data.name,
    //         image: res.data.image,
    //       }));
    //       setNftData(newData);
    //       console.log(newData);
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    const getStakingNftList = async () => {
      const data = {
        address: walletAddress, // 현재 지갑
      };
      setDataStatus(false);
      try {
        const res = await axios.post(
          // "https://www.tokyo-test.shop/api/getGStakedTMHCwithVrify",
          // data
          "https://mongz-api.sevenlinelabs.app/getStakedMOMOwithVrify",
          {
            params: {
              address: walletAddress,
            },
          }
        );
        console.log("스테이킹 리스트=========", res);
        setStakingData(res.data);
      } catch (err) {
        console.log("스테이킹 리스트 에러 ==========", err);
      } finally {
        setDataStatus(true);
      }
    };

    const getReward = async () => {
      const data = {
        address: walletAddress, // 현재 지갑
      };
      try {
        const res = await axios.post(
          // 팀스테이킹 주소가 들어가야될꺼 같습니다.
          "https://www.tokyo-test.shop/api/calRewardTMHCBatch",
          data
        );
        setReward(res.data);

        // setNftData(res.data);
        // setTeamStakingMomoData(res.data); 임시
        // setNftData(momoDummyData); 더미 사용
        // 더미사용
        console.log("ㄹ리워드 ==========", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    // getBalanceOfBatch();
    fetchNFTs();
    getStakingNftList();
    getReward();
    setTeamStakingMomoData();
  }, [walletAddress]);

  console.log("nftData==================", nftData);
  console.log("소유한 nft 개수 =============", nftData.length);

  // 스테이킹 된 목록 확인하기
  const { contract: stakingTmhc } = useContract(STAKING_TMHC_CONTRACT);
  // const { data: stakingData, isLoading: stakingDataIsLoading } =
  //   useContractRead(stakingTmhc, "getStakedTMHC", walletAddress);

  // 겟 리워드
  // const { data: rewardData, isLoading: rewardDataIsLoading } = useContractRead(
  //   stakingTmhc,
  //   "calRewardAll",
  //   walletAddress
  // );

  const [reward, setReward] = useState("");
  console.log(reward);
  // useEffect(() => {
  //   if (rewardData) {
  //     const newReward = (parseInt(rewardData._hex, 16) / 10 ** 18).toFixed(4);
  //     setReward(newReward);
  //   }
  // }, [rewardData, walletAddress]);

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

  const [teamStakingModal, setTeamStakingModal] = useState(false);
  const [teamStakingConfirmModal, setTeamStakingConfirmModal] = useState(false);
  return (
    <>
      <div className="tmhc-main-background">
        <div className="tmhc-main-container">
          {nftData.length > 0 ? (
            <>
              <div className="container__texture">
                <div className="mongz-team-img">
                  <img src={clickStakingMongzData.image} alt="mongzimg" />
                </div>
                <span className="texture__main-text">{`Team ${clickStakingMongzData.tmhcName}`}</span>
                {language === "EN" ? (
                  <Link
                    to="https://tmhc-support.notion.site/USERS-GUIDE-51271f936b7b4833b73abe573f37acc7"
                    className="container__btn--user-guide"
                    target="_blank"
                  >
                    User's Guide
                  </Link>
                ) : (
                  <Link
                    to="https://tmhc-support.notion.site/9322957c94ae499c8adc56298832e2f1"
                    className="container__btn--user-guide"
                    target="_blank"
                  >
                    ご利用ガイド
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="container__texture">
                {language === "EN" ? (
                  <p className="texture__main-text">
                    Stake your Tokyo Mongz Hills Club NFT to receive MZC
                  </p>
                ) : (
                  <p className="texture__main-text">
                    TMHC NFTをStakingすることでMZCを獲得することができます
                  </p>
                )}

                {language === "EN" ? (
                  <p className="texture__sub-text">
                    MZC is a utility coin that belongs to the MUC ecosystem.
                  </p>
                ) : (
                  <p className="mongz-team-texture__sub-text">
                    MZCは、MUCエコシステムに属するユーティリティコインです
                  </p>
                )}

                <div className="texture__box">
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
                    className="container__btn--user-guide"
                    target="_blank"
                  >
                    User's Guide
                  </Link>
                ) : (
                  <Link
                    to="https://tmhc-support.notion.site/9322957c94ae499c8adc56298832e2f1"
                    className="container__btn--user-guide"
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
                  <span className="claim__title">Claimable MZC</span>
                ) : (
                  <span className="claim__title">現在のClaim額</span>
                )}
                <div className="claim__coin">
                  <div>
                    <span className="coin-icon">
                      <img src={coinIcon} alt="coin" />
                    </span>
                    {!walletAddress && (
                      <div className="mzc">
                        <span className="coin">Please Connect your Wallet</span>
                      </div>
                    )}

                    {walletAddress && reward !== "" && reward !== 0 && (
                      <div className="mzc">
                        <span className="coin">{reward.toFixed(3)}</span>
                        MZC
                      </div>
                    )}
                    {walletAddress && reward !== "" && reward === 0 && (
                      <div className="mzc">
                        <span className="coin"> No MZC to Claim</span>
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
            </>
          )}
          {/* <div className="input-wallet-box">
    <input
      type="text"
      className="wallet-address"
      onChange={handleInputText}
      value={inputText}
    />
    <button
      className="wallet-address-btn"
      onClick={handleWalletAddress}
    >
      출력
    </button>
  </div> */}

          <div className="container__nft">
            <div className="nft__header">
              <span className="header__title">
                {momoNftData.length > 0
                  ? language === "EN"
                    ? "Select NFT for the team boost. You may select up to 4."
                    : "MOMO NFTを最大４つまで選択してTeam Staking可能です"
                  : "NFT List"}
              </span>
              <div>
                <div className="left__menu">
                  <div className="state-select-box">
                    <button
                      className="btn--state-select"
                      onClick={handleDropdownClick}
                    >
                      {selectedState}
                    </button>
                    <span
                      className="material-symbols-outlined"
                      ref={rotateRef}
                      onClick={handleDropdownClick}
                    >
                      expand_more
                    </span>
                    {isOpen && language === "EN" && (
                      <ul className="state-select-list">
                        <li
                          className="state-item all"
                          onClick={() => handleSelectedItem("All")}
                        >
                          All
                        </li>
                        <li
                          className="state-item staking"
                          onClick={() => handleSelectedItem("Staking")}
                        >
                          Staking
                        </li>
                        <li
                          className="state-item before-staking"
                          onClick={() =>
                            handleSelectedItem("Ready for staking")
                          }
                        >
                          Ready for staking
                        </li>
                      </ul>
                    )}

                    {isOpen && language === "JP" && (
                      <ul className="state-select-list">
                        <li
                          className="state-item all"
                          onClick={() => handleSelectedItem("すべて")}
                        >
                          すべて
                        </li>
                        <li
                          className="state-item staking"
                          onClick={() => handleSelectedItem("Staking中")}
                        >
                          Staking中
                        </li>
                        <li
                          className="state-item before-staking"
                          onClick={() => handleSelectedItem("未Staking")}
                        >
                          未Staking
                        </li>
                      </ul>
                    )}
                  </div>

                  {language === "EN" ? (
                    <span className="header__text">
                      Total :&nbsp;
                      {(selectedState === "All" ||
                        selectedState === "すべて") && (
                        <span className="header__text--qtt">
                          {momoNftData ? momoNftData.length : 0}
                        </span>
                      )}
                      {(selectedState === "Staking" ||
                        selectedState === "Staking中") && (
                        <span className="header__text--qtt">
                          {momoNftData
                            ? momoNftData.filter((item) => {
                                return stakingData.includes(parseInt(item.id));
                              }).length
                            : 0}
                        </span>
                      )}
                      {(selectedState === "Ready for staking" ||
                        selectedState === "未Staking") && (
                        <span className="header__text--qtt">
                          {momoNftData
                            ? momoNftData.filter((item) => {
                                return !stakingData.includes(parseInt(item.id));
                              }).length
                            : 0}
                        </span>
                      )}
                      ea
                    </span>
                  ) : (
                    <span className="header__text">
                      Total :&nbsp;
                      {(selectedState === "All" ||
                        selectedState === "すべて") && (
                        <span className="header__text--qtt">
                          {momoNftData ? momoNftData.length : 0}
                        </span>
                      )}
                      {(selectedState === "Staking" ||
                        selectedState === "Staking中") && (
                        <span className="header__text--qtt">
                          {momoNftData
                            ? momoNftData.filter((item) => {
                                return stakingData.includes(parseInt(item.id));
                              }).length
                            : 0}
                        </span>
                      )}
                      {(selectedState === "Ready for staking" ||
                        selectedState === "未Staking") && (
                        <span className="header__text--qtt">
                          {momoNftData
                            ? momoNftData.filter((item) => {
                                return !stakingData.includes(parseInt(item.id));
                              }).length
                            : 0}
                        </span>
                      )}
                      個
                    </span>
                  )}
                </div>
                <div className="right-menu">
                  {/* {language === "EN" ? (
            <label className="btn-all-select-label">
              <input
                type="checkbox"
                className="btn-all-select"
                onClick={handleAllChecked}
              />
              Select all
            </label>
          ) : (
            <label className="btn-all-select-label">
              <input type="checkbox" className="btn-all-select" />
              全選択
            </label>
          )} */}
                  {language === "EN" ? (
                    isChecked.length <= 0 ? (
                      <button className="btn--all-staking">Team Staking</button>
                    ) : (
                      <button
                        className="btn--all-staking checked"
                        onClick={() => {
                          setTeamStakingModal((prev) => !prev);
                          document.body.style.overflow = "hidden";
                        }}
                      >
                        {momoNftData.length > 0
                          ? "Team Staking"
                          : "Proceed to stake selected NFT"}
                      </button>
                    )
                  ) : isChecked.length <= 0 ? (
                    <button className="btn--all-staking">
                      選択したNFTをStaking
                    </button>
                  ) : (
                    <button
                      className="btn--all-staking checked"
                      onClick={() => {
                        setTeamStakingModal((prev) => !prev);
                        document.body.style.overflow = "hidden";
                      }}
                    >
                      選択したNFTをStaking
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="nft__main">
              {walletAddress === undefined || momoNftData.length === 0 ? (
                (language === "EN" && (
                  <div className="empty-nft">
                    There are no NFTs in possession.
                  </div>
                )) ||
                (language === "JP" && (
                  <div className="empty-nft">
                    There are no NFTs in possession.
                  </div>
                ))
              ) : teamStakingMomoData.length > 0 && dataStatus ? ( // isLoading === false && momoNftData.length > 0
                ((selectedState === "All" || selectedState === "すべて") && (
                  <ul className="main__tmhc-list">
                    {teamStakingMomoData.slice(start, end).map((item) => (
                      <li className="tmhc-item" key={item.id}>
                        {stakingData.includes(parseInt(item.id)) ? null : (
                          <input
                            type="checkbox"
                            className="tmhc-check"
                            checked={isChecked.includes(item.id)}
                            onClick={(e) =>
                              handleChecked(e, item.id, item.image, item.name)
                            }
                          />
                        )}
                        <div className="tmhc-images">
                          <img src={item.image} alt="nft" />
                          <div className="team-staking-momo-box">
                            {/* {teamStakingMomoData.slice(0, 4).map((item) => {
                            return (
                              <div className="team-staking-momo-img">
                                <div className="momo-rating">UR</div>
                                <img src={item.image} alt="image" />
                              </div>
                            );
                          })} */}
                          </div>
                        </div>
                        {/* stakingData.includes(parseInt(item.id) */}

                        <div className="tmhc-info">
                          <span className="tmhc-name">{item.name}</span>
                          <span className="mongz-team-staking-text">
                            BOOST <span>560%</span>
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )) ||
                ((selectedState === "Staking" ||
                  selectedState === "Staking中") && (
                  <ul className="main__tmhc-list">
                    {momoNftData
                      .filter((item) => {
                        return stakingData.includes(parseInt(item.id));
                      })
                      .slice(start, end)
                      .map((item) => (
                        <li className="tmhc-item" key={item.id}>
                          <div className="tmhc-images">
                            <img src={item.image} alt="nft" />
                          </div>

                          <div className="tmhc-info">
                            <span className="tmhc-name">{item.name}</span>
                            <span className="tmhc-staking-state now-staking">
                              Now Staking
                            </span>
                            <button
                              className="btn-cancel-staking"
                              onClick={() =>
                                handleCancelStakingModal(
                                  item.image,
                                  item.id,
                                  item.name
                                )
                              }
                            >
                              Cancel Staking
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                )) ||
                ((selectedState === "Ready for staking" ||
                  selectedState === "未Staking") && (
                  <ul className="main__tmhc-list">
                    {momoNftData

                      .filter((item) => {
                        return !stakingData.includes(parseInt(item.id));
                      })
                      .slice(start, end)
                      .map((item) => (
                        <li className="tmhc-item" key={item.id}>
                          <input
                            type="checkbox"
                            className="tmhc-check"
                            onClick={(e) =>
                              handleChecked(e, item.id, item.image, item.name)
                            }
                          />
                          <div className="tmhc-images">
                            <img src={item.image} alt="nft" />
                          </div>
                          <div className="tmhc-info">
                            <span className="tmhc-name">{item.name}</span>
                            <span className="tmhc-staking-state">
                              Ready for Staking
                            </span>

                            <button
                              className="btn--staking"
                              onClick={() =>
                                handleStakingModal(
                                  item.image,
                                  item.name,
                                  item.id
                                )
                              }
                            >
                              Single Staking
                            </button>
                          </div>
                        </li>
                      ))}
                  </ul>
                ))
              ) : (
                <div className="loading">Now loading...</div>
              )}

              {momoNftData === undefined ? null : (
                <div className="pagination-box">
                  <Pagination
                    // 현재 보고있는 페이지
                    activePage={page}
                    // 한페이지에 출력할 아이템수
                    itemsCountPerPage={15}
                    // 총 아이템수
                    totalItemsCount={
                      selectedState === "Staking" ||
                      selectedState === "Staking中"
                        ? momoNftData.filter((item) => {
                            return stakingData.includes(parseInt(item.id));
                          }).length
                        : selectedState === "Ready for staking" ||
                          selectedState === "未Staking"
                        ? momoNftData.filter((item) => {
                            return !stakingData.includes(parseInt(item.id));
                          }).length
                        : momoNftData
                        ? momoNftData.length
                        : 0
                    }
                    // 표시할 페이지수
                    pageRangeDisplayed={5}
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
      </div>
      {teamStakingModal && (
        <TeamStakingCreateModal
          teamStakingMongzData={clickStakingMongzData}
          teamStakingMomoData={selectData}
          setTeamStakingModal={setTeamStakingModal}
          setTeamStakingConfirmModal={setTeamStakingConfirmModal}
        />
      )}
      {teamStakingConfirmModal && (
        <TeamStakingConfirmModal
          language={language}
          setTeamStakingConfirmModal={setTeamStakingConfirmModal}
        />
      )}
    </>
  );
};

export default MainTeamStaking;
