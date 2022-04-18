import { ChakraProvider } from "@chakra-ui/react";
import wrapper from '../redux/store';
import Head from "next/head"
import theme from "../theme/theme.js";

const MyApp = ({ Component, pageProps }) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Doremifasolidity</title>
      </Head>
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}


export default wrapper.withRedux(MyApp)
