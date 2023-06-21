import ecoSystemImg from "../assets/images/eco-system-img.png";
import ecoSystemImg2 from "../assets/images/eco-system-img2.png";
import "../styles/EcoSystem.scss";

const EcoSystem = ({ language }) => {
  return (
    <>
      <div className="eco-system">
        <h1 className="eco-system__title">
          ECO SYSTEM
          <br /> OF
          <br /> MONGZ UNIVERSE
        </h1>
        <div className="eco-system__item1">
          <h2 className="eco-system__item-title">OUR ECO SYSTEM</h2>
          {language === "EN" ? (
            <p className="eco-system__text">
              Mongz Universe is a complex project that connects the metaverse
              and the real world, undertaken by HashLink, a wholly-owned
              subsidiary of a publicly traded company.The grand story that began
              with the Tokyo Mongz Hills Club, which raised approximately 200
              million yen through minting in November 2022, has evolved into the
              Mongz UNIVERSE.The Mongz UNIVERSE will be a unique economic zone
              centered on the Mongz Universe Coin (MUC), a CEX-type reserve
              currency that is scheduled to be listed in 2023.The MUC is named
              after the Japanese fairy tale "Momotaro.MUC will be linked to the
              Mongz (Monkey), INU (Dog), and KIJI (Pheasant) DEX COINS.
            </p>
          ) : (
            <p className="eco-system__text">
              「Mongz
              Universe」は、上場企業の100％子会社「HashLink」が手掛けるメタバースと現実世界を繋ぐ複合プロジェクトです。2022年11月のミンティングで約2億円を調達したTokyo
              Mongz Hills Clubから始まった壮大な物語はMongz
              UNIVERSEへと進化し、2023年中に上場を予定してるCEX型基軸通貨「MUC（Multi
              Universe
              Coin）」が中心となる独自の経済圏を築きます。童話「桃太郎」の物語にちなみ、MUCはサル（Mongz）・イヌ・キジそれぞれのDEX
              COINと連携します。
            </p>
          )}
          <div className="eco-system-img">
            <img src={ecoSystemImg} alt="eco-system" />
          </div>
          {language === "EN" ? (
            <p className="eco-system__text">
              The CEX-type reserve currency "MUC" will be linked to three DEX
              COINs.
            </p>
          ) : null}
          <div className="item1__box">
            <h3 className="eco-system__item-sub-title">MZC (Mongz Coin)</h3>
            {language === "EN" ? (
              <p className="eco-system__text">
                MZC is a unique token that is obtained as a reward for staking
                the Genesis "Tokyo Mongz Hills Club (TMHC)" and "PEACHz.MOMO
                (MOMO)", which is scheduled for minting from the end of April to
                the beginning of May 2023.The rewards will also be strongly
                boosted by the team staking a combination of TMHC and MOMO.
                <br />
                <br />
                MZC can be traded 1:1 with MUC.
                <br /> The TMHC staking system will be ready for unveiling at
                the end of March.
              </p>
            ) : (
              <p className="eco-system__text">
                MZCは、ジェネシスである「Tokyo Mongz Hills
                Club（TMHC）」や、2023年4月末～5月上旬にミンティングを予定している「PEACHz.MOMO（MOMO）」をステーキングすることで報酬として得られる独自トークンとなります。また、TMHCとMOMOを組み合わせてチームステーキングすることで報酬は強力にブーストされます。
                <br />
                <br />
                MZCはMUCと1:1でトレードすることができます。
                <br />
                TMHCのステーキングシステムは3月末にお披露目できる予定です。
              </p>
            )}
          </div>
          <div className="item1__box">
            {language === "EN" ? (
              <h3 className="eco-system__item-sub-title">INU COIN (TBD)</h3>
            ) : (
              <h3 className="eco-system__item-sub-title">INU COIN（仮）</h3>
            )}
            {language === "EN" ? (
              <p className="eco-system__text">
                Mongz Universe is currently working on several game projects as
                INU projects.
                <br />
                You can earn INU COIN (tentative) by playing P2E NFT games.
              </p>
            ) : (
              <p className="eco-system__text">
                現在、Mongz
                UniverseではINUプロジェクトとして、複数のゲームプロジェクトを進行しております。
                <br />
                P2EのNFTゲームをプレイすることで、INU
                COIN（仮）を獲得することができます。
              </p>
            )}
          </div>
          <div className="item1__box">
            {language === "EN" ? (
              <h3 className="eco-system__item-sub-title">KIJI COIN (TBD)</h3>
            ) : (
              <h3 className="eco-system__item-sub-title">KIJI COIN（仮）</h3>
            )}
            {language === "EN" ? (
              <p className="eco-system__text">
                The KIJI project is a project that takes place in the real
                world.
                <br />
                The first phase will be the development of a unique apparel
                brand with JIN, the founder of MeltdownChildren.
              </p>
            ) : (
              <p className="eco-system__text">
                KIJIプロジェクトはリアルワールドが舞台となるプロジェクトです。第一弾は、アパレルと連携したNFTコレクションを手掛けるMeltdownChildrenのJIN氏とタッグを組み、独自のアパレルブランドの展開を予定しております。
              </p>
            )}
          </div>
          <div className="item1__box">
            {language === "EN" ? (
              <p className="eco-system__text">
                Each of the three coins can be swapped with MUC.
                <br />
                Each of the three coins can be swapped with MUC, and we are
                preparing to provide more utility to each of them.
                <br />
                <br />
                Let's explore the Mongz Universe together!
              </p>
            ) : (
              <p className="eco-system__text">
                3つのコインをそれぞれMUCとスワップが可能であり、それぞれにさらなるユーティリティを備えられるよう準備しております。
                <br />
                <br />
                一緒にMongz Universeへ飛び立ちましょう！
              </p>
            )}
          </div>
        </div>

        <div className="eco-system__item2">
          {language === "EN" ? (
            <p className="eco-system__item-sub-title">
              Main Token
              <br /> Multi Universe Coin (CEX to be Listed / Targeting for 2023
              3Q)
            </p>
          ) : (
            <p className="eco-system__item-sub-title">
              メイントークン
              <br /> MUC（Multi Universe Coin ）：CEXに上場予定（2023年3Q目標）
            </p>
          )}
          {language === "EN" ? (
            <p className="eco-system__item-sub-title">
              DEX Token
              <span className="purple">
                MZC : Earning with TMHC & MOMO Staking
              </span>
              <span className="blue">INC：MONGZ Universe P2E Games</span>
              <span className="yellow">
                KIC : MONGZ Universe-related merchants and fashionable apparel
              </span>
            </p>
          ) : (
            <p className="eco-system__item-sub-title">
              DEXトークン
              <span className="purple">
                MZC(MongZ Coin) ：TMHC & MOMO ステーキングで獲得
              </span>
              <span className="blue">
                INC(INU Coin)：Mongz Universe P2E ゲーム用に設計
              </span>
              <span className="yellow">
                KIC（KIJI
                Coin）：KIJIプロジェクトにおけるアパレルやフィギュアなど、現実世界でのフィジカルコンテンツ
              </span>
            </p>
          )}
          <div className="eco-system-img2">
            <img src={ecoSystemImg2} alt="eco-system" />
          </div>
        </div>
      </div>
    </>
  );
};

export default EcoSystem;
