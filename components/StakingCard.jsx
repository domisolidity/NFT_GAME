const StakingCard = (props) => {
  const { closeModal } = props;

  return (
    <div className="nft-block">
      <div className="nft-img plus" onClick={closeModal}>
        <img
          src="https://bunicorn.exchange/img/plus.52eee613.svg"
          className="add-nft"
        />
      </div>
      <div className="nft-name">Add NFT</div>
      <div className="retangle" />
      <div className="nft-info">
        <div className="label-wrapper">
          <div>NAME</div>
          <div>ID</div>
        </div>
        <div className="number-wrapper">
          <div>--</div>
          <div>--</div>
        </div>
      </div>
      <style jsx>{`
        .nft-blocks {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-around;
        }
        .nft-block {
          background-color: #0f263e;
          box-shadow: 1px 9px 15px rgb(0 0 0 / 10%);
          border-radius: 10px;
          padding: 20px;
          margin: 15px;
          width: 17.2rem;
        }

        .nft-img.plus {
          cursor: pointer;
        }

        .nft-img {
          width: 235px;
          height: 235px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f1f3f6;
        }

        img.add-nft {
          width: 64px;
          height: 64px;
          -o-object-fit: contain;
          object-fit: contain;
        }

        .nft-name {
          /* color: var(--text-color-liquidity); */
          margin: 16px 0;
          text-align: left;
          width: 100%;
          font-size: 18px;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .retangle {
          border-top: 1px dashed rgba(0, 0, 0, 0.08);
        }
        .nft-info {
          margin-top: 16px;
          display: flex;
          flex-direction: column;
        }

        .label-wrapper {
          color: hsla(0, 0%, 100%, 0.4);
          font-size: 14px;
          line-height: 17px;
        }

        .label-wrapper,
        .number-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .number-wrapper {
          color: #fff;
          font-size: 18;
          font-weight: 700;
          line-height: 22px;
        }

        .label-wrapper,
        .number-wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
      `}</style>
    </div>
  );
};

export default StakingCard;
