import React from "react";
import "../App.css";
import "../styles/Inspection.scss";

const Inspection = () => {
  return (
    <>
      <div className="inspection-background">
        <div className="back-img">
          <p className="text">
            2023 年 11 月 22 日(水) 18:00 〜
            20:00の間、メンテナンスのために一時的にサービスを停止しております。
            大変ご不便をおかけいたしますが、メンテナンス終了まで今しばらくお待ちください。
            <br />
            <br />
            The service will be temporarily suspended from 18:00 on wednesday,
            November 22, 2023 to 20:00 on Wednesday, November 22, 2023 (JST) due
            to maintenance. We apologize for the inconvenience, but please wait
            for a while until the maintenance is completed.
          </p>
        </div>
      </div>
    </>
  );
};

export default Inspection;
