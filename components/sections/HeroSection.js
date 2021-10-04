import React from "react";
import styled from "styled-components";
import FilterBox from "../ui/FilterBox";
import useTranslation from "next-translate/useTranslation";

export default function HeroSection() {
  let { t } = useTranslation();
  return (
    <Wrapper>
      <Title>
        {t("common:hero_heading1")} <br />
        {t("common:hero_heading2")}
      </Title>
      <FilterBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 500px;
  background-color: #f0f0f0;
  background-image: url("/backgrounds/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Title = styled.h1`
  color: white;
  font-size: 40px;
  text-shadow: rgba(0, 0, 0, 0.3) 0px 20px 40px;
  font-weight: bold;
`;
