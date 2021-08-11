import React from "react";
import styled, { keyframes } from "styled-components";
import useTranslation from "next-translate/useTranslation";
import LoginForm from "../forms/LoginForm";
import { Typography, Button } from "@material-ui/core";
import Link from "next/dist/client/link";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/image";

export default function LandingPage() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <ContentWrapper>
        <LocaleButton />
        <Image src="/logo.jpg" width={200} height={200} />
        <H1>{t("common:title")}</H1>
        <Typography variant="h6" component="h2" gutterBottom>
          {t("common:motto")}
        </Typography>
        <div>
          <Link href="/signup">
            <Button variant="contained" color="default">
              {t("form:createaccount")}
            </Button>
          </Link>
        </div>
      </ContentWrapper>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto 450px;
  @media only screen and (max-width: 600px) {
    grid-template-columns: auto;
  }
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding: 20px;
  height: 100vh;
  background-color: #8050c8;

  & > div {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media only screen and (max-width: 600px) {
    height: 80vh;
  }
`;

const FormWrapper = styled.div`
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const H1 = styled.h1`
  color: white;
  text-shadow: 0px 20px 40px rgba(0, 0, 0, 0.3);
  font-size: 50px;
`;

const H3 = styled.h3`
  color: white;
`;
