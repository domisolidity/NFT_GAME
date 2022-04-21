import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import axios from "axios";
import ItemImage from "../ItemImage";
import Link from "next/link";

const InventoryCard = (props) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  // 내 소유 아이템 개수
  const [myItemQuantity, setMyItemQuantity] = useState(0);

  // 내 아이템 개수 불러오기
  const getMyItemQuantity = async () =>
    await axios
      .post(`/api/items/game-items/my-items-quantity`, {
        account: account,
        itemName: props.itemName,
      })
      .then((res) => {
        setMyItemQuantity(res.data.count);
      });

  useEffect(() => {
    getMyItemQuantity();
  }, [account]);

  return (
    <>
      {myItemQuantity != 0 ? (
        <div className="item">
          <div className="item_image">
            <ItemImage itemId={props.img} />
            <div className="itme_amount">{myItemQuantity}</div>
          </div>
          <div className="itme_name">{props.itemName}</div>
          <style jsx>{`
            .item {
              display: flex;
              flex-direction: column;
              background-color: #0f263e;
              border-radius: 5%;
              margin: 1rem;
              align-items: center;
              position: relative;
              border: solid 3px #2c3a43;
            }
            .item_image {
              border-bottom: solid 1px #2c3a43;
              border-radius: 5% 5% 0 0;
              width: 10rem;
              height: 10rem;
            }
            .itme_amount {
              width: 2rem;
              height: 2rem;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background-color: var(--chakra-colors-purple-700);
              position: absolute;
              top: 2%;
              left: 78%;
            }
            .itme_name {
              font-size: 1.5rem;
            }
          `}</style>
        </div>
      ) : null}
    </>
  );
};

export default InventoryCard;
