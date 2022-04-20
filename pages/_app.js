import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from '../redux/store';
import theme from "../theme/theme.js";
import Seo from "../components/layout/Seo";
import { useRouter } from 'next/router';

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter()
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider theme={theme} resetCss={false}>
      <Seo title={`${router.pathname.slice(1)}`} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  );
}


export default wrapper.withRedux(MyApp)
