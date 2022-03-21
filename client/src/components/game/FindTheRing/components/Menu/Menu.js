import React from "react";
import Button from "../UI/Button/Button";
import "./Menu.css";

const Menu = ({ gameStart }) => {
  return (
    <>
      <div className="Menu__ring" />
      <Button onClick={gameStart}>시작</Button>
    </>
  );
};

export default Menu;
