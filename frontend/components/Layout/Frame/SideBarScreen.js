// Chakra imports
import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import Configurator from "../../Configurator/Configurator";
import Footer from "../../Footer/Footer.js";
// Layout components
import Navbar from "../../Navbars/Navbar.js";
import Sidebar from "../../Sidebar";
import { useState } from "react";
// import { Redirect, Route, Switch } from "react-router-dom";
import routes from "../../routes";

// Custom Chakra theme
import theme from "../../../theme/theme.js";
import FixedPlugin from "../../FixedPlugin/FixedPlugin";
// Custom components
import MainPanel from "../MainPanel";
import PanelContainer from "../PanelContainer";
import PanelContent from "../PanelContent";
import { useRouter } from "next/router";
export default function SideBarScreen({ children }) {
  console.log(children)
  console.log(222)
  const router = useRouter()

  console.log(router)

  // const { ...rest } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [sidebarVariant, setSidebarVariant] = useState("transparent");
  const [fixed, setFixed] = useState(false);

  // functions for changing the states from components
  const getRoute = () => {
    return router.pathname !== "/admin/full-screen-maps";
  };


  const getActiveRoute = (routes) => {
    console.log(routes)
    console.log(router)
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else if (routes[i].category) {
        let categoryActiveRoute = getActiveRoute(routes[i].views);
        if (categoryActiveRoute !== activeRoute) {
          return categoryActiveRoute;
        }
      } else {

        // if (
        //   router.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        // ) {
        //   return routes[i].name;
        // }
      }
    }
    return activeRoute;
  };
  // This changes navbar state(fixed or not)
  const getActiveNavbar = (routes) => {
    let activeNavbar = false;
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].category) {
        let categoryActiveNavbar = getActiveNavbar(routes[i].views);
        if (categoryActiveNavbar !== activeNavbar) {
          return categoryActiveNavbar;
        }
      } else {
        // if (
        //   router.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        // ) {
        //   if (routes[i].secondaryNavbar) {
        //     return routes[i].secondaryNavbar;
        //   }
        // }
      }
    }
    return activeNavbar;
  };

  // const getRoutes = (routes) => {
  //   return routes.map((prop, key) => {
  //     if (prop.collapse) {
  //       return getRoutes(prop.views);
  //     }
  //     if (prop.category === "account") {
  //       return getRoutes(prop.views);
  //     }
  //     if (prop.layout === "/admin") {
  //       return (
  //         <Route
  //           path={prop.layout + prop.path}
  //           component={prop.component}
  //           key={key}
  //         />
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  // Chakra Color Mode
  return (
    <ChakraProvider theme={theme} resetCss={false}>
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
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <Navbar
            onOpen={onOpen}
            logoText={"Doremi Games"}
            brandText={getActiveRoute(routes)}
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
          // {...rest}
          />
        </Portal>
        {/* {getRoute() ? (
          <PanelContent>
            <PanelContainer>

              {getRoutes(routes)}

            </PanelContainer>
          </PanelContent>
        ) : null} */}
        <PanelContent>
          <PanelContainer>
            {children}
          </PanelContainer>
        </PanelContent>
        <Footer />
        <Portal>
          <FixedPlugin
            secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          secondary={getActiveNavbar(routes)}
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
    </ChakraProvider>
  );
}
