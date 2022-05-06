import { SimpleGrid, keyframes } from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ItemCard from "./ItemCard";
const Market_item = ({ as }) => {
  // 아이템 목록
  const [gameItems, setGameItems] = useState([]);
  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/items/game-items`)
      .then((res) => setGameItems(res.data));

  useEffect(() => {
    getGameItems();
  }, []);

  const contentsKeyframes = keyframes`
 0% { opacity: 0; transform: translateX(-50px); }
  100% { opacity: 1; transform: translateX(0); }
  `;
  const slideIn = [];
  for (let i = 0; i < gameItems.length; i++) {
    let delay = 0.07;
    slideIn.push(`${contentsKeyframes} 0.1s linear ${delay * i}s forwards`);
  }

  return (
    <SimpleGrid minChildWidth="260px" justifyItems="center">
      {gameItems &&
        gameItems.map((item, i) => {
          return (
            <ItemCard
              key={item.itemId}
              item={item}
              as={as}
              slideIn={slideIn[i]}
            />
          );
        })}
    </SimpleGrid>
  );
};

export default Market_item;
