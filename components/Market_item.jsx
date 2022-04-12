import { Grid } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ItemCard from "../components/ItemCard";
const Market_item = () => {
  // 아이템 목록
  const [gameItems, setGameItems] = useState([]);
  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`/api/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(() => {
    getGameItems();
  }, []);
  return (
    <>
      <div>
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
    </>
  );
};

export default Market_item;
