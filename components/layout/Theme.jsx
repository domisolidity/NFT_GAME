import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode, useColorModeValue } from "@chakra-ui/react";
import React from "react";

const Theme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#6AC9F5", "#F93B8B");
  const color = useColorModeValue("#171717", "#F1F6F9");

  return (
    <Button
      ml={2}
      variant="unstyled"
      onClick={toggleColorMode}
      bg={bg}
      color={color}
    >
      {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
};

export default Theme;
