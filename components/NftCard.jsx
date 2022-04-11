import { Box, Flex, Text, Image, GridItem, Grid } from "@chakra-ui/react";

const NftCard = (props) => {
  const { id, image, grade, name, description, attributes } = props.nftInfo;

  return (
    <Flex justify="space-around" w="60vw" mt="10">
      <Box>
        <Image src={image} w={400} h={420} />
      </Box>
      <Flex align="flex-start" direction="column" paddingLeft="10px">
        <Text>ID : {id} </Text>
        <Text>GRADE : {grade} </Text>
        <Text>NAME : {name}</Text>
        <Text>DESCRIPTION : {description} </Text>
        <Text>ATTRIBUTES : </Text>
        <Grid templateColumns="repeat(3,1fr)" padding="5" gap={1}>
          {attributes &&
            attributes.map((attr, i) => {
              return (
                <GridItem
                  key={i}
                  align="center"
                  border="2px solid #2b7997"
                  borderRadius={15}
                >
                  <Text>{attr.trait_type}</Text>
                  <Text fontWeight="bold">{attr.value}</Text>
                </GridItem>
              );
            })}
        </Grid>
      </Flex>
    </Flex>
  );
};
export default NftCard;
