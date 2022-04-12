const ConnectWallet = (props) => {
  const { toggle } = props;
  return (
    <>
      <button
        className="button button-primary btn-connect connect"
        onClick={toggle}
      >
        Connect To A Wallet
      </button>
      <style jsx>{`
        .btn-connect {
          font-family: Lato-Bold;
          font-size: 14px;
          line-height: 1;
          box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
          background: var(--bg-btn-connect);
          border: 0;
        }
        .btn-connect.connect:hover {
          background: #f47820 !important;
          color: #fff;
        }

        .button.button-primary {
          /* background-color: #fff; */
          color: #f47820;
          /* border-color: #f47820; */
        }

        .button.button-primary:hover {
          background-color: #ff8c06;
        }

        button:not(:disabled) {
          cursor: pointer;
        }

        .button {
          /* background-color: var(--secondary-button-background);
          color: var(--secondary-button-text);
          border: 1px solid var(--secondary-button-border); */
          border-radius: 22px;
          padding: 0 22px;
          /* outline: none; */
          height: 44px;
          margin: 0;
        }
      `}</style>
    </>
  );
};

export default ConnectWallet;
