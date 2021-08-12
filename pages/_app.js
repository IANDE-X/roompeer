import "../styles/globals.css";
import React from "react";
import NProgress from "nprogress";
import Router from "next/router";
import "nprogress/nprogress.css";
import Layout from "../components/ui/Layout";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Theme from "../components/ui/Theme";
import { SnackbarProvider } from "notistack";
import Grow from "@material-ui/core/Grow";

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
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <Layout>
      <ThemeProvider theme={Theme}>
        <CssBaseline />
        <SnackbarProvider
          maxSnack={3}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          TransitionComponent={Grow}
        >
          <Component {...pageProps} />
        </SnackbarProvider>
      </ThemeProvider>
    </Layout>
  );
}

export default MyApp;
