// chakra imports
import { Box, Portal } from "@chakra-ui/react";
import Footer from "../../Footer/Footer.js";
// core components
import FullScreenNavbar from "../../Navbars/FullScreenNavbar.js";
import { createRef, useRef } from "react";

export default function FullScreen({ children }) {
  // ref for the wrapper div
  const wrapper = createRef();
  const navRef = useRef();
  return (
    <Box ref={navRef} w="100%">
      <Portal containerRef={navRef}>
        <FullScreenNavbar
          logoText="DOREMI GAMES"
        />
      </Portal>
      <Box w="100%">
        <Box ref={wrapper} w="100%">
          {children}
        </Box>
      </Box>
      <Box px="24px" mx="auto" width="1044px" maxW="100%">
        <Footer />
      </Box>
    </Box>

  );
}
