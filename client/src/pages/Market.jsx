import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, Grid, GridItem } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";

const Market = () => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;
  // 아이템 목록
  const [gameItems, setGameItems] = useState([]);

  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`/api/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(() => {
    getGameItems();
  }, [account]);

  return (
    <div>
      {console.log("Market.jsx 렌더")}
      MarketPage
      <Grid
        templateRows={`auto`}
        templateColumns={`repeat(3, 1fr)`}
        gap={5}
        justifyItems="center"
      >
        {gameItems &&
          gameItems.map((item) => {
            return <ItemCard key={item.itemId} item={item} />;
          })}
      </Grid>
    </div>
  );
};

export default Market;
