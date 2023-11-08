import React from "react";
import "../App.css";
import "../styles/Inspection.scss";

const Inspection = () => {
  return (
    <>
      <div className="inspection-background">
        <div className="back-img">
          <p className="text">
            2023 年 11 月 7 日(火) 14:00 〜 2023 年 11 月 8 日(水)
            15:00の間、メンテナンスのために一時的にサービスを停止しております。
            大変ご不便をおかけいたしますが、メンテナンス終了まで今しばらくお待ちください。
            <br />
            <br />
            The service will be temporarily suspended from 14:00 on Tuesday,
            November 7, 2023 to 15:00 on Wednesday, November 8, 2023 (JST) due
            to maintenance. We apologize for the inconvenience, but please wait
            for a while until the maintenance is completed.
          </p>
        </div>
      </div>
    </>
  );
};

export default Inspection;
