import React from "react";
import styled from "styled-components";
import useTranslation from "next-translate/useTranslation";
import { theme } from "../../model/data";
import { useRouter } from "next/dist/client/router";

export default function LandingPage() {
  let { t } = useTranslation();
  const { locales, asPath } = useRouter();
  return (
    <Wrapper>
      <Onboarding>
        <Heading>{t("common:title")}</Heading>
        <SubHeading>{t("common:motto")}</SubHeading>
      </Onboarding>
      <ContentWrapper></ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
`;
const ContentWrapper = styled.div``;
const Onboarding = styled.div`
  background-color: ${theme.light.primaryColor};
  height: 100vh;
`;

const Heading = styled.h1`
  color: white;
`;
const SubHeading = styled.h3`
  color: white;
`;
