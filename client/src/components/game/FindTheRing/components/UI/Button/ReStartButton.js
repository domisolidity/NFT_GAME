import React from "react";
import "./Button.css";

const ReStartButton = (props) => {
  return (
    <button className="Button" disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ReStartButton;
