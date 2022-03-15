import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const Theme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      ml={2}
      variant="outline"
      onClick={toggleColorMode}
      bg={colorMode === "light" ? "#fff" : "#F93B8B"}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default Theme;
