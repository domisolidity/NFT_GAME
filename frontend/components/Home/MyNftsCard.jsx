const InventoryCard = (props) => {
  return (
    <div className={`inventory_card inventory_card-${props.grade}`}>
      <div className="inventory_card_top">{props.grade}</div>
      <img src={props.img} />
      <style jsx>{`
        .inventory_card {
          display: flex;
          flex-direction: column;
          width: 15rem;
          border-radius: 5%;
          margin: 2rem;
        }

        .inventory_card-purple {
          background-color: var(--chakra-colors-purple-700);
        }
        .inventory_card-green {
          background-color: var(--chakra-colors-green-700);
        }
        .inventory_card-red {
          background-color: var(--chakra-colors-red-700);
        }

        .inventory_card_top {
          display: flex;
          font-size: 1.5rem;
          margin: 0.3rem;
          justify-content: center;
        }

        .inventory_card > img {
          border-radius: 0 0 5% 5%;
        }
      `}</style>
    </div>
  );
};

export default InventoryCard;
