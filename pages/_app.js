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
import { AuthProvider } from "../context/Auth";
import { Collapse } from "@material-ui/core";
import { appCheck } from "../model/firebase-config";

NProgress.configure({
  minimum: 0.9,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

function MyApp({ Component, pageProps, token }) {
  React.useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
    appCheck(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        TransitionComponent={Collapse}
      >
        <AuthProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default MyApp;
