import React, { useEffect, useRef, useState } from "react";
import "../styles/Swap.scss";
import downArrow from "../assets/images/SwapArrow.svg";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import {
  MZC_ADDRESS,
  SWAP_CONTRACT_ADDRESS,
} from "../contract/contractAddress";
import { mzcTestAbi } from "../contract/mzcTestAbi";
import { swapAbi } from "../contract/swapAbi";

const Swap = ({ language }) => {
  // 바꾸고 싶은 코인 수
  const [coinAmount, setCoinAmount] = useState("");
  console.log("입력코인수", coinAmount);
  // 보유한 코인 수보다 많은 코인을 입력했을 때
  const [overBalance, setOverBalance] = useState(null);

  function handleInputChange(e) {
    let value = e.target.value;
    // 숫자만 입력 가능하도록 설정
    value = value.replace(/[^0-9]/g, "");
    if (value === "") {
      setCoinAmount("0");
    } else {
      const numValue = parseInt(value, 10);
      if (!isNaN(numValue)) {
        // 입력값이 mzcBalance보다 크면 mzcBalance로 설정
        if (numValue > mzcBalance) {
          setCoinAmount(mzcBalance.toString());
        } else {
          setCoinAmount(numValue.toString()); // Convert the number back to a string
        }
      }
    }
    console.log("coinAmount", value);
    console.log("coinAmountMzc", mzcBalance);
  }

  const handleMaxButton = (e) => {
    e.preventDefault();
    setCoinAmount(mzcBalance ? mzcBalance : 0);
  };

  // 환전 금액 입력시 오른쪽 끝으로 스크롤 이동 합니다.
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      inputElement.scrollLeft = inputElement.scrollWidth;
    }
  }, [coinAmount]);

  // < ============================= 서드웹 코드 ================================ >
  const walletAddress = useAddress();
  // 컨트랙트
  const { contract: mzcContract } = useContract(MZC_ADDRESS);

  const { contract: swapContract } = useContract(
    SWAP_CONTRACT_ADDRESS,
    swapAbi
  );

  // mzc 수량 확인
  const { data: mzcBalanceData, isLoading: mzcBalanceIsLoading } =
    useContractRead(mzcContract, "balanceOf", walletAddress);

  const mzcBalance = mzcBalanceData
    ? (parseInt(mzcBalanceData._hex, 16) / 10 ** 18).toFixed()
    : undefined;

  // ============= 스왑 코드 ================

  // allowance 함수
  const { data: allowanceData, isLoading: allowanceIsLoading } =
    useContractRead(
      mzcContract,
      "allowance",
      walletAddress,
      SWAP_CONTRACT_ADDRESS
    );
  console.log("allowanceData값", allowanceData);

  const allowanceBalance = allowanceData
    ? parseInt(allowanceData._hex, 16) / 10 ** 18
    : 0;
  console.log("allowance값", allowanceBalance);

  // approve 함수
  const { mutateAsync: approve, isLoading } = useContractWrite(
    mzcContract,
    "approve"
  );

  const approveCall = async () => {
    try {
      const data = await approve(
        [SWAP_CONTRACT_ADDRESS, "10000000000000000000000000000"] //[spender, amount] 넣어야됨
      );
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // swap 함수
  const { mutateAsync: swapMZCForMUC, isLoading: swapIsLoading } =
    useContractWrite(swapContract, "swapMZCForMUC");
  console.log("로딩", swapIsLoading);

  const swapCall = async () => {
    try {
      const largeNumber = parseInt(coinAmount) * 10 ** 18;
      const formattedNumber = largeNumber.toLocaleString("fullwide", {
        useGrouping: false,
      });

      const data = await swapMZCForMUC([formattedNumber]); // [amount] 넣어야됨   유저입력값의 10의 18승
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  };

  // swap handler
  const handleSwap = async (e) => {
    e.preventDefault();
    if (coinAmount > mzcBalance) {
      setOverBalance(true);
    } else {
      setOverBalance(false);
    }
    console.log(`환전할 코인 수: ${coinAmount}`);

    if (coinAmount > allowanceData) {
      await approveCall();
      await swapCall();
      // await swapCall()
    } else {
      swapCall();
    }
  };

  return (
    <div className="swap-background">
      <div className="swap__header">
        <p className="swap__header__title">MZC-MUC SWAP</p>
        <p className="swap__header__sub-title">
          Get multi-universe coins and open new doors
        </p>
        <p className="swap__header__description">
          {language === "EN" ? (
            <>
              On this page you can exchange your MZC (MongZ Coin) for MUC (Multi
              Universe Coin). Enter the amount you wish to exchange in the white
              box and press the exchange button.
              <br />
              -You cannot enter an amount that exceeds your balance.
              <br />
              -The operation cannot be canceled after the exchange is completed.
            </>
          ) : (
            <>
              このページではMZCをMUCに交換することができます。交換したいMZCの額を白いボックスに入力し、EXCHANGEボタンを押してください。
              <br />
              ※所持残高を超える額は入力できません
              <br />
              ※交換を行ったあとに操作をキャンセルすることはできません
            </>
          )}
        </p>
      </div>
      <div className="swap__content">
        <p className="swap__content__my-amount">
          {language === "EN" ? (
            <>
              Your Balance is <span className="my-amount">{mzcBalance}</span>{" "}
              MZC
            </>
          ) : (
            <>
              あなたのMZC残高は <span className="my-amount">{mzcBalance}</span>{" "}
              MZCです
            </>
          )}
        </p>
        <form className="content__form">
          <div className="content__form__input-box">
            <div className="input-container">
              <input
                className="input-box__input"
                type="number"
                value={coinAmount}
                onChange={handleInputChange}
                placeholder="0"
              />
              <span className="input-label">MZC</span>
            </div>
            <button
              className="content__form__max-button"
              onClick={handleMaxButton}
            >
              MAX
            </button>
          </div>
          <div className="content__form__arrow-box">
            <img className="arrow" src={downArrow} alt="arrow" />
            <img className="arrow" src={downArrow} alt="arrow" />
            <img className="arrow" src={downArrow} alt="arrow" />
          </div>

          <div className="content__preview-box">
            <input
              ref={inputRef}
              className="content__preview-box__amount"
              value={coinAmount === undefined ? 0 : coinAmount}
              readOnly
            />
            <span className="amount__label">MUC</span>
          </div>
          {/* 임시 오류문구 수ㅈ */}
          {/* <div className="content__form__error-box">
            <p className="error-box__message">
              {overBalance &&
                (language === "EN"
                  ? "The number you entered is incorrect. Please re-enter the information."
                  : "入力された数字は正しくありません。ご確認のうえ再度入力してください.")}
            </p>
          </div> */}
          <button
            className="content__form__swap-button"
            onClick={handleSwap}
            disabled={swapIsLoading}
          >
            {swapIsLoading ? "Loading..." : "EXCHANGE"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Swap;
