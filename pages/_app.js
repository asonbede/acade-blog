import Head from "next/head";
import { Provider } from "next-auth/client";
import Script from "next/script";

import "../styles/globals.css";
import Layout from "../components/layout/layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { NotificationContextProvider } from "../store/notification-context";
function MyApp({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Provider session={pageProps.session}>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
          </Head>
          <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ygbV9kiqUc6oa4msXn9868pTtWMgiQaeYH7/t7LECLbyPA2x65Kgf80OJFdroafW"
            crossOrigin="anonymous"
          />

          {/* <!-- Font Awesome --> */}
          <Script
            defer
            src="https://use.fontawesome.com/releases/v5.0.7/js/all.js"
          />
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </NotificationContextProvider>
  );
}

export default MyApp;
