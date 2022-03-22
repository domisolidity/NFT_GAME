import React from "react";
import "./topnav.css";
import { useLocation, Link } from "react-router-dom";

import topbar_items from "../../assets/JsonData/topbar_router.json";

const TopNav = () => {
  const location = useLocation();

  const activeItem = topbar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className="topnav">
      {topbar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <TopItem title={item.display_name} active={index === activeItem} />
        </Link>
      ))}
    </div>
  );
};

const TopItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <div className="topnav__item">
      <div className={`topnav__item-inner ${active}`}>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

export default TopNav;
