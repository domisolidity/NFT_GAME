import React from "react";
import "./Button.css";

const Button = (props) => {
  return (
    <button className="Button" disabled={props.disabled} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;
