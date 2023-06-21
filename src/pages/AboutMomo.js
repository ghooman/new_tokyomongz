import titleImg from "../assets/images/about-momo-title.png";
import tmhcCoin from "../assets/images/mzc-coin-icon.png";
import tmhcMomo from "../assets/images/tmhc-momo-team.png";
import momoInu from "../assets/images/momo-inu-team.png";
import aboutMomo1 from "../assets/images/about-momo-img1.png";
import aboutMomo2 from "../assets/images/about-momo-img2.png";
import aboutMomo3 from "../assets/images/about-momo-img3.png";
import aboutMomo4 from "../assets/images/about-momo-img4.png";
import momoVid from "../assets/about-momo-vid.mp4";

import "../styles/AboutMomo.scss";

const AboutMomo = ({ language }) => {
  return (
    <>
      <div className="about-momo">
        <div className="about-momo__video-box">
          <video
            src={momoVid}
            autoPlay
            muted
            loop
            className="about-momo__video"
          ></video>
        </div>
        <div className="about-momo__main">
          <div className="about-momo__main-header-img">
            <img src={titleImg} alt="logo" />
          </div>
          <div className="about-momo__item1">
            <h2 className="about-momo__title">Project Concept</h2>
            <div>
              <h3 className="about-momo__sub-title">
                Mongz Universe 2nd NFT Project : PEACHz.MOMO
              </h3>
              {language === "EN" ? (
                <p className="about-momo__text">
                  This legendary peach turned into a spirit of peach, "MOMO",
                  and release as NFT.
                  <br /> The first NFT collection Tokyo Mongz Hills Club, known
                  as TMHC, was inspired by the "Monkey" from the Japanese fairy
                  tale "Momotaro".
                  <br /> The legendary peach that gifted Mongz with wisdom and
                  courage is now coming to the Crypto land as 'MOMO', a peach
                  spirit that can explode your staking rewards!
                </p>
              ) : (
                <p className="about-momo__text">
                  Tokyo Mongz Hills
                  Clubの物語に登場する伝説の桃が、桃の精霊「MOMO」となりNFTとしてリリース。
                  <br />
                  TMHCとして知られる最初のNFTコレクションTokyo Mongz Hills
                  Clubは、日本のおとぎ話「桃太郎」の「猿」にインスパイアされました。
                  <br />
                  Mongz
                  に知恵と勇気を与えた伝説の桃が、ステーキング報酬をブーストさせる桃の精霊「MOMO」としてCrypto
                  Worldにやってくる！
                </p>
              )}
            </div>
            <div>
              <h3 className="about-momo__sub-title">NFT Features</h3>
              {language === "EN" ? (
                <p className="about-momo__text">
                  - Full 3D X Full body Modeling for Metaverse & Game
                  <br /> - Support with webGL : Zoom-In, Zoom-Out, Spinning
                  <br /> - 3D PFP NFT Project
                  <br />- 4-level rarity system: UR / SR /R / Common
                </p>
              ) : (
                <p className="about-momo__text">
                  - メタバース & ゲームに対応できるフル3D＆全身モデリング
                  <br />
                  - webGLによるサポート : ズームイン、ズームアウト、スピン
                  <br />- 4段階のレアリティシステム：UR/SR/R/Common
                </p>
              )}
            </div>
          </div>

          <div className="about-momo__item2">
            <h2 className="about-momo__title">Utility</h2>
            <div className="item2__box">
              {language === "EN" ? (
                <h3 className="about-momo__sub-title">
                  001 Get MZC (Mongz Coin)
                </h3>
              ) : (
                <h3 className="about-momo__sub-title">
                  001 MZC（モンズコイン）をゲット
                </h3>
              )}

              <div className="tmhc-coin-img">
                <img src={tmhcCoin} alt="tmhc-coin" />
              </div>

              {language === "EN" ? (
                <p className="about-momo__text">
                  We provide a staking system, and MOMO NFT holders can receive
                  about 0.8 MZC to 1 MZC daily as a reward through staking.
                  <br /> MZC can be exchanged 1:1 with MUC, which is scheduled
                  to be listed on CEX.
                </p>
              ) : (
                <p className="about-momo__text">
                  Mongz Universeではステーキングシステムを提供しており、MOMO NFT
                  ホルダーはステーキングを通じて報酬として毎日約 0.8 MZC から 1
                  MZC を受け取ることができます。
                  <br />
                  MZCは、CEXに上場予定のMUCと1:1で交換可能です。
                </p>
              )}
            </div>
            <div className="item2__box">
              <h3 className="about-momo__sub-title">
                002 Boost with TMHC Get Extra MZC
              </h3>

              <div className="tmhc-momo-img">
                <img src={tmhcMomo} alt="tmhc-momo" />
              </div>

              {language === "EN" ? (
                <p className="about-momo__text">
                  Up to 5 MOMO NFTs and TMHC NFTs can be Team Staking, and up to
                  1200% of MZC can be additionally received depending on the
                  rarity of MOMO NFTs in Team Staking.
                  <br />
                  UR: about 30MZC/day
                  <br />
                  SR: about 10MZC/day
                  <br />
                  R: about 3MZC/day
                  <br />
                  C: about 1MZC/day
                </p>
              ) : (
                <p className="about-momo__text">
                  MOMO NFTとTMHC NFTはチームステーキングが可能で、TMHC
                  NFT1つにつき最大4個のMOMO
                  NFTをチームとしてセットすることができます
                  <br />
                  チームステーキングではMOMO
                  NFTのレアリティに応じて最大1200%のMZCを追加で受け取ることができます。
                  <br />
                  UR: 約 30MZC/日
                  <br />
                  SR: 約 10MZC/日
                  <br />
                  R: 約 3MZC/日
                  <br />
                  C: 約 1MZC/日
                </p>
              )}
            </div>
            <div className="item2__box">
              {language === "EN" ? (
                <h3 className="about-momo__sub-title">003 P2E NFT GAMES</h3>
              ) : (
                <h3 className="about-momo__sub-title">003 P2E NFT ゲーム</h3>
              )}

              <div className="momo-inu-img">
                <img src={momoInu} alt="momo-inu" />
              </div>

              {language === "EN" ? (
                <p className="about-momo__text">
                  Mongs Universe has focused on developing NFT X P2E Game.
                  <br />
                  We are preparing to launch the game in 2023~2024 by utilizing
                  the game development & operation capabilities of the parent
                  company, a listed company and game
                  <br /> specialist in Japan, and Mongs Universe's NFT will play
                  an important role in the game.
                </p>
              ) : (
                <p className="about-momo__text">
                  Mongs Universe は、NFT X P2E ゲームの開発に注力しています。
                  <br />
                  2023年から2024年でのゲーム発売に向けて、日本の上場企業でゲームのスペシャリストである親会社のゲーム開発・運営力を活用して準備を進めており、Mongs
                  UniverseのNFTはゲームにおいて重要な役割を果たします。
                </p>
              )}
            </div>
            <div className="item2__box">
              <h3 className="about-momo__sub-title">004 Community Paths</h3>
              {language === "EN" ? (
                <p className="about-momo__text">
                  Participation in various events held by the Mongs Universe
                  community with approximately 20K users.
                  <br /> Distribution of AL for Mongs Universe NFT
                </p>
              ) : (
                <p className="about-momo__text">
                  約20,000人のユーザーがいるMongs
                  Universeコミュニティが開催するさまざまなイベントに参加いただくことができます。
                  <br />
                  Mongs Universe NFT の
                  AL配布等にあたり優先的に受け取っていただくことができる予定です。
                </p>
              )}
            </div>
          </div>

          <div className="about-momo__item3">
            {language === "EN" ? (
              <h2 className="about-momo__title">About Minting</h2>
            ) : (
              <h2 className="about-momo__title">ミンティングについて</h2>
            )}
            <div>
              {language === "EN" ? (
                <p className="about-momo__sub-title">
                  Mainnet : Ethereum
                  <br />
                  TOTAL SUPPLY <span className="yellow-text">10,000EA</span>
                </p>
              ) : (
                <p className="about-momo__sub-title">
                  チェーン：イーサリアムブロックチェーン
                  <br />
                  供給量 <span className="yellow-text">10,000個</span>
                </p>
              )}
              {language === "EN" ? (
                <p className="about-momo__small-text">
                  <span className="small-yellow1">Ultra Rare 200EA (2%)</span>
                  <span className="small-yellow2">
                    Super Rare 1,000EA (10%)
                  </span>
                  <span className="small-yellow3">Rare 3,000EA (30%)</span>
                  Common 5,800EA (58%)
                </p>
              ) : (
                <p className="about-momo__small-text">
                  <span className="small-yellow1">Ultra Rare 200個 (2%)</span>
                  <span className="small-yellow2">
                    Super Rare 1,000個 (10%)
                  </span>
                  <span className="small-yellow3">Rare 3,000個 (30%)</span>
                  Common 5,800個 (58%)
                </p>
              )}
              {language === "EN" ? (
                <p className="about-momo__sub-title">
                  Mint Schedule : TBD(May 2023 target)
                  <br /> Mint Price : TBD
                </p>
              ) : (
                <p className="about-momo__sub-title">
                  ミント日時：未定（2023年5月予定）
                  <br /> ミント価格：未定
                </p>
              )}
            </div>
          </div>

          <div className="about-momo__item4">
            <h2 className="about-momo__title">SneakPeak & Main Visual</h2>
            <ul className="momo-img-list">
              <li>
                <img src={aboutMomo1} alt="about-momo1" />
              </li>
              <li>
                <img src={aboutMomo2} alt="about-momo2" />
              </li>
              <li>
                <img src={aboutMomo3} alt="about-momo3" />
              </li>
              <li>
                <img src={aboutMomo4} alt="about-momo4" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutMomo;
