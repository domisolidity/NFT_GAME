import { Flex, Tabs, TabList, Tab } from "@chakra-ui/react";

const SubMenuList = ({ subMenu, getSelectedSubMenu, as, slideInSubMenu }) => {
  return (
    <Flex
      as={as}
      animation={slideInSubMenu}
      w={"100%"}
      alignItems="center"
      justifyContent="center"
      mx={2}
      borderWidth={0}
      overflowX="auto"
    >
      <Tabs
        defaultIndex={0}
        borderBottomColor="transparent"
        colorScheme={"teal"}
      >
        <TabList>
          {subMenu &&
            subMenu.map((list, i) => {
              return (
                <Tab
                  w={"6rem"}
                  py={4}
                  m={0}
                  _focus={{ boxShadow: "none" }}
                  key={i}
                  value={list}
                  onClick={getSelectedSubMenu}
                >
                  {list}
                </Tab>
              );
            })}
        </TabList>
      </Tabs>
    </Flex>
  );
};

export default SubMenuList;
