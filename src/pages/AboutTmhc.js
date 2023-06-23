import React, { useEffect, useRef, useState } from "react";
import aboutVideo from "../assets/about-tmhc.mp4";
import titleImg from "../assets/images/about-tmhc-title.png";
import "../styles/AboutTmhc.scss";

const AboutTmhc = ({ language }) => {
  const [more, setMore] = useState(false);
  const btnRef = useRef();
  const mainRef = useRef();
  const handleMore = () => {
    setMore((prev) => !prev);
    console.log(more);
  };
  console.log(more);

  useEffect(() => {
    if (more) {
      btnRef.current.style.transform = "rotate(180deg)";
      mainRef.current.classList.add("main-more");
    } else {
      btnRef.current.style.transform = "";
      mainRef.current.classList.remove("main-more");
    }
  }, [more]);

  return (
    <>
      <div className="about-tmhc">
        <div className="about-tmhc__video-box">
          <video
            src={aboutVideo}
            autoPlay
            muted
            loop
            className="about-video"
          ></video>
        </div>
        {language === "EN" ? (
          <div className={`story-background ${more ? "more-en" : ""}`}>
            <div className="story-content-container">
              <div className="story-header">
                <div className="story-header__title-img">
                  <img src={titleImg} alt="title" />
                </div>
                <p className="story-header__sub">The Mongz : Beginz</p>
              </div>

              <div className="story-content-main" ref={mainRef}>
                <p className="story-content__text">
                  Welcome to the Crypto World, travelers on the blockchain sea!
                  <br />
                  There are many mysterious treasures hidden in this vast cyber
                  world. Now, I will tell you a story of the adventures of
                  monkeys who lived peacefully in such a corner of the Crypto
                  World. Can we turn the pages of the story now? I'm going to
                  flip it!
                </p>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">01.</span>
                    The Legendary Peach Tree
                  </div>
                  <p className="story-content__text">
                    In a certain area of Crypto World, there was one of the
                    legendary treasures, a peach tree that is told to bear
                    10,000 fruits once every 10,000 years. It is said that the
                    fruit has a fantastic taste that cannot be thought of as
                    being of this world. It's a famous local legend, but no one
                    has ever seen the peach tree.
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">02.</span>
                    Lucky Monkeys
                  </div>
                  <p className="story-content__text">
                    Once upon a time, a lost monkey wandered deep into the
                    forest and luckily found the legendary peach tree. That's
                    not all. Surprisingly, the peach tree was full of peaches!
                    The hungry monkey took a bite of a peach that glowed
                    mysteriously. Impressed by its eye-opening taste, the monkey
                    immediately returned to town to share this experience,
                    showing himself off.
                    <br /> "The legendary peach tree really exists, and just
                    like how it was told in the legend, it was fully bore with
                    lots of peaches! I'll even take you guys to the tree!" said
                    the proud monkey. The shocking news quickly spread to
                    millions of monkeys, as the monkeys in the town rushed out
                    all at once, each of them in a hurry. The 10,000 peaches
                    were ripe and ready to be consumed by whoever arrived first.
                    <br />
                    Each of the monkeys who were the first to arrive at the tree
                    finally got their hands on the legendary peach. They
                    exchanged glances and nodded their heads as they devoured
                    the peaches. The 10,000 peaches were all consumed... Just
                    like that, 10,000 monkeys have evolved into "Mongz"!
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">03.</span>
                    The Birth of The Mongz
                  </div>
                  <p className="story-content__text">
                    Who are the Mongz? Now that’s a good question.
                    <br /> A Mongz can be mistaken as a monkey because it looks
                    like one, but it is not really a monkey. It's a whole new
                    type of human species. A Mongz is also known to have a brave
                    heart, full of justice. While the existence of the Mongz
                    remains mysterious, I'm sure it will reveal sometime in the
                    future. Oh, and in 'human words,' they are supposed to be
                    pronounced "Mons," not “Mongs”. Please make sure to call
                    them correctly. Otherwise, you might offend them!
                    <br /> The Mongz will never forget the excitement of when
                    they first had the legendary peach, so they rush around the
                    Crypto World in search of more hidden treasures. Crossing
                    the seven seas, numbers of unexplored regions, and sometimes
                    even defeating the ‘bad guys,’ the Mongz has been collecting
                    mysterious treasures such as "ERC721" and "Alternative
                    Coin," one after another.
                    <br /> Wanna know more about Mongz? I will be back again to
                    talk to you again, so stay tuned!
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">04.</span>
                    Mongz’s New Adventure
                  </div>
                  <p className="story-content__text">
                    This is the story of Mongz and the others in the Crypto
                    World.
                    <br /> Where are the Mongz, and what are they up to at the
                    moment? Are they becoming legends themselves? According to
                    the most recent information we have, they are secretly in
                    Tokyo, the world's largest cyber city. There is a special
                    club built for them on the top floor of the tallest building
                    in the city, "Hills Tower," located in the center of Tokyo.
                    It is called "The Tokyo Mongz Hills Club." Only the selected
                    few are invited to enter the club. What are they planning to
                    do next? The legend of Mongz is about to begin!
                  </p>
                </div>
              </div>
            </div>
            <button
              className="story-content__btn"
              onClick={handleMore}
              ref={btnRef}
            >
              more
            </button>
          </div>
        ) : (
          <div className={`story-background ${more ? "more-jp" : ""}`}>
            <div className="story-content-container">
              <div className="story-header">
                <div className="story-header__title-img">
                  <img src={titleImg} alt="title" />
                </div>
                <p className="story-header__sub">The Mongz : Beginz</p>
              </div>

              <div className="story-content-main" ref={mainRef}>
                <p className="story-content__text">
                  ブロックチェーンの海を旅するみなさま、Crypto Worldへようこそ！
                  <br />
                  この広大な電脳の世界には、数多の不思議な秘宝が眠っていると言われています。これはそんなCrypto
                  Worldの片隅で平和に暮らしていたとある猿たちの冒険の物語です。さっそく物語のページをめくってもいいですか？めくっていきますね！
                </p>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">01.</span>
                    伝説の桃の木
                  </div>
                  <p className="story-content__text">
                    Crypto
                    Worldのとあるエリア、ここには伝説の秘宝のひとつ、1万年に1度、1万個の実をつけると言われる桃の木がありました。その実はこの世のものとは思えないほどの幻想的な美味しさだと言われています。地元では有名な伝説なのですが、誰もその桃の木を見たことはありません。
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">02.</span>
                    幸運な猿たち
                  </div>
                  <p className="story-content__text">
                    ある日、道に迷った一匹の猿が、森深くをさまよい歩いた末に幸運にもその伝説の桃の木を見つけました。それだけではありません。なんと、その桃の木は1万年に1度の実をつけていたのです！お腹がペコペコだったそのラッキーなお猿さんは、不思議な色に光る桃の実にかじりつきます。驚くほどの美味しさ（我々の語彙ではこの表現が精一杯です！）に感動した猿は、すぐさま町に戻って仲間たちに自慢しました。
                    あの伝説の桃の木が本当にあった！そして伝説の通り、1万個の桃の実をつけていた！場所も教えてやるよ！この衝撃的な自慢話はあっというまに何百万匹もの猿たちに広がりました。町中の猿たちが我先にと一斉に飛び出します。だって桃の実は1万個しかないんですよ？先着1万匹の早いもの勝ちなんですから。
                    誰よりも早く情報を聞きつけ、誰よりも早く桃の木にたどり着いた猿たちはそれぞれ一つずつ桃を手にします。ゴクリと唾を飲み込み、仲間たちと目を見合わせ、うなずき合い、一斉に桃を口にした途端・・・
                    なんと1万匹の猿たちはみんな、「Mongz」に進化してしまったのです！
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">03.</span>
                    Mongzの誕生
                  </div>
                  <p className="story-content__text">
                    Mongzとは何かって？ごもっともな質問です。
                    猿のようで猿ではない、勇敢な心と正義のパワーを持った新人類、いや新猿類と言いましょうか。まだまだ謎の多いMongzですが、これからきっと明らかになっていくことでしょう。（ちなみに我々の言葉では「モンズ」と読みます。モングズではないですよ！）
                    そんなMongzたちは伝説の桃の実を食べた時のあの感動を忘れられず、さらなる秘宝を探しにCrypto
                    Worldをノリと勢いで駆け巡ります。七つの海を渡り、数々の秘境を越え、時には悪者たちを退治して、「ERC721」や「Alternative
                    Coin」といった名の不思議な秘宝を次々にゲットすることとなりました。
                    え？どんな大冒険をしてきたのか内容が気になる？またいつかお話する機会があるでしょう！
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">04.</span>
                    Mongzたちの新たな冒険
                  </div>
                  <p className="story-content__text">
                    これがCrypto Worldで語り継がれるMongzたちの物語です。
                    もはや彼ら自身が伝説になりつつある中、Mongzたちは今どこで何をしているのでしょうか？我々が秘密裏に得た情報ですと、どうやら彼らは今、世界最大の電脳都市「Tokyo」にいるようです。メガシティのど真ん中にそびえ立つ一番高いビル「Hills
                    Tower」の最上階に、彼らだけの秘密Clubがあるそうな。選ばれし者しか手にできない秘密の招待状がないと足を踏み入れられないという、Tokyoで最高のClub「Tokyo
                    Mongz Hills Club」
                    彼らは次に何を企んでいるのでしょうか・・・
                    Mongzの新しい伝説が、今まさに幕を開けようとしています！
                  </p>
                </div>
              </div>
            </div>
            <button
              className="story-content__btn"
              onClick={handleMore}
              ref={btnRef}
            >
              more
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AboutTmhc;
