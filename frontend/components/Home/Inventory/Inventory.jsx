import { Text, SimpleGrid, useColorModeValue } from "@chakra-ui/react";
import Collections from "./Collections";
import { Separator } from "../../Separator/Separator";
import ItemList from "./ItemList";

const Inventory = ({ as, slideIn }) => {
  const txtColor = useColorModeValue("gray.600", "gray.300");

  return (
    <>
      <SimpleGrid as={as} animation={slideIn}>
        <Text
          fontSize={"1.5rem"}
          fontWeight="bold"
          color={txtColor}
          textAlign="center"
          m={5}
        >
          Items
        </Text>
        <Separator />

        <ItemList as={as} />

        <Text
          fontSize={"1.5rem"}
          fontWeight="bold"
          textAlign="center"
          color={txtColor}
          m={5}
        >
          Nfts
        </Text>
        <Separator />
        <Collections />
      </SimpleGrid>
    </>
  );
};

export default Inventory;
