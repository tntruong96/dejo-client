import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";
import Layout from "../components/common/layout/layout";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUser, faUserPen } from "@fortawesome/free-solid-svg-icons";
import { wrapper } from "../redux/reudux-wrapper";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import 'antd/dist/antd.css'

const theme = {
  colors: {},
};

//import icon font awsome

library.add(faUser, faUserPen);

function MyApp({ Component, pageProps }: AppProps) {
  const store = useStore();
  return (
    <PersistGate persistor={store.__persistor} loading={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </PersistGate>
  );
}

export default wrapper.withRedux(MyApp);
