import "../styles/News.scss";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const News = () => {
  const testData = [
    {
      id: 1,
      date: "2023.00.00",
      category: "[News]",
      title: "TOKYO MONGZ GRAND OPEN",
    },
    {
      id: 2,
      date: "2023.00.00",
      category: "[Partnership]",
      title: "TOKYO MONGZ GRAND OPEN",
    },
  ];

  // medium 데이터 불러오기

  const [feedItems, setFeedItems] = useState([]);

  useEffect(() => {
    const rssUrl = "https://medium.com/feed/@tmhcofficial";
    const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;

    axios
      .get(apiUrl)
      .then((response) => {
        const data = response.data;
        if (data.status === "ok") {
          setFeedItems(data.items);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  console.log(feedItems);

  axios.get();
  return (
    <>
      <div className="news">
        <h1 className="news__title">NEWS</h1>
        <div className="news__container">
          <ul className="news__item-list">
            {feedItems.map((item, i) => (
              <li key={i}>
                <Link to={item.link} target="_blank">
                  <div
                    className="news__item-img"
                    style={{ backgroundImage: `url(${item.thumbnail})` }}
                  ></div>
                  <div className="news__item-main">
                    <span className="news__item-date">
                      {item.pubDate.slice(0, 10)}
                    </span>
                    <div className="news__item-text-box">
                      <span className="news__item-title">{item.title}</span>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default News;
