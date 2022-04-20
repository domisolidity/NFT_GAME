// chakra imports
import { Box, ChakraProvider, Portal } from "@chakra-ui/react";
import Footer from "../../Footer/Footer.js";
// core components
import FullScreenNavbar from "../../Navbars/FullScreenNavbar.js";
import { createRef, useEffect, useRef } from "react";
import routes from "../../../pages/routes";
import theme from "../../../theme/theme.js";


export default function Pages({ children }) {
  console.log("FullScreen")
  // const { ...rest } = props;
  // ref for the wrapper div
  const wrapper = createRef();
  useEffect(() => {
    document.body.style.overflow = "unset";
    // Specify how to clean up after this effect:
    return function cleanup() { };
  });
  const getActiveRoute = (routes) => {
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
        //   window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        // ) {
        //   return routes[i].name;
        // }
      }
    }
    return activeRoute;
  };
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
        //   window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
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
  //     if (prop.layout === "/FullScreen") {
  //       console.log(prop)



  //       // return (
  //       //   <NextLink href={`${prop.path}`} key={key} passHref>
  //       //     <Link>
  //       //       <a> sdds</a>
  //       //     </Link>
  //       //   </NextLink>
  //       // )

  //       // router.push(`${prop.path}`)

  //       // return (<></>
  //       //   // router.push(`${prop.path}`)
  //       //   //<Link href={`${prop.layout + prop.path}`} ></Link>
  //       //   // <Route
  //       //   //   path={prop.layout + prop.path}
  //       //   //   component={prop.component}
  //       //   //   key={key}
  //       //   // />

  //       //   // <NextLink href={`${prop.layout + prop.path}`} passHref>

  //       //   // </NextLink>
  //       // );
  //     } else {
  //       return null;
  //     }
  //   });
  // };
  const navRef = useRef();

  return (
    <ChakraProvider theme={theme} resetCss={false} w="100%">
      <Box ref={navRef} w="100%">
        <Portal containerRef={navRef}>
          <FullScreenNavbar
            secondary={getActiveNavbar(routes)}
            logoText="DOREMI GAMES"
          />
        </Portal>
        <Box w="100%">
          <Box ref={wrapper} w="100%">
            {/* {getRoutes(routes)} */}
            {children}
          </Box>
        </Box>
        <Box px="24px" mx="auto" width="1044px" maxW="100%">
          <Footer />
        </Box>
      </Box>
    </ChakraProvider>
  );
}
