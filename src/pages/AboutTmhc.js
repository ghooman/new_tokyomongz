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
                  Welcome to Crypto World, travelers on the blockchain sea!
                  <br />
                  It is said that many mysterious hidden treasures lie dormant
                  in this vast cyber world. This is the story of the adventures
                  of some monkeys who lived peacefully in such a corner of the
                  Crypto World. Can we turn the pages of the story now? I'm
                  going to flip it!
                </p>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">01.</span>
                    legendary peach tree
                  </div>
                  <p className="story-content__text">
                    In a certain area of Crypto World, there was one of the
                    legendary treasures, a peach tree that is said to bear
                    10,000 fruits once every 10,000 years. It is said that the
                    fruit has a fantastic taste that cannot be thought of as
                    being of this world. It's a famous local legend, but no one
                    has ever seen the peach tree.
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">02.</span>
                    lucky monkeys
                  </div>
                  <p className="story-content__text">
                    One day, a lost monkey wandered deep into the forest and
                    luckily found the legendary peach tree. That's not all.
                    Surprisingly, the peach tree bore fruit only once every
                    10,000 years! The lucky monkey, who was hungry, bit into a
                    peach fruit that glowed with a mysterious color. Impressed
                    by the amazing taste (this is the best word in our
                    vocabulary!), the monkey immediately returned to town to
                    show off to his friends.
                    <br /> That legendary peach tree really existed! And
                    according to legend, it had 10,000 peaches! I'll even tell
                    you where! This shocking boast quickly spread to millions of
                    monkeys. The monkeys in the town rush out all at once.
                    Because there are only 10,000 peach fruits, right? The first
                    10,000 fish are first come, first served.
                    <br /> The monkeys who heard the information earlier than
                    anyone else and reached the peach tree earlier than anyone
                    else received a peach. As soon as they gulped down their
                    saliva, exchanged glances with their friends, nodded to each
                    other, and ate the peaches all at once...
                    <br /> All 10,000 monkeys have evolved into "Mongz"!
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">03.</span>
                    Birth of Mongz
                  </div>
                  <p className="story-content__text">
                    What is Mongz? Good question.
                    <br /> Like a monkey but not a monkey, a new human being
                    with a brave heart and the power of justice, or should I say
                    a new monkey? Mongz is still a mystery, but I'm sure it will
                    be revealed in the future. (By the way, in our language,
                    it's pronounced "mons". It's not mongs!)
                    <br /> Mongz and his friends will never forget the
                    excitement they felt when they ate the legendary peach
                    fruit, so they rush around the Crypto World in search of
                    more hidden treasures. Crossing the seven seas, crossing a
                    number of unexplored regions, sometimes defeating bad guys,
                    and getting mysterious treasures such as "ERC721" and
                    "Alternative Coin" one after another.
                    <br /> picture? Curious about what kind of big adventure
                    you've had? We will have the opportunity to talk again
                    someday!
                  </p>
                </div>
                <div className="story-content__item">
                  <div className="story-content__title">
                    <span className="story-content__title-num">04.</span>
                    Mongz's new adventure
                  </div>
                  <p className="story-content__text">
                    This is the story of Mongz and others in the Crypto World.
                    <br />
                    Where are the Mongz and what are they doing now that they
                    are becoming legends in their own right? According to the
                    secret information we got, they are now in Tokyo, the
                    world's largest cyber city. It seems that there is a secret
                    club only for them on the top floor of the tallest building
                    "Hills Tower" in the middle of the mega city. Tokyo Mongz
                    Hills Club, the best club in Tokyo, where you can't enter
                    without a secret invitation that only the chosen ones can
                    get. what are they planning to do next...
                    <br /> A new legend of Mongz is about to begin!
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
