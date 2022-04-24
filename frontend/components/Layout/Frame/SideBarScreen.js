// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "../../Configurator/Configurator";
import Footer from "../../Footer/Footer.js";
// Layout components
import Navbar from "../../Navbars/Navbar.js";
import Sidebar from "../../Sidebar";
import { useState } from "react";

import routes from "../../../assets/routes"

// Custom Chakra theme
import theme from "../../../theme/theme.js";
import FixedPlugin from "../../FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../MainPanel";
import PanelContainer from "../PanelContainer";
import PanelContent from "../PanelContent";

export default function SideBarScreen({ children }) {
  // const { ...rest } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  // Chakra Color Mode
  return (
    <>
      <Sidebar
        routes={routes}
        logoText={"Doremi Games"}
        display="none"
        sidebarVariant={sidebarVariant}
      // {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 200px)",
        }}
      >
        <Portal>
          <Navbar
            onOpen={onOpen}
            logoText={"Doremi Games"}
            fixed={fixed}
          // {...rest}
          />
        </Portal>
        <PanelContent>
          <PanelContainer>
            {children}
          </PanelContainer>
        </PanelContent>
        <Footer />
        <Portal>
          <FixedPlugin
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          isOpen={isOpen}
          onClose={onClose}
          isChecked={fixed}
          onSwitch={(value) => {
            setFixed(value);
          }}
          onOpaque={() => setSidebarVariant("opaque")}
          onTransparent={() => setSidebarVariant("transparent")}
        />
      </MainPanel>
    </>

  );
}
