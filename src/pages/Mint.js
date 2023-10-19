import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/Mint.scss";
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
// mintpage 이미지
import mintlogo from "../assets/images/mint/TokyoMongzHillsClub_Logo_Web 1.png";
import product_specia_img_jp from "../assets/images/mint/product-banner1-jp.png";
import product_momo_img_jp from "../assets/images/mint/product-banner2-jp.png";
import momo_character from "../assets/images/mint/momo-character.png";
import momo_character_background from "../assets/images/mint/MOMO_bg_decoration.png";
import purchase_ETH from "../assets/images/mint/ETH.png";
import purchase_credit_card from "../assets/images/mint/credit_card.png";
import purchase_one from "../assets/images/mint/01.png";
import purchase_two from "../assets/images/mint/02.png";
const Main = ({ language }) => {
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (nftData) {
      setIsLoading(() => {
        return true;
      });
    } else {
      setIsLoading(() => {
        return true;
      });
    }
  }, [nftData]);
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
      const balances = await contract.methods
        .balanceOfBatch(Array(tokenIds.length).fill(walletAddress), tokenIds)
        .call(); // balanceOfBatch 함수를 사용하여 지갑의 다수의 자산 ID에 대한 잔액을 일괄적으로 가져옵니다.
      // console.log(balances);
      const promises = [];

      for (let i = 0; i < balances.length; i++) {
        if (balances[i] === "1") {
          promises.push(
            // axios.get("http://127.0.0.1:8000/api/get_json_data", {
            axios.get("https://www.tokyo-test.shop/api/get_json_data", {
              params: {
                id: i + 1,
              },
            })
          );
        }
        // console.log(promises);
      }

      Promise.all(promises)
        .then((responses) => {
          console.log(responses);
          const newData = responses.map((res, index) => ({
            id: parseInt(res.data.name.slice(5)),
            name: res.data.name,
            image: res.data.image,
          }));
          setNftData(newData);
          console.log(newData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    const getStakingNftList = async () => {
      const data = {
        address: walletAddress, // 현재 지갑
      };
      setDataStatus(false);
      try {
        const res = await axios.post(
          "https://www.tokyo-test.shop/api/getGStakedTMHCwithVrify",
          data
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
          "https://www.tokyo-test.shop/api/calRewardTMHCBatch",
          data
        );
        setReward(res.data);
        console.log("ㄹ리워드 ==========", res.data);
      } catch (err) {
        console.log(err);
      }
    };

    getStakingNftList();
    getBalanceOfBatch();
    getReward();
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

  console.log(language);
  return (
    <>
      <div className="mint-main-background">
        <div className="mint-main-container">
          <div className="mint-main-release-date">
            <div className="release-date-top-cotent">
              <div className="mint-logo">
                <img src={mintlogo} alt="mongz-logo" />
              </div>
              <button className="mint-wallet-btn">ウォレット接続 -</button>
            </div>
            <div className="release-date-content">
              <div className="release-date-character-box">
                <div className="release-date-character">
                  <img src={momo_character} alt="character" />
                </div>
                <div className="release-date-character-background">
                  <img
                    src={momo_character_background}
                    alt="character-background"
                  />
                </div>
              </div>
              <div className="release-date-content-text-box">
                <h1 className="release-date-title">
                  PEACHz.
                  <br />
                  MOMO
                </h1>
                <div className="release-date-sub-title-box">
                  <span className="release-date-line"></span>
                  <span className="release-date-sub-title">MONGzUNIVERSE</span>
                  <span className="release-date-line"></span>
                </div>
                <button className="release-date-gal-button">
                  GAL Sale is scheduled to take place
                </button>
                <div className="releaset-date-open-date">
                  {/* 어떻게 할지 잠시보류 ex) 이미지로 할지 그냥 텍스트로할지 */}
                  임시상태
                </div>
                <p className="release-date-caution">
                  ※Only GAL holders can purchase this item
                </p>
              </div>
            </div>
          </div>
          <div className="mint-main__product-info">
            <div className="product-info__left-box">
              <img src={product_specia_img_jp} alt="product_specia_img" />
            </div>
            <div className="product-info__right-box">
              <img src={product_momo_img_jp} alt="product_momo_img" />
            </div>
          </div>
          <div className="mint-main__purchase">
            <span className="purchase__line"></span>
            <p className="purchase__title">PURCHASE</p>
            <p className="purchase__sub-title">
              Purchases are available with Ethereum (ETH) or credit card
            </p>
            <div className="purchase-type">
              <div className="purchase__left-box">
                <p className="purchase__text-number">Purchase-01</p>
                <div className="purchase__ETH">
                  <img src={purchase_ETH} alt="purchase_ETH" />
                </div>
                <div className="purchase__img-number">
                  <img src={purchase_one} alt="purchase_one" />
                </div>
              </div>
              <div className="purchase__right-box">
                <img src={purchase_credit_card} alt="purchase_credit_card" />
              </div>
            </div>
          </div>
        </div>
      </div>

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
      {claimModal && <ClaimModal language={language} reward={reward} />}
    </>
  );
};

export default Main;
