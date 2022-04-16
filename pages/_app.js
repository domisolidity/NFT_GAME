import { ChakraProvider, Portal, useDisclosure } from "@chakra-ui/react";
import wrapper from '../redux/store';
import Head from "next/head"

import theme from "../theme/theme.js";
import MainPanel from "../components/Layout/MainPanel";
import PanelContainer from "../components/Layout/PanelContainer";
import PanelContent from "../components/Layout/PanelContent";
import Footer from "../components/Footer/Footer";
import Configurator from "../components/Configurator/Configurator";
import { useEffect, useState } from "react";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import routes from "./routes";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin";
import Sidebar from "../components/Sidebar";
import { useRouter } from 'next/router'


const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()

  console.log(router)

  const { ...rest } = pageProps;

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
        if (
          router.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          if (routes[i].secondaryNavbar) {
            return routes[i].secondaryNavbar;
          }
        }
      }
    }
    return activeNavbar;
  };

  return (

    <ChakraProvider theme={theme} resetCss={false}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Doremifasolidity</title>
      </Head>
      <Sidebar
        routes={routes}
        logoText={"PURITY UI DASHBOARD"}
        display="none"
        sidebarVariant={sidebarVariant}
        {...rest}
      />
      <MainPanel
        w={{
          base: "100%",
          xl: "calc(100% - 275px)",
        }}
      >
        <Portal>
          <AdminNavbar
            onOpen={onOpen}
            logoText={"PURITY UI DASHBOARD"}
            brandText={getActiveRoute(routes)}
            //secondary={getActiveNavbar(routes)}
            fixed={fixed}
            {...rest}
          />
        </Portal>
        {getRoute() ? (
          <PanelContent>
            <PanelContainer>
              <Component {...pageProps} />
            </PanelContainer>
          </PanelContent>
        ) : null}
        <Footer />
        <Portal>
          <FixedPlugin
            // secondary={getActiveNavbar(routes)}
            fixed={fixed}
            onOpen={onOpen}
          />
        </Portal>
        <Configurator
          // secondary={getActiveNavbar(routes)}
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
  )
}


export default wrapper.withRedux(MyApp)
