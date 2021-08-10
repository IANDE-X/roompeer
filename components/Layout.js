import styled from "styled-components";
import Head from "next/dist/next-server/lib/head";
// import Header from "./Header";
// import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <Wrapper>
      {/* <Header /> */}
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <ContentWrapper>{children}</ContentWrapper>
      {/* <Footer /> */}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  @media (prefers-color-scheme: dark) {
    background-color: #212121;
    color: white;
  }
`;
const ContentWrapper = styled.div``;
