import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Nav.scss";
import { setActiveTab } from "../store";

const Nav = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state) => state.activeTab.num);

  const tabMenuData = [
    {
      id: 0,
      title: "Tokyo Mongz Hills Club",
      link: "/tmhc",
    },
    {
      id: 1,
      title: "MUC - MOMO",
      link: "/muc-momo",
    },
    {
      id: 2,
      title: "Mongz X MOMO",
      link: "/team",
    },
    // {
    //   id: 3,
    //   title: "BlockChain Test",
    //   link: "/test",
    // },
  ];

  return (
    <>
      <div className="nav-background">
        <ul className="nav-header">
          {tabMenuData.map((item) => (
            <li
              className={activeTab === item.id ? "clicked" : ""}
              key={item.id}
            >
              <Link
                to={item.link}
                onClick={() => dispatch(setActiveTab(item.id))}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Nav;
