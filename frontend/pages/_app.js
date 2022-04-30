import { ChakraProvider } from "@chakra-ui/react";
import wrapper from "../redux/store";
import theme from "../theme/theme.js";
import Seo from "../components/Layout/Seo";
import { useRouter } from "next/router";
import Web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { init } from "../redux/blockchain/blockchainActions";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  function matchingTitle(title) {
    if (title.includes("game")) {
      return "game";
    } else if (title.includes("home")) {
      return "home";
    } else if (title.includes("rank")) {
      return "rank";
    } else if (title.includes("market")) {
      return "market";
    } else if (title.includes("nft")) {
      return "nft";
    } else if (title.includes("mypage")) {
      return "mypage";
    } else {
      return "";
    }
  }

  useEffect(() => {
    dispatch(init());
  }, []);

  const getLayout = Component.getLayout || ((page) => page);

  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Seo title={matchingTitle(router.pathname.slice(1, 10))} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
};

export default wrapper.withRedux(MyApp);
