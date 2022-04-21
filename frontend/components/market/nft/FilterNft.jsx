import { Box, Text, Flex, Checkbox, CheckboxGroup } from "@chakra-ui/react";

const FilterNft = () => {
  return (
    <>
      <Text align="left" p="2" fontSize="20" fontWeight="extrabold">
        Filters
      </Text>
      <Box m="0 auto">
        <Text align="left" p="5">
          grade
        </Text>
        <Flex ml="2.5vw" direction="column">
          <Checkbox>red</Checkbox>
          <Checkbox>green</Checkbox>
          <Checkbox>purple</Checkbox>
        </Flex>
      </Box>
      <Box m="0 auto" mt="2">
        <Text align="left" p="5">
          price (eth)
        </Text>
        <Flex ml="2.5vw" direction="column">
          <Checkbox> ~ 0.5</Checkbox>
          <Checkbox> 0.5 ~ 1.0</Checkbox>
          <Checkbox> 1.0 ~ 2.0</Checkbox>
          <Checkbox> 2.0 ~ 4.0</Checkbox>
          <Checkbox> 4.0 ~ </Checkbox>
        </Flex>
      </Box>
    </>
  );
};

export default FilterNft;
