import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InventoryCard from "./InventoryCard";
import NotFound from "../../utils/NotFound";
import { Box, Flex, keyframes } from "@chakra-ui/react";
import axios from "axios";

const ItemList = ({ as }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const [hasQuantity, setHasQuantity] = useState([]);
  const { NEXT_PUBLIC_SERVER_URL } = process.env;
  const [itemCount, setItemCount] = useState("1");

  // 게임 아이템 목록
  const [gameItems, setGameItems] = useState([]);

  // 아이템 목록 가져오기
  const getGameItems = async () =>
    await axios
      .get(`${NEXT_PUBLIC_SERVER_URL}/items/game-items`)
      .then((res) => {
        setGameItems(res.data);
      });

  useEffect(async () => {
    // if (!(account && auth)) return false;
    await getGameItems();
  }, [account, auth]);

  const getQuantity = (quantity) => {
    setHasQuantity([...hasQuantity, quantity]);
  };
  useEffect(() => {
    // if (!(account && auth)) return;
    // setHasQuantity([]);
    // if (!(account && auth && gameItems)) return;
    const tags = document.querySelectorAll(".item-card");
    setItemCount(tags.length);
  }, [account, auth, gameItems]);

  const slideInItemsKeyframes = keyframes`
  0% { opacity: 0; transform: translateY(-50px); }
  100% { opacity: 1; transform: translateY(0); }
  `;
  const slideInItems = [];
  for (let i = 0; i < gameItems.length; i++) {
    slideInItems.push(
      `${slideInItemsKeyframes} 0.1s linear ${0.2 + i * 0.1}s forwards`
    );
  }

  return (
    <>
      <Box m={"0 auto"} w="100%">
        <Flex justifyContent="center" flexWrap={"wrap"}>
          {itemCount != 0 ? (
            gameItems.map((item, index) => {
              return (
                <InventoryCard
                  as={as}
                  slideInItems={slideInItems[index]}
                  key={index}
                  imgId={item.itemId}
                  itemName={item.itemName}
                  itemDescription={item.itemDescription}
                  getQuantity={getQuantity}
                />
              );
            })
          ) : (
            <NotFound />
          )}
        </Flex>
      </Box>
    </>
  );
};

export default ItemList;
