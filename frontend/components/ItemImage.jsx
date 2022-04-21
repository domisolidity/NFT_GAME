import { Image } from "@chakra-ui/react";

const ItemImage = (props) => {
  return (
    <Image
      w={"100%"}
      h={"100%"}
      fit="cover"
      src={`/images/itemIcons/itemIcon${props.itemId}.png`}
    />
  );
};

export default ItemImage;
