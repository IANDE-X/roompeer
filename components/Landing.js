import React from "react";
import styled, { keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import LoginForm from "./forms/LoginForm";

export default function LandingPage() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper color="#8050C8">
        <H1>{t("common:title")}</H1>
        <H3>{t("common:motto")}</H3>
      </ContentWrapper>
      <ContentWrapper>
        <LoginForm />
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;

const animation = keyframes`
  from { opacity: 0; transform: translateY(-10px); filter: blur(10px); }
  to { opacity: 1; transform: translateY(0px); filter: blur(0px); }
`;

const ContentWrapper = styled.div`
  > * {
    :nth-child(1) {
      animation: ${animation} 1s 0s forwards;
    }
    :nth-child(2) {
      animation: ${animation} 1s 0.2s forwards;
    }
    :nth-child(3) {
      animation: ${animation} 1s 0.3s forwards;
    }
    :nth-child(4) {
      animation: ${animation} 1s 0.4s forwards;
    }
  }
  padding: 20px;
  height: 100vh;
  background-color: white;
  background-color: ${(props) => (props.color ? props.color : "#f0f0f0")};
`;

const H1 = styled.h1`
  color: white;
  text-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
`;

const H3 = styled.h3`
  color: white;
`;
