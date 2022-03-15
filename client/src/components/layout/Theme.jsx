import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";
import React from "react";

const Theme = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button ml={2} variant="ghost" onClick={toggleColorMode}>
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default Theme;
