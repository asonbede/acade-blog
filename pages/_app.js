import Head from "next/head";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NotificationContextProvider } from "../store/notification-context";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}

export default MyApp;
