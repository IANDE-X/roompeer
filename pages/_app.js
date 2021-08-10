import "../styles/globals.css";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import Layout from "../components/Layout";

NProgress.configure({
  minimum: 0.9,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
