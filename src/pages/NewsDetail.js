import "../styles/NewsDetail.scss";
import NewsImg from "../assets/images/news-detail-img.png";
import prevIcon from "../assets/images/prev-icon.svg";
import nextIcon from "../assets/images/next-icon.svg";

const NewsDetail = () => {
  return (
    <>
      <div className="news-detail">
        <div className="news-detail__title-box">
          <span className="category">News</span>
          <span className="title">TOKYO MONGZ GRAND OPEN</span>
          <span className="date">2023-03-28</span>
        </div>

        <div className="news-detail__main">
          <div className="news-detail__img">
            <img src={NewsImg} alt="img" />
          </div>
          <p className="news-detail__text">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div className="news-detail__bottom">
          <div className="prev-next-btn">
            <button className="btn--prev">
              <img src={prevIcon} alt="prev" />
              <div className="btn-text-box">
                <span className="prev-text">PREV</span>
                <span className="btn-text">TOKYO MONGZ x Sunmiya</span>
              </div>
            </button>

            <button className="btn--next">
              <div className="btn-text-box">
                <span className="next-text">NEXT</span>
                <span className="btn-text">TOKYO MONGZ NFT</span>
              </div>
              <img src={nextIcon} alt="next" />
            </button>
          </div>
          <button className="btn--list">LIST</button>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
