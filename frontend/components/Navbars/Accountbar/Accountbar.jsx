import { Button, Flex, useColorModeValue } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Accountbar = ({ onOpen }) => {
  const blockchain = useSelector((state) => state.blockchain);
  const { account } = blockchain;

  useEffect(() => {
    if (!account) return;
  }, [account]);

  const txtColor = useColorModeValue("#f47820 ", "orange.500");

  return (
    <Flex>
      <Button
        borderRadius={"22px"}
        h={"44px"}
        p={"0 22px"}
        color={txtColor}
        onClick={onOpen}
        fontSize={"14px"}
        boxShadow={"0 2px 10px rgb(0 0 0 / 15%)"}
      >
        {/* <Box
          style={{
            borderRadius: "8px",
            overflow: "hidden",
            padding: "0px",
            marginRight: "10px",
            width: "16px",
            height: "16px",
            display: "inline-block",
            // background: "rgb(252, 25, 96)",
          }}
        >
          <svg x="0" y="0" width="16" height="16">
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(-1.9648821102651668 -0.994747498470386) rotate(364.3 8 8)"
              fill="#1598F2"
            ></rect>
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(-0.08300866174519939 8.443399956083116) rotate(179.3 8 8)"
              fill="#F73F01"
            ></rect>
            <rect
              x="0"
              y="0"
              width="16"
              height="16"
              transform="translate(-11.619925695097987 -6.918734684434651) rotate(247.7 8 8)"
              fill="#FC7500"
            ></rect>
          </svg>

        </Box> */}
        {account ? account.slice(0, 6) + "..." + account.slice(-4) : null}
      </Button>
    </Flex>
  );
};

export default Accountbar;
