import React from "react";

const Chest = ({ chest, openChest }) => {
  const classes = ["Chest"];
  if (chest.isOpen) {
    classes.push("Chest--open");
    if (chest.hasRing) {
      classes.push("Chest--has-ring");
    }
  }

  return (
    <div>
      <div className={classes.join(" ")} onClick={openChest} />
      <style jsx>{`
        .Chest {
          width: calc(300px / 6 - 10px);
          height: calc(300px / 6 - 10px);
          margin: 5px;
          cursor: pointer;
          background: url("/images/chest.png") no-repeat -3px 50% / cover;
        }

        .Chest--open {
          cursor: default;
          background-position: -56px 50%;
          filter: grayscale(1);
        }

        .Chest--has-ring {
          position: relative;
          background-color: #f2ea11;
          filter: grayscale(0);
        }

        .Chest--has-ring::after {
          content: "";
          width: 14px;
          height: 14px;
          position: absolute;
          top: 4px;
          left: 50%;
          transform: translate(-50%);
          background: url("../../../images/ring.gif") no-repeat center / cover;
        }
      `}</style>
    </div>
  );
};

export default Chest;
