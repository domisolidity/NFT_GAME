import React from "react";
import "./topnav.css";
import { useLocation, Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import topbar_items from "../../../assets/JsonData/topbar_router.json";
import logo from "../../../logo.svg";

const TopNav = () => {
  const location = useLocation();

  const activeItem = topbar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <div className="topnav">
      <div className="topnav__logo">
        <img src={logo} alt="company logo" />
      </div>
      <Box className="topnav__right">
        {topbar_items.map((item, index) => (
          <Link to={item.route} key={index}>
            <TopItem title={item.display_name} active={index === activeItem} />
          </Link>
        ))}
      </Box>
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
