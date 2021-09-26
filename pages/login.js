import React from "react";
import styled, { keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import Link from "next/dist/client/link";
import LoginForm from "../components/forms/LoginForm";
import { theme } from "../model/data";
import { Divider } from "@material-ui/core";
import Image from "next/dist/client/image";

export default function LogIn() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper>
        <Image src="/illustrations/log-in.svg" width={250} height={250} />
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
  grid-template-columns: 50% 50%;
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
  display: grid;
  justify-content: center;
  align-items: center;
  padding: 20px;
  min-height: 80vh;

  @media only screen and (max-width: 800px) {
    height: 30vh;
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
  font-size: 45px;
  color: ${theme.light.primaryColor};
  /* text-shadow: rgba(0, 0, 0, 0.3) 0px 20px 40px; */
  @media only screen and (max-width: 800px) {
    font-size: 30px;
  }
`;

const H3 = styled.h3`
  color: ${theme.light.primaryColor};
  @media only screen and (max-width: 800px) {
    font-size: 15px;
  }
`;
