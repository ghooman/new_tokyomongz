import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Momo.scss";
import coinIcon from "../assets/images/mzc-coin-icon.png";
import ClaimModal from "../components/ClaimModal";
import Nav from "../components/Nav";
import Pagination from "react-js-pagination";
import StakingModal from "../components/StakingModal";
import CancelStakingModal from "../components/CancelStakingModal";
import { ethers } from "ethers";
import momoAbi from "../contract/momoAbi";
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
  IMPORT_MOMO_CONTRACT,
} from "../contract/contractAddress";

import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useContractRead,
} from "@thirdweb-dev/react";
import Web3 from "web3";
import axios from "axios";
import momoDummyData from "../data/momoDummyData";
import MoveTeamPageModal from "../components/MoveTeamPageModal";

const Momo = ({ language }) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const dispatch = useDispatch();

  // 스테이킹 상태 드랍다운 보이기 / 안보이기
  const rotateRef = useRef();
  const isOpen = useSelector((state) => state.isOpen.isOpen);
  const handleDropdownClick = () => {
    dispatch(setIsOpen(!isOpen));
    rotateRef.current.style.transform = isOpen ? "" : "rotate(-180deg)";
  };

  // 스테이킹 상태 드랍다운 아이템 선택시 글자변경
  const selectedState = useSelector((state) => state.selectedState.title);
  const handleSelectedItem = (text) => {
    dispatch(setSelectedState(text));
    dispatch(setIsOpen(!isOpen));
    setPage(1);
    setIsChecked([]);
    setMomoSelectData([]);
    rotateRef.current.style.transform = "";
  };
  // 등급 드롭다운 보이기
  const gradeRef = useRef();
  const [gradeIsOpen, setGradeIsOpen] = useState(false);
  const [gradeState, setGradeState] = useState("All");
  console.log("그레이드상태", gradeState);
  // 등급 필터링 목록 드랍다운 보이기 / 안보이기
  const handleGradeDropdownClick = () => {
    setGradeIsOpen(!gradeIsOpen);
    gradeRef.current.style.transform = gradeIsOpen ? "" : "rotate(-180deg)";
  };
  // 등급 클릭했을경우
  const handleSelectedGrade = (text) => {
    setPage(1);
    setIsChecked([]);
    setMomoSelectData([]);
    setGradeState(text);
    setGradeIsOpen(!gradeIsOpen);
    gradeRef.current.style.transform = gradeIsOpen ? "" : "rotate(-180deg)";
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
  const [momoSelectData, setMomoSelectData] = useState([]);
  // 싱글 스테이킹 상태를 판단합니다.
  const [isSingleStaking, setIsSingleStaking] = useState(true);
  // 스테이킹 모달
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleStakingModal = (image, name, id) => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
    setIsSingleStaking(true); // 싱글 스테이킹인지 확인하고
    setIsChecked([]); // 체크드 선택된걸 다 풀어버립니다.
    setMomoSelectData([{ image: image, name: name, id: id }]);
  };

  // 스테이킹 모달 여러개
  const handleAllStakingModal = () => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
    setIsSingleStaking(false); // 멀티 스테이킹일 경우
    // 체크한 것들만 selected에 다시담아 보내줍니다.
    const newSelectData = isChecked.map((id) => {
      const item = momoNftData.find((nftItem) => nftItem.id === id);
      return { image: item.image, name: item.name, id: item.id };
    });
    setMomoSelectData(newSelectData);
  };

  // 스테이킹 취소 모달
  const cancelStakingModal = useSelector(
    (state) => state.cancelStakingModal.cancelStakingModal
  );
  const handleCancelStakingModal = (image, id, name) => {
    dispatch(setCancelStakingModal(!cancelStakingModal));
    document.body.style.overflow = "hidden";
    setMomoSelectData([{ image: image, name: name, id: id }]);
  };
  // 팀 스테이킹 이동 안내 모달
  const [openMoveTeamModal, setOpenMoveTeamModal] = useState(false);
  const handleMoveTeamModal = (id, name) => {
    document.body.style.overflow = "hidden";
    setOpenMoveTeamModal((prev) => !prev);
    setMomoSelectData([{ name: name, id: id }]);
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
      const newData = momoSelectData.filter((el) => el.id !== id);
      setMomoSelectData(
        [...newData, { image: image, name: name, id: id }].sort((a, b) => {
          return a.id - b.id;
        })
      );
    } else {
      setIsChecked(isChecked.filter((el) => el !== id));
      setMomoSelectData(momoSelectData.filter((el) => el.id !== id));
    }
  };
  console.log("체크된 nft===========", isChecked);

  // =============== 전체 선택 ====================
  const [selectAll, setSelectAll] = useState(false);

  const handleAllChecked = () => {
    // setIsChecked
    if (isChecked.length === 0) {
      let allIds = momoNftData
        .slice(start, end)
        .filter((item) => {
          return !stakingData.includes(item.id);
        })
        .map((item) => item.id);
      setIsChecked(allIds);

      let allDatas = momoNftData
        .slice(start, end)
        .filter((item) => {
          return !stakingData.includes(item.id);
        })
        .map((item) => {
          return { image: item.image, name: item.name, id: item.id };
        });

      setMomoSelectData(allDatas);
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

  // const web3 = new Web3(
  //   new Web3.providers.HttpProvider("https://rpc.ankr.com/polygon_mumbai")
  // );

  const [web3] = useState(
    new Web3(
      "https://polygon-mumbai.g.alchemy.com/v2/Aw34ElrsBekaC9bb92GToq__ySCNKoSj"
    )
  );
  const [momoNfts, setMomoNfts] = useState([]);

  const contractAddress = IMPORT_MOMO_CONTRACT; // ERC-1155 컨트랙트 주소를 입력.
  // const walletAddress = "0xC25E8566d0E493681fBFF114ff29642feA68b8Ac"; // 지갑 주소를 입력.
  // const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 잔액을 조회할 자산 ID 배열을 입력.
  const tokenIds = Array(10000)
    .fill()
    .map((v, i) => i + 1);

  const contract = new web3.eth.Contract(momoAbi, contractAddress);

  // const nftData2 = [{}];

  const [momoNftData, setMomoNftData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ================== 스테이킹 리스트 ===============
  const [stakingData, setStakingData] = useState([]);
  const [teamStakingData, setTeamStakingData] = useState([]);
  // ============== nft 목록 불러오기 / 스테이킹 목록 불러오기 ==========================

  //https://jp.object.ncloudstorage.com/tmhc-meta/106.json

  // ========== 값을 가져왔나 확인 =============
  const [dataStatus, setDataStatus] = useState(false);

  console.log(dataStatus);
  useEffect(() => {
    setMomoNftData(() => {
      return [];
    });

    setIsChecked([]);
    setMomoSelectData([]);

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
      setIsLoading(true);
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
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    // 스테이킹 된 nft 가져오기
    const getStakingNftList = async () => {
      setDataStatus(false);
      try {
        const res = await axios.get(
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

    // 팀스테이킹 된 nft id 가져오기
    const getTeamStakingNftList = async () => {
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
        setTeamStakingData(momoNftIds);
        // setTeamStakingNftList(fetchTeamStakingList);
      } catch (err) {
        console.log("팀스테이킹 리스트 에러 ==========", err);
      } finally {
        // setDataStatus(true);
      }
    };

    const getReward = async () => {
      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/calRewardMOMOBatchWithAddress?address=${walletAddress}`,
          {}
        );
        setReward(res.data);
        console.log("ㄹ리워드 ==========", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchNFTs();
    getStakingNftList();
    getTeamStakingNftList();
    // getBalanceOfBatch();
    getReward();
  }, [walletAddress]);

  console.log("nftData==================", momoNftData);

  const [reward, setReward] = useState("");
  // 클릭한 등급에 따른 모모 리스트
  const filteredMomoNftData = momoNftData.filter((item) => {
    console.log("@@@@그레이드상태", gradeState);
    console.log("아이템랭크", item.rank);
    if (gradeState === "All") {
      return true;
    }
    return item.rank === gradeState;
  });
  console.log("상태1", filteredMomoNftData);
  console.log("상태2", stakingData);
  console.log("상태3", teamStakingData);

  return (
    <>
      <Nav />
      <div className="momo-main-background">
        <div className="momo-main-container">
          <div className="momo-container__texture">
            {language === "EN" ? (
              <p className="momo-texture__main-text">
                Stake your PEACHz. MOMO NFT to receive MZC
              </p>
            ) : (
              <p className="momo-texture__main-text">
                PEACHz. MOMO NFTをStakingすることでMZCを獲得することができます
                Staking中のMOMO NFTはTEAM Staikingに使用することはできません
              </p>
            )}

            {language === "EN" ? (
              <p className="momo-texture__sub-text">
                MZC is a utility coin that belongs to the MUC ecosystem.
              </p>
            ) : (
              <p className="momo-texture__sub-text">
                MZCは、MUC エコシステムに属するユーティリティコインです
              </p>
            )}

            <div className="momo-texture__box">
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
                className="momo-container__btn--user-guide"
                target="_blank"
              >
                User's Guide
              </Link>
            ) : (
              <Link
                to="https://tmhc-support.notion.site/9322957c94ae499c8adc56298832e2f1"
                className="momo-container__btn--user-guide"
                target="_blank"
              >
                ご利用ガイド
              </Link>
            )}
          </div>

          {/* <div className="current-balance">
            <span className="current-balance__title">Your Balance</span>
            <span className="current-balance__mzc">
              {mzcBalance}
              <span className="mzc">&nbsp;MZC</span>
            </span>
            <button className="btn-mzc" onClick={addTokenToWallet}>
              Add MZC MetaMask
            </button>
          </div> */}

          <div className="momo-container__claim">
            {language === "EN" ? (
              <span className="momo-claim__title">Claimable MZC</span>
            ) : (
              <span className="momo-claim__title">現在のClaim額</span>
            )}
            <div className="momo-claim__coin">
              <div>
                <span className="momo-coin-icon">
                  <img src={coinIcon} alt="momo-coin" />
                </span>
                <div className="momo-mzc">
                  <span className="momo-coin">
                    {walletAddress
                      ? reward !== "" && reward !== 0
                        ? `${reward.toFixed(3)}  MZC`
                        : "No MZC to Claim"
                      : "Please Connect your Wallet"}
                  </span>
                </div>
              </div>
              <button
                type="button"
                className="momo-btn-claim"
                onClick={handleClaimModal}
              >
                Claim
              </button>
            </div>
          </div>
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

          <div className="momo-container__nft">
            <div className="momo-nft__header">
              <span className="momo-header__title">NFT List</span>
              <div>
                <div className="momo-left__menu">
                  {/* 등급 필터링  드롭다운*/}
                  <div className="momo-state-select-box momo-grade-select-box">
                    <button
                      className="momo-btn--state-select"
                      onClick={handleGradeDropdownClick}
                    >
                      {gradeState}
                    </button>
                    <span
                      className="material-symbols-outlined"
                      ref={gradeRef}
                      onClick={handleGradeDropdownClick}
                    >
                      expand_more
                    </span>
                    {gradeIsOpen ? (
                      <ul className="momo-state-select-list">
                        <li
                          className="momo-state-item all"
                          onClick={() => handleSelectedGrade("All")}
                        >
                          All
                        </li>
                        <li
                          className="momo-state-item all"
                          onClick={() => handleSelectedGrade("UR")}
                        >
                          UR
                        </li>
                        <li
                          className="momo-state-item staking"
                          onClick={() => handleSelectedGrade("SR")}
                        >
                          SR
                        </li>
                        <li
                          className="momo-state-item before-staking"
                          onClick={() => handleSelectedGrade("R")}
                        >
                          R
                        </li>
                        <li
                          className="momo-state-item before-staking"
                          onClick={() => handleSelectedGrade("C")}
                        >
                          C
                        </li>
                      </ul>
                    ) : null}
                  </div>
                  {/* 스테이킹 상태 드롭다운 메뉴 */}
                  <div className="momo-state-select-box">
                    <button
                      className="momo-btn--state-select"
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
                    {isOpen ? (
                      language === "EN" ? (
                        <ul className="momo-state-select-list">
                          <li
                            className="momo-state-item all"
                            onClick={() => handleSelectedItem("All")}
                          >
                            All
                          </li>
                          <li
                            className="momo-state-item staking"
                            onClick={() => handleSelectedItem("Staking")}
                          >
                            Staking
                          </li>
                          <li
                            className="momo-state-item before-staking"
                            onClick={() =>
                              handleSelectedItem("Ready for staking")
                            }
                          >
                            Ready for staking
                          </li>
                        </ul>
                      ) : (
                        <ul className="momo-state-select-list">
                          <li
                            className="momo-state-item all"
                            onClick={() => handleSelectedItem("すべて")}
                          >
                            すべて
                          </li>
                          <li
                            className="momo-state-item staking"
                            onClick={() => handleSelectedItem("Staking中")}
                          >
                            Staking中
                          </li>
                          <li
                            className="momo-state-item before-staking"
                            onClick={() => handleSelectedItem("未Staking")}
                          >
                            未Staking
                          </li>
                        </ul>
                      )
                    ) : null}
                  </div>

                  <span className="momo-header__text">
                    Total :&nbsp;
                    {(selectedState === "All" ||
                      selectedState === "すべて") && (
                      <span className="momo-header__text--qtt">
                        {filteredMomoNftData ? filteredMomoNftData.length : 0}
                      </span>
                    )}
                    {(selectedState === "Staking" ||
                      selectedState === "Staking中") && (
                      <span className="momo-header__text--qtt">
                        {filteredMomoNftData
                          ? filteredMomoNftData.filter((item) => {
                              return (
                                stakingData.includes(parseInt(item.id)) ||
                                teamStakingData.includes(parseInt(item.id))
                              );
                            }).length
                          : 0}
                      </span>
                    )}
                    {(selectedState === "Ready for staking" ||
                      selectedState === "未Staking") && (
                      <span className="momo-header__text--qtt">
                        {filteredMomoNftData
                          ? filteredMomoNftData.filter((item) => {
                              return (
                                !stakingData.includes(parseInt(item.id)) &&
                                !teamStakingData.includes(parseInt(item.id))
                              );
                            }).length
                          : 0}
                      </span>
                    )}
                    {language === "EN" ? "ea" : "個"}
                  </span>
                </div>
                <div className="momo-right-menu">
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

                  {isChecked.length <= 0 ? (
                    <button className="momo-btn--all-staking">
                      {language === "EN"
                        ? "Proceed to the stake selected NFT"
                        : "選択したNFTをStaking"}
                    </button>
                  ) : (
                    <button
                      className="momo-btn--all-staking momo-checked"
                      onClick={handleAllStakingModal}
                    >
                      {language === "EN"
                        ? "Proceed to the stake selected NFT"
                        : "選択したNFTをStaking"}
                      {/* Proceed to stake selected NFT */}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="momo-nft__main">
              {isLoading ? (
                <div className="loading">Now loading...</div>
              ) : walletAddress === undefined ||
                filteredMomoNftData.length === 0 ? (
                <div className="momo-empty-nft">
                  There are no NFTs in possession.
                </div>
              ) : momoNftData.length > 0 && dataStatus ? (
                ((selectedState === "All" || selectedState === "すべて") && (
                  <ul className="main__momo-list">
                    {filteredMomoNftData.slice(start, end).map((item) => (
                      <li className="momo-item" key={item.id}>
                        {stakingData.includes(parseInt(item.id)) ||
                        teamStakingData.includes(parseInt(item.id)) ? null : (
                          <input
                            type="checkbox"
                            className="momo-check"
                            checked={isChecked.includes(item.id)}
                            onClick={(e) =>
                              handleChecked(e, item.id, item.image, item.name)
                            }
                          />
                        )}
                        {item.reward !== 0 ? (
                          <span className="momo-reward">
                            {Number(item.reward).toFixed(3)}
                          </span>
                        ) : null}
                        <div className="momo-images">
                          <img src={item.image} alt="nft" />
                        </div>

                        {/* 싱글 스테이킹 또는 팀 스테이킹 중 ui */}
                        {stakingData.includes(parseInt(item.id)) ||
                        teamStakingData.includes(parseInt(item.id)) ? (
                          <div className="momo-info">
                            <span className="momo-name">{item.name}</span>
                            <span className="momo-staking-state now-staking">
                              {/* 싱글 스테이킹 일때와 팀 스테이킹 일때가 다르게 보이게 하기 */}
                              {stakingData.includes(parseInt(item.id))
                                ? "Now Staking"
                                : "Now Team Staking"}
                            </span>
                            <button
                              className="momo-btn-cancel-staking"
                              onClick={() =>
                                teamStakingData.includes(parseInt(item.id))
                                  ? handleMoveTeamModal(item.id, item.name)
                                  : handleCancelStakingModal(
                                      item.image,
                                      item.id,
                                      item.name
                                    )
                              }
                            >
                              Cancel Staking
                            </button>
                          </div>
                        ) : (
                          <div className="momo-info">
                            <span className="momo-name">{item.name}</span>
                            <span className="momo-staking-state">
                              Ready for Staking
                            </span>
                            <button
                              className="momo-btn--staking"
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
                        )}
                      </li>
                    ))}
                  </ul>
                )) ||
                ((selectedState === "Staking" ||
                  selectedState === "Staking中") &&
                  (isLoading ? (
                    <div className="loading">Now loading...</div>
                  ) : filteredMomoNftData.length === 0 ||
                    filteredMomoNftData.every(
                      (item) =>
                        !stakingData.includes(item.id) &&
                        !teamStakingData.includes(item.id)
                    ) ? (
                    <div className="momo-empty-nft">
                      There are no NFTs in possession.
                    </div>
                  ) : (
                    <ul className="main__momo-list">
                      {filteredMomoNftData
                        .filter((item) => {
                          return (
                            stakingData.includes(parseInt(item.id)) ||
                            teamStakingData.includes(parseInt(item.id))
                          );
                        })
                        .slice(start, end)
                        .map((item) => (
                          <li className="momo-item" key={item.id}>
                            {item.reward !== 0 ? (
                              <span className="momo-reward">
                                {Number(item.reward).toFixed(3)}
                              </span>
                            ) : null}
                            <div className="momo-images">
                              <img src={item.image} alt="nft" />
                            </div>

                            <div className="momo-info">
                              <span className="momo-name">{item.name}</span>
                              <span className="momo-staking-state now-staking">
                                {/* 싱글 스테이킹 일때와 팀 스테이킹 일때가 다르게 보이게 하기 */}
                                {stakingData.includes(parseInt(item.id))
                                  ? "Now Staking"
                                  : "Now Team Staking"}
                              </span>
                              <button
                                className="momo-btn-cancel-staking"
                                onClick={() =>
                                  teamStakingData.includes(parseInt(item.id))
                                    ? handleMoveTeamModal(item.id, item.name)
                                    : handleCancelStakingModal(
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
                  ))) ||
                ((selectedState === "Ready for staking" ||
                  selectedState === "未Staking") &&
                  (isLoading ? (
                    <div className="loading">Now loading...</div>
                  ) : filteredMomoNftData.length === 0 ||
                    filteredMomoNftData.every(
                      (item) =>
                        stakingData.includes(item.id) ||
                        teamStakingData.includes(item.id)
                    ) ? (
                    <div className="momo-empty-nft">
                      There are no NFTs in possession.
                    </div>
                  ) : (
                    <ul className="main__momo-list">
                      {filteredMomoNftData
                        .filter((item) => {
                          return (
                            !stakingData.includes(parseInt(item.id)) &&
                            !teamStakingData.includes(parseInt(item.id))
                          );
                        })
                        .slice(start, end)
                        .map((item) => (
                          <li className="momo-item" key={item.id}>
                            <input
                              type="checkbox"
                              className="momo-check"
                              checked={isChecked.includes(item.id)}
                              onClick={(e) =>
                                handleChecked(e, item.id, item.image, item.name)
                              }
                            />
                            {item.reward !== 0 ? (
                              <span className="momo-reward">
                                {Number(item.reward).toFixed(3)}
                              </span>
                            ) : null}
                            <div className="momo-images">
                              <img src={item.image} alt="nft" />
                            </div>
                            <div className="momo-info">
                              <span className="momo-name">{item.name}</span>
                              <span className="momo-staking-state">
                                Ready for Staking
                              </span>

                              <button
                                className="momo-btn--staking"
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
                  )))
              ) : (
                <div className="momo-loading">Now loading...</div>
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
                        ? filteredMomoNftData.filter((item) => {
                            return (
                              stakingData.includes(parseInt(item.id)) ||
                              teamStakingData.includes(parseInt(item.id))
                            );
                          }).length
                        : selectedState === "Ready for staking" ||
                          selectedState === "未Staking"
                        ? filteredMomoNftData.filter((item) => {
                            return (
                              !stakingData.includes(parseInt(item.id)) &&
                              !teamStakingData.includes(parseInt(item.id))
                            );
                          }).length
                        : filteredMomoNftData
                        ? filteredMomoNftData.length
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

      {/* 스테이킹 모달 */}
      {stakingModal && (
        <StakingModal
          momoSelectData={momoSelectData}
          setMomoSelectData={setMomoSelectData}
          language={language}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
      )}
      {/* 스테이킹 취소 모달 */}
      {cancelStakingModal && (
        <CancelStakingModal
          momoSelectData={momoSelectData}
          setMomoSelectData={setMomoSelectData}
          language={language}
          isChecked={isChecked}
        />
      )}

      {/* 클레임 모달 */}
      {claimModal && (
        <ClaimModal
          language={language}
          reward={reward}
          momoSelectData={momoSelectData}
          claimType="momoClaim"
        />
      )}
      {/* 팀 스테이킹 불가 공지 팝업 */}
      {openMoveTeamModal && (
        <MoveTeamPageModal
          language={language}
          handleMoveTeamModal={handleMoveTeamModal}
          setOpenMoveTeamModal={setOpenMoveTeamModal}
          momoSelectData={momoSelectData}
        />
      )}
    </>
  );
};

export default Momo;
