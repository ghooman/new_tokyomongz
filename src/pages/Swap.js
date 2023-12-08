import React, { useEffect, useRef, useState } from "react";
import "../styles/Swap.scss";
import DonwArrow from "../assets/images/SwapArrow.svg";

const Swap = ({ language }) => {
  // 바꾸고 싶은 코인 수
  const [coinAmount, setCoinAmount] = useState("");
  // 보유한 코인 수
  const [coinBalance, setCoinBalance] = useState(1000);
  // 보유한 코인 수보다 많은 코인을 입력했을 때
  const [overBalance, setOverBalance] = useState(null);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setCoinAmount(inputValue);
  };

  const handleMaxButton = (e) => {
    e.preventDefault();
    setCoinAmount(coinBalance);
  };
  const handleSwapButton = (e) => {
    e.preventDefault();
    if (coinAmount > coinBalance) {
      setOverBalance(true);
    } else {
      setOverBalance(false);
    }
    console.log(`환전할 코인 수: ${coinAmount}`);
  };

  // 환전 금액 입력시 오른쪽 끝으로 스크롤 이동 합니다.
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      const inputElement = inputRef.current;
      inputElement.scrollLeft = inputElement.scrollWidth;
    }
  }, [coinAmount]);

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
              Your Balance is <span className="my-amount">{coinBalance}</span>{" "}
              MZC
            </>
          ) : (
            <>
              あなたのMZC残高は <span className="my-amount">{coinBalance}</span>{" "}
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
            <img className="arrow" src={DonwArrow} alt="arrow" />
            <img className="arrow" src={DonwArrow} alt="arrow" />
            <img className="arrow" src={DonwArrow} alt="arrow" />
          </div>

          <div className="content__preview-box">
            <input
              ref={inputRef}
              className="content__preview-box__amount"
              value={coinAmount}
              readOnly
            />
            <span className="amount__label">MUC</span>
          </div>
          <div className="content__form__error-box">
            <p className="error-box__message">
              {overBalance &&
                (language === "EN"
                  ? "The number you entered is incorrect. Please re-enter the information."
                  : "入力された数字は正しくありません。ご確認のうえ再度入力してください.")}
            </p>
          </div>
          <button
            className="content__form__swap-button"
            onClick={handleSwapButton}
          >
            EXCHANGE
          </button>
        </form>
      </div>
    </div>
  );
};

export default Swap;
