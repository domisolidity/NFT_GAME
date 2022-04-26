import React from "react";
import Button from "../UI/Button/Button";

const Menu = ({ gameStart }) => {
  return (
    <>
      <div className="Menu__ring" />
      <Button onClick={gameStart}>시작</Button>
      <style jsx>{`
        .Menu__ring {
          height: 100px;
          width: 100px;
          margin: 0 auto 20px;
          background: url("../../images/ring.gif") no-repeat center / cover;
        }
      `}</style>
    </>
  );
};

export default Menu;
