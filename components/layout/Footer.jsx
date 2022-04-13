import React from "react";
import Script from "next/script";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__item">
        © 2022 Doremifa Solidity. All rights reserved.
      </div>
      <div className="footer__item">
        <a href="https://github.com/domisolidity/NFT_GAME">
          <i className="bx bxl-github" />
        </a>
      </div>
      <style jsx>{`
        .footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.8rem;
          padding: 1rem 12rem;
        }

        .footer__item {
        }

        .footer__item > a > i {
          font-size: 2rem;
        }
        .footer__item > a > i:hover {
          color: rgb(15, 38, 62);
          text-shadow: 0 0 0 transparent, 0 0 0.3rem #d1d2d0,
            0 0 0.1rem rgba(38, 149, 255, 0.5), 0 0 0.1rem #d1d2d0,
            0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0, 0 0 0.2rem #d1d2d0,
            0 0 0.1rem #d1d2d0;
        }
      `}</style>
      <link
        href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    </div>
  );
};

export default Footer;
