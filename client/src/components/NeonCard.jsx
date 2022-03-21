import React from "react";
import "./neonCard.css";

const NeonCard = (props) => {
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
