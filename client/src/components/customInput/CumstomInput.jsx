import "./customInput.css";

import React from "react";

const CustomInput = (props) => {
  return (
    <div className="Custominput">
      <div className="CustomInput__search">
        <input
          type={props.type}
          placeholder={props.placeholder}
          onChange={props.onChange}
          value={props.value}
        />
      </div>
    </div>
  );
};

export default CustomInput;
