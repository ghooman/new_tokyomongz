import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  MONGZ_COIN,
} from "../contract/contractAddress";

import {
  useContract,
  useOwnedNFTs,
  useAddress,
  useContractRead,
  useBalance,
} from "@thirdweb-dev/react";
import Web3 from "web3";
import axios from "axios";
import mongsDummyData from "../data/tmhcDummyData";
import momoDummyData from "../data/momoDummyData";
import MainTeamStaking from "../components/MainTeamStaking";
import TeamStakingCreateModal from "../components/TeamStakingCreateModal";
import TeamStakingCancelModal from "../components/TeamStakingCancelModal";
import TeamStakingCancelConfirmModal from "../components/TeamStakingCancelConfirmModal";
import MoveTeamPageModal from "../components/MoveTeamPageModal";

const Main = ({ language }) => {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // 드랍다운 보이기 / 안보이기
  const rotateRef = useRef();
  const isOpen = useSelector((state) => state.isOpen.isOpen);
  const handleDropdownClick = () => {
    dispatch(setIsOpen(!isOpen));
    rotateRef.current.style.transform = isOpen ? "" : "rotate(-180deg)";
  };

  // 드랍다운 아이템 선택시 글자변경
  const selectedState = useSelector((state) => state.selectedState.title);

  // 스테이킹 상태를 쿼리에서 가져와 store에 업데이트 시킵니다.
  useEffect(() => {
    const stateFromQueryParam = searchParams.get("state") || "All";
    dispatch(setSelectedState(stateFromQueryParam));
  }, [dispatch, searchParams]);

  // 스테이킹 상태 선택시
  const handleSelectedItem = (text) => {
    dispatch(setSelectedState(text));
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set("state", text);
    navigate(`?${newSearchParams.toString()}`);
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
  const queryPage = searchParams.get("page");
  const [page, setPage] = useState(queryPage ? parseInt(queryPage, 10) : 1);
  // 페이지 및 필터 변경 시 URL 업데이트
  const updateUrl = () => {
    const searchParams = new URLSearchParams();
    // 'All' 혹은 'すべて'도 'state' 파라미터에 포함합니다.
    searchParams.set("state", selectedState);
    // 마지막으로 'page' 파라미터를 추가합니다.
    searchParams.set("page", page.toString());
    navigate(`?${searchParams.toString()}`);
  };

  // 필터링 및 페이지 상태 변경 시 URL 업데이트
  useEffect(() => {
    updateUrl();
  }, [selectedState, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage); // 페이지 상태 업데이트
    if (selectedState !== "All" && selectedState !== "すべて") {
      searchParams.set("state", selectedState);
    }

    searchParams.set("page", newPage.toString());
    navigate(`?${searchParams.toString()}`);
  };

  // 현재 테스트를 위해 1개씩만 출력 시키고있습니다.
  const start = (page - 1) * 15;
  const end = start + 15;

  // 스테이킹 버튼 클릭시 데이터 저장하는 state
  const [selectData, setSelectData] = useState([]);
  // 싱글 스테이킹 상태를 판단합니다.
  const [isSingleStaking, setIsSingleStaking] = useState(true);
  // 스테이킹 모달
  const stakingModal = useSelector((state) => state.stakingModal.stakingModal);
  const handleStakingModal = (image, name, id) => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
    setIsSingleStaking(true); // 싱글 스테이킹인지 확인하고
    setIsChecked([]); // 체크드 선택된걸 다 풀어버립니다.
    setSelectData([{ image: image, name: name, id: id }]);
  };

  // 스테이킹 모달 여러개
  const handleAllStakingModal = () => {
    dispatch(setStakingModal(!stakingModal));
    document.body.style.overflow = "hidden";
    setIsSingleStaking(false); // 멀티 스테이킹일 경우
    // 체크한 것들만 selected에 다시담아 보내줍니다.
    const newSelectData = isChecked.map((id) => {
      const item = nftData.find((nftItem) => nftItem.id === id);
      return { image: item.image, name: item.name, id: item.id };
    });

    setSelectData(newSelectData);
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
  // 팀 스테이킹 이동 안내 모달
  const [openMoveTeamModal, setOpenMoveTeamModal] = useState(false);
  const handleMoveTeamModal = (image, id, name) => {
    document.body.style.overflow = "hidden";
    setOpenMoveTeamModal((prev) => !prev);
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
  const { contract: mongzContract } = useContract(MONGZ_COIN, MzcAbi);

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
    new Web3.providers.HttpProvider(
      "https://eth-mainnet.g.alchemy.com/v2/BOAhDrANEa71VO57mlTETHDhd-PMHDct" // 메인넷
      // "https://goerli.rpc.thirdweb.com" //테스트넷
    )
  );
  // const contractAddress = "0xa4057dadA9217A8E64Ee7d469A5A7e7c40B7380f"; // ERC-1155 컨트랙트 주소를 입력. 메인넷
  const contractAddress = IMPORT_TMHC_CONTRACT; // 테스트넷 goerli
  // const walletAddress = "0xC25E8566d0E493681fBFF114ff29642feA68b8Ac"; // 지갑 주소를 입력.
  // const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // 잔액을 조회할 자산 ID 배열을 입력.
  const tokenIds = Array(10000)
    .fill()
    .map((v, i) => i + 1);

  const contract = new web3.eth.Contract(abi, contractAddress); // ERC-1155 컨트랙트 ABI와 주소를 입력.

  // const nftData2 = [{}];

  const [nftData, setNftData] = useState([]);
  const [teamStakingNftData, setTeamStakingNftData] = useState([]);
  const [teamStaking, setTeamStaking] = useState(false);
  const [clickStakingMongzData, setClickStakingMongzData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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

    async function getBalanceOfBatch() {
      setIsLoading(true);
      console.log("실행");

      try {
        const balances = await contract.methods
          .balanceOfBatch(Array(tokenIds.length).fill(walletAddress), tokenIds)
          .call(); // balanceOfBatch 함수를 사용하여 지갑의 다수의 자산 ID에 대한 잔액을 일괄적으로 가져옴.
        // console.log(balances);
        const promises = [];

        // console.log("밸런스", balances);

        for (let i = 0; i < balances.length; i++) {
          if (balances[i] === "1") {
            promises.push(
              i + 1
              // axios.get("http://127.0.0.1:8000/api/get_json_data", {
              // axios.get("https://www.tokyo-test.shop/api/get_json_data", {
            );
          }
        }
        const jsonPromise = JSON.stringify(promises);
        console.log("제이슨아이디값", jsonPromise);
        //////////////////////////////////////////////////////////////////////////////////
        const res = await axios.get(
          "https://mongz-api.sevenlinelabs.app/get_metadata_tmhc",
          {
            params: {
              tokenIds: jsonPromise,
            },
          }
        );

        console.log("겟도쿄", res);

        const newData = res.data.map((item, index) => ({
          id: parseInt(item.name.slice(5)),
          name: item.name,
          image: item.image,
          reward: item.reward,
        }));

        console.log(newData);
        setNftData(newData); //더미 지울시 주석을 풀어줍니다.
        setIsLoading(false);
        console.log("실행됨");
      } catch (err) {
        console.log("도쿄에러", err);
        setIsLoading(false);
      }
    }
    console.log("도쿄엔에프티", nftData);

    // 스테이킹 된 nft 가져오기
    const getStakingNftList = async () => {
      setDataStatus(false);
      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/getStakedTMHCwithVrify?address=${walletAddress}`
        );
        console.log("스테이킹 리스트=========", res);
        setStakingData(res.data);
      } catch (err) {
        console.log("스테이킹 리스트 에러 ==========", err);
      } finally {
        // setIsLoading(false);
        setDataStatus(true);
      }
    };
    console.log(walletAddress, "월렛지갑");
    // 팀 스테이킹 된 nft 가져오기
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
        // setTeamStakingNftList(fetchTeamStakingList);

        await getTeamStakingMomoNft(momoNftIds, fetchTeamStakingList);
      } catch (err) {
        console.log("팀스테이킹 리스트 에러 ==========", err);
      } finally {
        // setDataStatus(true);
      }
    };

    const getTeamStakingMomoNft = async (momoNftIds, fetchTeamStakingList) => {
      try {
        const res = await axios.get(
          "https://mongz-api.sevenlinelabs.app/get_metadata_momo",
          {
            params: {
              tokenIds: JSON.stringify(momoNftIds), // 배열 nft아이디들
            },
          }
        );

        const finalTeamStakingData = fetchTeamStakingList.map((item) => {
          return {
            ...item,
            member: item.member.map((id) =>
              res.data.find((member) => member.id === id)
            ),
          };
        });
        console.log("모모nft", res);
        console.log("파이널nft", finalTeamStakingData);
        setTeamStakingNftData(finalTeamStakingData);
      } catch (err) {
        console.log(err);
      }
    };
    console.log(teamStakingNftData);

    // 수령 가능한 리워드 수량
    const getReward = async () => {
      try {
        const res = await axios.get(
          `https://mongz-api.sevenlinelabs.app/calRewardTMHCBatchWithAddress?address=${walletAddress}`,
          {}
        );
        setReward(res.data);

        console.log("ㄹ리워드 ==========", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStakingNftList();
    getBalanceOfBatch();
    getTeamStakingNftList();
    getReward();
  }, [walletAddress]);

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
          MONGZ_COIN,
          ["function symbol() view returns (string)"],
          signer
        );
        const symbol = await tokenContract.symbol();
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: MONGZ_COIN,
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

  // const { data: mzcBalanceData, isLoading: mzcBalanceIsLoading } =
  //   useBalance(MONGZ_COIN);
  // console.log("mzcBalabceData", mzcBalanceData);
  // const mzcBalance =
  //   mzcBalanceData && parseFloat(mzcBalanceData.displayValue).toFixed(2);

  // ==================== 스테이킹 ======================
  // const handleStaking = async () => {
  //   const data = {
  //     address: walletAddress, // 현재 지갑
  //     // workNFT: isChecked,
  //     workNFT: [7],
  //     // 선택한 목록
  //   };

  //   try {
  //     const res = await axios.post("https://www.tokyo-test.shop/api/StakeTMHC", data);
  //     console.log("스테이킹=================", res);
  //     // window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //     // setFailModalControl(true);
  //   }
  // };
  // ================= 언스테이킹 ===============
  // const handleUnStaking = async () => {
  //   const data = {
  //     address: walletAddress, // 현재 지갑
  //     // workNFT: isChecked,
  //     workNFT: [7],
  //     // 선택한 목록
  //   };

  //   try {
  //     const res = await axios.post(
  //       "https://www.tokyo-test.shop/api/unStakeTMHC",
  //       data
  //     );
  //     console.log("언스테이킹=================", res);
  //     // window.location.reload();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // 등급 표시
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
  // 등급에 따른 부스팅 수치
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
  // 팀 스테이킹 정보에서 몽즈 id(leader)로 새로운 배열을 만듭니다.
  const teamStakingNftId = teamStakingNftData.map((item) => item.leader);
  // 스테이킹 처리로 보여지는 몽즈 갯수가 0되었다면 page 숫자를 이전페이지로 이동시킵니다.
  useEffect(() => {
    if (isLoading || nftData.length === 0) return;
    let renderableItems;
    // All 인 상태
    if (selectedState === "All" || selectedState === "すべて") {
      renderableItems = nftData;
      // 스테이킹 중인 상태
    } else if (selectedState === "Staking" || selectedState === "Staking中") {
      renderableItems = nftData.filter(
        (item) =>
          stakingData.includes(item.id) || teamStakingNftId.includes(item.id)
      );
      // 스테이킹 전인 상태
    } else if (
      selectedState === "Ready for staking" ||
      selectedState === "未Staking"
    ) {
      renderableItems = nftData.filter(
        (item) =>
          !stakingData.includes(item.id) && !teamStakingNftId.includes(item.id)
      );
    }
    // 현재 상태와 페이지에 출력되는 몽즈들을 파악합니다.
    const itemsInCurrentPage = renderableItems.slice(start, end);
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
    teamStakingNftId,
    navigate,
    location.search,
  ]);
  return (
    <>
      <Nav />
      {teamStaking ? (
        <MainTeamStaking
          language={language}
          clickStakingMongzData={clickStakingMongzData}
        />
      ) : (
        <div className="tmhc-main-background">
          <div className="tmhc-main-container">
            <div className="container__texture">
              {language === "EN" ? (
                <>
                  <p className="texture__main-text">
                    Stake your Tokyo Mongz Hills Club NFT to receive MZC
                  </p>
                  <p className="texture__sub-text">
                    MZC is a utility coin that belongs to the MUC ecosystem.
                  </p>
                </>
              ) : (
                <>
                  <p className="texture__main-text">
                    TMHC NFTをStakingすることでMZCを獲得することができます
                  </p>
                  <p className="texture__sub-text">
                    MZCは、MUCエコシステムに属するユーティリティコインです
                  </p>
                </>
              )}

              <div className="texture__box">
                {language === "EN" ? (
                  <>
                    <Link to="https://multiuniversecentral.io/" target="_blank">
                      About MUC Ecosystem
                    </Link>
                    <Link
                      to="https://commseed.gitbook.io/multi-universe-central-muc/"
                      target="_blank"
                    >
                      MUC White Paper
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="https://multiuniversecentral.io/" target="_blank">
                      MUCエコシステムについて
                    </Link>
                    <Link
                      to="https://commseed.gitbook.io/multi-universe-central-muc/"
                      target="_blank"
                    >
                      MUCホワイトペーパー
                    </Link>
                  </>
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
              <span className="claim__title">
                {language === "EN"
                  ? "TMHC Single Staking Claimable MZC"
                  : "TMHC Single StakingのClaim可能額"}
              </span>
              <div className="claim__coin">
                <div>
                  <span className="coin-icon">
                    <img src={coinIcon} alt="coin" />
                  </span>

                  <div className="mzc">
                    <span className="coin">
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
                  className="btn-claim"
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

            <div className="container__nft">
              <div className="nft__header">
                <span className="header__title">NFT List</span>
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
                      {isOpen && (
                        <ul className="state-select-list">
                          <li
                            className="state-item all"
                            onClick={() =>
                              handleSelectedItem(
                                language === "EN" ? "All" : "すべて"
                              )
                            }
                          >
                            {language === "EN" ? "All" : "すべて"}
                          </li>
                          <li
                            className="state-item staking"
                            onClick={() =>
                              handleSelectedItem(
                                language === "EN" ? "Staking" : "Staking中"
                              )
                            }
                          >
                            {language === "EN" ? "Staking" : "Staking中"}
                          </li>
                          <li
                            className="state-item before-staking"
                            onClick={() =>
                              handleSelectedItem(
                                language === "EN"
                                  ? "Ready for staking"
                                  : "未Staking"
                              )
                            }
                          >
                            {language === "EN"
                              ? "Ready for staking"
                              : "未Staking"}
                          </li>
                        </ul>
                      )}
                    </div>

                    <span className="header__text">
                      Total :&nbsp;
                      {(selectedState === "All" ||
                        selectedState === "すべて") && (
                        <span className="header__text--qtt">
                          {nftData ? nftData.length : 0}
                        </span>
                      )}
                      {(selectedState === "Staking" ||
                        selectedState === "Staking中") && (
                        <span className="header__text--qtt">
                          {nftData
                            ? nftData.filter((item) => {
                                return (
                                  stakingData.includes(parseInt(item.id)) ||
                                  teamStakingNftId.includes(parseInt(item.id))
                                );
                              }).length
                            : 0}
                        </span>
                      )}
                      {(selectedState === "Ready for staking" ||
                        selectedState === "未Staking") && (
                        <span className="header__text--qtt">
                          {nftData
                            ? nftData.filter((item) => {
                                return (
                                  !stakingData.includes(parseInt(item.id)) &&
                                  !teamStakingNftId.includes(parseInt(item.id))
                                );
                              }).length
                            : 0}
                        </span>
                      )}
                      {language === "EN" ? "ea" : "個"}
                    </span>
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
                    <button
                      className={`btn--all-staking ${
                        isChecked.length <= 0 ? "" : "checked"
                      }`}
                      disabled={isChecked.length <= 0}
                      onClick={handleAllStakingModal}
                    >
                      {language === "EN"
                        ? "Proceed to stake selected NFT"
                        : "選択したNFTをStaking"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="nft__main">
                {isLoading ? (
                  <div className="loading">Now loading...</div>
                ) : walletAddress === undefined || nftData.length === 0 ? (
                  <div className="empty-nft">
                    There are no NFTs in possession.
                  </div>
                ) : nftData.length > 0 && dataStatus ? (
                  ((selectedState === "All" || selectedState === "すべて") && (
                    <ul className="main__tmhc-list">
                      {/* tmhc원숭이들을 뿌려줍니다. */}
                      {nftData.slice(start, end).map((item) => (
                        <li className="tmhc-item" key={item.id}>
                          {stakingData.includes(parseInt(item.id)) ||
                          teamStakingNftId.includes(
                            parseInt(item.id)
                          ) ? null : (
                            <input
                              type="checkbox"
                              className="tmhc-check"
                              checked={isChecked.includes(item.id)}
                              onClick={(e) =>
                                handleChecked(e, item.id, item.image, item.name)
                              }
                            />
                          )}
                          {item.reward !== 0 ? (
                            <span className="tmhc-reward">
                              {Number(item.reward).toFixed(3)}
                            </span>
                          ) : null}
                          <div className="tmhc-images">
                            <img src={item.image} alt="nft" />
                            {/* 아래에 있는 모모 박스는 싱글 스테이킹인지 팀 스테이킹인지 판단해야함. 팀 스테이킹 이라면 보여주고 아니라면 보여줄 필요 없음  */}
                            {teamStakingNftData.map(
                              (teamStakingItem, index) => {
                                return item.id === teamStakingItem.leader &&
                                  teamStakingItem.member ? (
                                  <div
                                    className="team-staking-momo-box"
                                    key={index}
                                  >
                                    {teamStakingItem.member.map(
                                      (memberItem, subIndex) => (
                                        <div
                                          className="team-staking-momo-img"
                                          key={subIndex}
                                        >
                                          <div
                                            className={`momo-rating ${getGradeNameForValue(
                                              memberItem.rank
                                            )}`}
                                          >
                                            {memberItem.rank}
                                          </div>
                                          <img
                                            src={memberItem.image}
                                            alt="momoImg"
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : null;
                              }
                            )}
                          </div>
                          {stakingData.includes(parseInt(item.id)) ||
                          teamStakingNftId.includes(parseInt(item.id)) ? (
                            <div className="tmhc-info">
                              <span className="tmhc-name">{item.name}</span>
                              <span className="tmhc-staking-state now-staking">
                                {teamStakingNftId.includes(parseInt(item.id))
                                  ? "Now Team Staking"
                                  : "Now Staking"}
                              </span>
                              <span className="team-staking-text">
                                <>{/* BOOST <span>560%</span> */}</>
                              </span>
                              {/* 팀 스테이킹에선 cancelTeamSTaking,싱글 스테이킹에선 cancelStaking */}
                              <button
                                className="btn-cancel-staking"
                                onClick={() =>
                                  teamStakingNftId.includes(parseInt(item.id))
                                    ? handleMoveTeamModal(
                                        item.image,
                                        item.id,
                                        item.name,
                                        teamStakingNftData
                                      )
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
                            <div className="tmhc-info">
                              <span className="tmhc-name">{item.name}</span>
                              <span className="tmhc-staking-state">
                                Ready for Staking
                              </span>
                              <button
                                className="btn--team-staking"
                                onClick={() => {
                                  setTeamStaking((prev) => !prev);
                                  setClickStakingMongzData(item);
                                }}
                              >
                                TMHC X MOMO <br /> Team Boost Staking
                              </button>
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
                          )}
                        </li>
                      ))}
                    </ul>
                  )) ||
                  ((selectedState === "Staking" ||
                    selectedState === "Staking中") &&
                    (isLoading ? (
                      <div className="loading">Now loading...</div>
                    ) : stakingData.length === 0 &&
                      teamStakingNftData.length === 0 ? (
                      <div className="empty-nft">
                        There are no NFTs in possession.
                      </div>
                    ) : (
                      <ul className="main__tmhc-list">
                        {nftData
                          .filter((item) => {
                            return (
                              stakingData.includes(parseInt(item.id)) ||
                              teamStakingNftId.includes(parseInt(item.id))
                            );
                          })
                          .slice(start, end)
                          .map((item) => (
                            <li className="tmhc-item" key={item.id}>
                              {item.reward !== 0 ? (
                                <span className="tmhc-reward">
                                  {Number(item.reward).toFixed(3)}
                                </span>
                              ) : null}
                              <div className="tmhc-images">
                                <img src={item.image} alt="nft" />
                                {/* 아래에 있는 모모 박스는 싱글 스테이킹인지 팀 스테이킹인지 판단해야함. 팀 스테이킹 이라면 보여주고 아니라면 보여줄 필요 없음  */}
                                {teamStakingNftData.map(
                                  (teamStakingItem, index) => {
                                    return item.id === teamStakingItem.leader &&
                                      teamStakingItem.member ? (
                                      <div
                                        className="team-staking-momo-box"
                                        key={index}
                                      >
                                        {teamStakingItem.member.map(
                                          (memberItem, subIndex) => (
                                            <div
                                              className="team-staking-momo-img"
                                              key={subIndex}
                                            >
                                              <div
                                                className={`momo-rating ${getGradeNameForValue(
                                                  memberItem.rank
                                                )}`}
                                              >
                                                {memberItem.rank}
                                              </div>
                                              <img
                                                src={memberItem.image}
                                                alt="momoImg"
                                              />
                                            </div>
                                          )
                                        )}
                                      </div>
                                    ) : null;
                                  }
                                )}
                              </div>
                              {
                                <div className="tmhc-info">
                                  <span className="tmhc-name">{item.name}</span>
                                  <span className="tmhc-staking-state now-staking">
                                    {teamStakingNftId.includes(
                                      parseInt(item.id)
                                    )
                                      ? "Now Team Staking"
                                      : "Now Staking"}
                                  </span>
                                  <span className="team-staking-text">
                                    {/* BOOST <span>560%</span> */}
                                  </span>
                                  {/* 팀 스테이킹에선 cancelTeamSTaking,싱글 스테이킹에선 cancelStaking */}
                                  <button
                                    className="btn-cancel-staking"
                                    onClick={() =>
                                      teamStakingNftId.includes(
                                        parseInt(item.id)
                                      )
                                        ? handleMoveTeamModal(
                                            item.image,
                                            item.id,
                                            item.name,
                                            teamStakingNftData
                                          )
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
                              }
                            </li>
                          ))}
                      </ul>
                    ))) ||
                  ((selectedState === "Ready for staking" ||
                    selectedState === "未Staking") &&
                  isLoading ? (
                    <div className="loading">Now loading...</div>
                  ) : nftData.length ===
                    stakingData.length + teamStakingNftData.length ? (
                    <div className="empty-nft">
                      There are no NFTs in possession.
                    </div>
                  ) : (
                    <ul className="main__tmhc-list">
                      {nftData
                        .filter((item) => {
                          return (
                            !stakingData.includes(parseInt(item.id)) &&
                            !teamStakingNftId.includes(parseInt(item.id))
                          );
                        })
                        .slice(start, end)
                        .map((item) => (
                          <li className="tmhc-item" key={item.id}>
                            {stakingData.includes(parseInt(item.id)) ||
                            teamStakingNftId.includes(
                              parseInt(item.id)
                            ) ? null : (
                              <input
                                type="checkbox"
                                className="tmhc-check"
                                checked={isChecked.includes(item.id)}
                                onClick={(e) =>
                                  handleChecked(
                                    e,
                                    item.id,
                                    item.image,
                                    item.name
                                  )
                                }
                              />
                            )}
                            {item.reward !== 0 ? (
                              <span className="tmhc-reward">
                                {Number(item.reward).toFixed(3)}
                              </span>
                            ) : null}
                            <div className="tmhc-images">
                              <img src={item.image} alt="nft" />
                            </div>
                            <div className="tmhc-info">
                              <span className="tmhc-name">{item.name}</span>
                              <span className="tmhc-staking-state">
                                Ready for Staking
                              </span>
                              <button
                                className="btn--team-staking"
                                onClick={() => {
                                  setTeamStaking((prev) => !prev);
                                  setClickStakingMongzData(item);
                                }}
                              >
                                TMHC X MOMO Team <br /> Boost Staking
                              </button>
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

                {nftData === undefined ? null : (
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
                          ? nftData.filter((item) => {
                              return (
                                stakingData.includes(parseInt(item.id)) ||
                                teamStakingNftId.includes(parseInt(item.id))
                              );
                            }).length
                          : selectedState === "Ready for staking" ||
                            selectedState === "未Staking"
                          ? nftData.filter((item) => {
                              return (
                                !stakingData.includes(parseInt(item.id)) &&
                                !teamStakingNftId.includes(parseInt(item.id))
                              );
                            }).length
                          : nftData
                          ? nftData.length
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
        </div>
      )}

      {/* 스테이킹 모달 */}
      {stakingModal && (
        <StakingModal
          selectData={selectData}
          setSelectData={setSelectData}
          language={language}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
        />
      )}
      {/* 스테이킹 취소 모달 */}
      {cancelStakingModal && (
        <CancelStakingModal
          selectData={selectData}
          setSelectData={setSelectData}
          language={language}
          isChecked={isChecked}
        />
      )}

      {/* 클레임 모달 */}
      {claimModal && (
        <ClaimModal language={language} reward={reward} claimType="tmhcClaim" />
      )}

      {/* 팀 스테이킹 불가 공지 팝업 */}
      {openMoveTeamModal && (
        <MoveTeamPageModal
          language={language}
          handleMoveTeamModal={handleMoveTeamModal}
          setOpenMoveTeamModal={setOpenMoveTeamModal}
          selectData={selectData}
        />
      )}
    </>
  );
};

export default Main;
