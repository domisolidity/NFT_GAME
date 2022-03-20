import { SearchIcon } from "@chakra-ui/icons";
import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";

const Seachbar = () => {
  return (
    <InputGroup>
      <Input
        placeholder="Search by items, games or collections"
        // _placeholder={{ opacity: 1, color: "gray.500" }}
      />
      <InputRightElement>
        <Button variant="ghost">
          <SearchIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default Seachbar;
