import React from "react";

import "./customButton.css";

const CustomButton = (props) => {
  return (
    <button className="customButton2" type={props.type} onClick={props.onClick}>
      {props.content}
    </button>
  );
};

export default CustomButton;
