import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InventoryCard from "./InventoryCard";
import NotFound from "../../utils/NotFound";
import { Box, Flex } from "@chakra-ui/react";

const ItemList = ({ gameItems }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account, auth } = blockchain;
  const [hasQuantity, setHasQuantity] = useState([]);

  const getQuantity = (quantity) => {
    setHasQuantity([...hasQuantity, quantity]);
  };
  useEffect(() => {
    if (!(account && auth)) return;
    setHasQuantity([]);
  }, [account, auth]);

  return (
    <>
      <Box m={"0 auto"} w="100%">
        <Flex justifyContent="center" flexWrap={"wrap"}>
          {hasQuantity.length <= gameItems.length ? (
            gameItems.map((item, index) => {
              return (
                <InventoryCard
                  key={index}
                  img={item.itemId}
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
