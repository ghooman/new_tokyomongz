import React from "react";
import "../styles/Test.scss";
import { useAddress } from "@thirdweb-dev/react";
import { useContract, useContractRead } from "@thirdweb-dev/react";
import Nav from "../components/Nav";

const Test = () => {
  const address = useAddress();

  const { contract } = useContract(
    "0xc02cDE31ef3A0412d73422A0406Af192Ef56912D"
  );
  const { data, isLoading } = useContractRead(contract, "contractType");
  return (
    <>
      <Nav />
      <div className="test-background">
        <div className="test-container">
          <div className="test-inner">
            <div>
              <p className="wallet-address">{address}</p>
              <button className="tmhc-btn">getStakedTMHC</button>
              <p className="view"></p>
            </div>
            <div>
              <p className="wallet-address">{address}</p>
              <button className="momo-btn">getStakedMOMO</button>
              <p className="view"></p>
            </div>
            <div>
              <p className="wallet-address">{address}</p>
              <button className="Team-btn">getStakedTeam</button>
              <p className="view"></p>
            </div>
            <div>
              <p className="wallet-address">{address}</p>
              <button className="stake-btn">stake</button>
              <p className="view"></p>
            </div>
            <div>
              <p className="wallet-address">{address}</p>
              <button className="cal-reward-btn">calReward</button>
              <p className="view"></p>
            </div>
            <div>
              <p className="wallet-address">{address}</p>
              <button className="cal-reward-all-btn">calRewardAll</button>
              <p className="view"></p>
            </div>
            <div>
              <button onClick={() => data}>버튼</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
