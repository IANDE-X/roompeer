import styled from "styled-components";
import Head from "next/dist/next-server/lib/head";
import Header from "./Header";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { firebaseInstance } from "../../model/firebase-config";

export default function Layout({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (firebaseInstance) {
      firebaseInstance.auth().onAuthStateChanged((authUser) => {
        if (authUser) {
          setCurrentUser(authUser);
        } else {
          setCurrentUser(null);
        }
      });
    }
  }, []);
  return (
    <Wrapper>
      <Head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        ></link>
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      {currentUser ? <Header /> : <></>}
      <ContentWrapper>{children}</ContentWrapper>
      {currentUser ? <Footer /> : <></>}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  /* @media (prefers-color-scheme: dark) {
    background-color: #212121;
    color: white;
  } */
`;
const ContentWrapper = styled.div``;
