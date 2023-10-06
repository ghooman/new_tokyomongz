import "../styles/Terms.scss";

const Transaction = () => {
  return (
    <>
      <div className="terms-background">
        <div className="terms-inner">
          <div className="terms-title">特定商取引法に基づく表記</div>
          <div className="terms-box">
            <span className="box__top-text">販売業者</span>
            <span className="box__bottom-text">株式会社HashLink</span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">所在地</span>
            <span className="box__bottom-text">
              東京都新宿区若葉2丁目7番地 ビデオフォーカスビル2階
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">販売責任者</span>
            <span className="box__bottom-text">代表取締役 李 炫雨</span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">お問い合わせ先</span>
            <span className="box__bottom-text">
              <a href="mailto:tmhc_support@hashlink.jp">
                tmhc_support@hashlink.jp
              </a>
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">WEBサイト</span>
            <span className="box__bottom-text">
              <a href="https://www.tokyomongzhillsclub.com/" target="_blank">
                https://www.tokyomongzhillsclub.com/
              </a>
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">販売価格</span>
            <span className="box__bottom-text">
              購入ページに記載された税込み価格に基づきます。
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">販売価格以外の必要料金</span>
            <span className="box__bottom-text">
              インターネット接続には別途、ご契約の通信事業者への通信料が発生します。携帯電話からのご利用には、携帯通信料又はパケット通信料が発生します。また、購入時にはイーサリアムブロックチェーンのネットワーク手数料（ガス代）がかかります。
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">支払い時期および方法</span>
            <span className="box__bottom-text">
              MATIC（Polygon）またはクレジットカードでのお支払いが可能です。購入と同時にお支払いとなります
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">商品の提供時期</span>
            <span className="box__bottom-text">
              購入手続き完了後、リビールの操作を行っていただくことでウォレットに入庫されます。リビールについては公式DiscordおよびTwitterからのお知らせでご案内いたします。
            </span>
          </div>
          <div className="terms-box">
            <span className="box__top-text">返品・交換</span>
            <span className="box__bottom-text">
              商品の特性上、返品または交換は一切お受け出来ません。
            </span>
          </div>
          <p class="terms-text">© 2023 HashLink All rights reserved.</p>
        </div>
      </div>
    </>
  );
};

export default Transaction;
