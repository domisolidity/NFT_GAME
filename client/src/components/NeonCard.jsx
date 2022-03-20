import React from "react";
import "./neonCard.css";

const NeonCard = (props) => {
  console.log(props.type === "first");
  return (
    <div className="neon">
      {props.type == 1 ? (
        <span className="type__first">{props.text}</span>
      ) : (
        <span className="type__second">{props.text}</span>
      )}
    </div>
  );
};

export default NeonCard;
