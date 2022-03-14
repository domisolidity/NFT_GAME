import React from "react";
import "./topnav.css";
import { useLocation, Link } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";

import topbar_items from "../../../assets/JsonData/topbar_router.json";
import logo from "../../../assets/logo.png";

const TopNav = () => {
  const location = useLocation();

  const activeItem = topbar_items.findIndex(
    (item) => item.route === location.pathname
  );

  return (
    <Flex className="topnav">
      {/* <Box className="topnav__logo">
        <Image src={logo} alt="company logo" />
      </Box> */}
      {topbar_items.map((item, index) => (
        <Link to={item.route} key={index}>
          <TopItem title={item.display_name} active={index === activeItem} />
        </Link>
      ))}
    </Flex>
  );
};

const TopItem = (props) => {
  const active = props.active ? "active" : "";

  return (
    <Box className="topnav__item">
      <Box className={`topnav__item-inner ${active}`}>
        <span>{props.title}</span>
      </Box>
    </Box>
  );
};

export default TopNav;
