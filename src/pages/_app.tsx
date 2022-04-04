import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "../components/common/layout/layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { wrapper } from "../redux/reudux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import "antd/dist/antd.css";
import { AnimatePresence } from "framer-motion";

const theme = {
  colors: {},
};

//import icon font awsome

library.add(faUser, faUserPen);

function MyApp({ Component, pageProps, router }: AppProps) {
  const store = useStore();
  return (
    //@ts-ignore
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </Layout>
      </ThemeProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
