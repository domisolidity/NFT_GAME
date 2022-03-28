import '../styles/globals.css'
import { ChakraProvider } from "@chakra-ui/react";
import wrapper from '../redux/store';
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Head from "next/head"


function MyApp({ Component, pageProps }) {
  return (

    // <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <Head>
        <title>Doremifasolidity</title>
      </Head>
      <div className="layout">
        <div className="layout__header">
          <Header />
        </div>
        <div className="layout__content">
          <Component {...pageProps} />
        </div>
        <div className="layout__footer">
          <Footer />
        </div>
      </div>
    </ChakraProvider>
  )
}

// export const getServerSideProps = wrapper.getServerSideProps(
//   store =>
//     async ({ req }) => {
//       console.log("서버")
//       const cookie = req ? req.headers.cookie : '';
//       axios.defaults.headers.Cookie = '';
//       if (req && cookie) {
//         axios.defaults.headers.Cookie = cookie;
//       }

//       // store.dispatch(myInfoRequestAction());
//     },
// );


export default wrapper.withRedux(MyApp)