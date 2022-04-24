import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InventoryCard from "./InventoryCard";
import NotFound from "../../utils/NotFound";
import { Box, Flex, SimpleGrid } from "@chakra-ui/react";

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
      <Box m={"0 auto"}>
        <SimpleGrid columns={{ sm: 2, md: 3, lg: 4, xl: 5 }}>
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
        </SimpleGrid>
      </Box>
    </>
  );
};

export default ItemList;