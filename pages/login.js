import React from "react";
import styled, { keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Link from "next/dist/client/link";
import LoginForm from "../components/forms/LoginForm";
import { theme } from "../model/data";
import { Divider } from "@material-ui/core";

export default function LogIn() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper>
        <H1>{t("common:motto")}</H1>
      </ContentWrapper>
      <FormWrapper>
        <LoginForm />
        <Divider />
        <Link href="/signup">
          <a>
            <H3>Don't have an account ?</H3>
          </a>
        </Link>
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 400px auto;
  @media only screen and (max-width: 800px) {
    grid-template-columns: auto;
  }
  background-color: white;
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
    :nth-child(5) {
      animation: ${animation} 1s 0.5s forwards;
    }
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  height: 100vh;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media only screen and (max-width: 600px) {
    height: 50vh;
  }
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  gap: 20px;
`;

const H1 = styled.h1`
  font-size: 70px;
  color: ${theme.light.primaryColor};
  @media only screen and (max-width: 800px) {
    font-size: 25px;
  }
`;

const H3 = styled.h3`
  color: ${theme.light.primaryColor};
  @media only screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const Anchor = styled.h3`
  color: blue;
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    font-size: 15px;
  }
`;
