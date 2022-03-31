import React from "react";
import Script from "next/script";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__title">ABOUT US</div>
      <div className="footer__content">
        <div className="footer__item">
          <div className="footer__item_head">TEAM</div>
          <a href="https://github.com/domisolidity/NFT_GAME">
            <i className="bx bxl-github" />
            <div>도레미파솔리디티</div>
          </a>
        </div>
        <div className="footer__item">
          <div className="footer__item_head">DEVELOPERS</div>
          <a href="https://github.com/pier101">
            <i className="bx bxl-github" />
            <div>김동욱</div>
          </a>
          <a href="https://github.com/KimchiChamchi">
            <i className="bx bxl-github" />
            <div>이상민</div>
          </a>
          <a href="https://github.com/codecocos">
            <i className="bx bxl-github" />
            <div>이민주</div>
          </a>
        </div>
      </div>
      <div className="footer__bottom">
        © 2022 Doremifa Sollidity. All rights reserved.
      </div>
      <style jsx>{`
        .footer {
          display: grid;
          grid-template-rows: 4fr 1fr;
          grid-template-columns: repeat(3, 1fr);
          align-items: center;
          justify-items: center;
          border-top: 2px solid;
          border-image: linear-gradient(to right, #f2e205, #1a0faf) 1;
          box-shadow: 0 0 0 transparent, 0 0 0.3rem #d1d2d0,
            0 0 0.1rem rgba(38, 149, 255, 0.5), 0 0 0.1rem #d1d2d0,
            0 0 0.1rem #d1d2d0, 0 0 0.1rem #d1d2d0, 0 0 0.2rem #d1d2d0,
            0 0 0.1rem #d1d2d0;
        }

        .footer__title {
          grid-column: 1/1;
          font-size: 2rem;
          font-weight: bold;
        }

        .footer__content {
          grid-row: 1/2;
          grid-column: 2/-1;
          display: flex;
          justify-self: left;
        }

        .footer__item {
          margin: 0 8vw;
        }
        .footer__item > a {
          display: flex;
          align-items: center;
          margin: 0 0.3rem 0.3rem 0;
        }
        .footer__item > a > i {
          font-size: 2rem;
          margin-right: 0.6rem;
        }

        .footer__item_head {
          font-size: 1.2rem;
          margin: 0.8rem 0rem;
          font-weight: bold;
        }

        .footer__bottom {
          grid-row: 2/-1;
          grid-column: 1/-1;
          font-size: 0.5rem;
        }

        /* justify="space-around" h="30vh" align="center" bg="#444655 */
      `}</style>
      <link
        href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
        rel="stylesheet"
      ></link>
    </div>
  );
};

export default Footer;
