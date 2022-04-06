const ChoiceNft = () => {
  return (
    <div className="shell overflow-hidden anim-scale-in position-relative ">
      <div className="header">
        <div>Stake NFT</div>
      </div>
      <div className="content">
        <div className="nft-row nft-header-label">
          <div className="nft-id">ID</div>
          <div className="nft-name">NFT Name</div>
          <div className="nft-grade"> Grade </div>
        </div>
        <div className="blank-state">
          <div>
            <img src="https://bunicorn.exchange/img/no-search.96c77eef.svg" />
          </div>
          <div className="not-found mt-4 "> Not Found </div>
        </div>
      </div>
      <div className="retangle"></div>
      <div className="button-flex button-footer">
        <button
          className="button button-wrapper button disable "
          requirelogin="true"
          type="submit"
        >
          <span>Confirm</span>
        </button>
        <button className="button button button-cancel" type="button">
          {" "}
          Cancel{" "}
        </button>
        <a className="position-absolute right-0 p-4 a icon-close-modal">
          {/* <i
          className="iconfont icon-close"
          style="font-size: 20px; line-height: 20px;"
        ></i> */}
        </a>
      </div>

      <style jsx>{`
        .shell {
          display: flex;
          flex-direction: column;
          z-index: 999;
          margin: 0 auto;
          width: 100%;
          max-height: 90%;
          border-radius: 25px;
          background-color: #0f263e;
          padding-left: 0 !important;
          padding-right: 0 !important;
          max-width: 810px;
        }
        .border-0,
        .shell {
          border: 0 !important;
        }
        .overflow-hidden {
          overflow: hidden !important;
        }
        .position-relative {
          position: relative !important;
        }
        .anim-scale-in {
          animation-name: scale-in;
          animation-duration: 0.15s;
          animation-timing-function: cubic-bezier(0.2, 0, 0.13, 1.5);
        }
        .position-relative {
          position: relative !important;
        }
        .overflow-hidden {
          overflow: hidden !important;
        }
        .header {
          font-weight: 700;
          font-size: 22px;
          line-height: 35px;
          color: #f9f9f9;
          padding: 20px 40px;
          background: #1b3148;
        }
        .content {
          padding: 0;
          max-height: 300px;
          overflow-y: auto;
          position: relative;
        }
        .nft-row.nft-header-label {
          position: sticky;
          width: 100%;
          top: 0;
          background: #0f263e;
          color: hsla(0, 0%, 100%, 0.4);
        }
        .nft-row {
          padding: 8px 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nft-id {
          width: 20%;
        }
        .nft-name {
          text-align: left;
          width: 50%;
        }
        .nft-grade {
          width: 30%;
          text-align: right;
        }
        .blank-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px;
        }

        img {
          border-style: none;
        }
        img,
        svg {
          vertical-align: middle;
        }
        .not-found {
          color: hsla(0, 0%, 100%, 0.4);
        }
        .mt-4 {
          margin-top: 24px !important;
        }
        .mt-4,
        .my-4 {
          margin-top: 1.5rem !important;
        }
        .retangle {
          width: 100%;
          height: 1px;
          background-color: rgba(0, 0, 0, 0.08);
          margin-bottom: 16px;
        }
        .button-footer {
          padding: 0 20px;
        }
        .button-flex {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        .button-wrapper.button.disable {
          background: #f47820;
          opacity: 0.4;
          cursor: not-allowed;
        }

        /* @media only screen and (max-width: 768px) .button-wrapper.button {
          width: 150px;
        } */
        .button-wrapper.button {
          background: #f47820 !important;
          color: #fff !important;
          margin: 15px 0 30px 0;
          font-family: Lato-Bold !important;
          font-size: 16px !important;
          border: 0 !important;
          width: 190px;
        }
        /* @media only screen and (max-width: 768px) .button {
          min-width: 100px !important;
        } */
        .button {
          min-width: 150px !important;
        }
        [type="button"]:not(:disabled),
        [type="reset"]:not(:disabled),
        [type="submit"]:not(:disabled),
        button:not(:disabled) {
          cursor: pointer;
        }
        .button {
          border-radius: 22px;
          padding: 0 22px;
          outline: none;
          height: 44px;
          margin: 0;
        }
        /* @media only screen and (max-width: 768px) .button-cancel {
          width: 150px;
        } */
        .button-cancel {
          margin: 15px 0 30px 0;
          width: 190px !important;
          font-size: 16px;
          color: #f47820;
          border: 2px solid #f47820 !important;
          background-color: inherit !important;
        }
        /* @media only screen and (max-width: 768px) .button {
          min-width: 100px !important;
        } */
        .modal-stake-nft .icon-close-modal,
        .modal-wrap .icon-close-modal {
          padding: 20px !important;
        }
        .modal .icon-close-modal {
          z-index: 1;
        }
        .a {
          color: var(--text-color);
        }
        /* @media (max-width: 768px) .icon-close-modal {
          padding: 0.7rem !important;
        } */
        .p-4 {
          padding: 24px !important;
        }
        .right-0 {
          right: 0 !important;
        }
        .position-absolute {
          position: absolute !important;
        }
      `}</style>
    </div>
  );
};

export default ChoiceNft;
