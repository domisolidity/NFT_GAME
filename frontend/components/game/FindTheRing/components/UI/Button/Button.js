import React from "react";

const Button = (props) => {
  return (
    <>
      <button className="Button" disabled={props.disabled} onClick={props.onClick}>
        {props.children}
      </button>
      <style jsx>{`
        .Button {
          width: 100%;
          padding: 5px;
          display: block;
          text-align: center;
          border: 4px solid black;
          cursor: pointer;
          text-decoration: none;
          margin-bottom: 10px;
          background: linear-gradient(to bottom, #f2ea11 49%, #f7b503 50%);
          box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.4);
          font-size: 25px;
          font-weight: bold;
          transition: 0.3s;
          color: #333344;
        }

        .Button:focus {
          outline: none;
        }

        .Button:disabled {
          color: initial;
          filter: grayscale(1);
        }
      `}</style>
    </>
  );
};

export default Button;
