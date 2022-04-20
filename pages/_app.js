import "../styles/globals.css";
import "../styles/primerRaw.css";
import { ChakraProvider } from "@chakra-ui/react";
import { wrapper } from "../redux/store";
import Header from "../components/layout/Header.jsx";
import Footer from "../components/layout/Footer.jsx";
import Seo from "../components/layout/Seo";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  return (
    <ChakraProvider>
      <Seo title={`${router.pathname.slice(1)}`} />
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
  );
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

export default wrapper.withRedux(MyApp);
