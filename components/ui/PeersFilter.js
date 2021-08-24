import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { prices, countries, genders, theme, religions } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import PrimaryButton from "../buttons/PrimaryButton";
import SelectButton from "../buttons/SelectButton";

export default function PeersFilter(props) {
  const country = useInput("");
  const gender = useInput("");
  const religion = useInput("");
  const age = useInput("");
  const budget_low = useInput("");
  const budget_high = useInput("");

  return (
    <Wrapper>
      <ContentWrapper className={props.class}>
        <SelectButton label="Country" input={country} array={countries} placeholder="Origin" />
        <SelectButton label="Gender" input={gender} array={genders} />
        <SelectButton label="Religion" input={religion} array={religions} />
        <TextField variant="outlined" label="Age" placeholder="E.g 2?" {...age} />
        <SelectButton label="Budget Low (HUF)" input={budget_low} array={prices} />
        <SelectButton label="Budget High (HUF)" input={budget_high} array={prices} />
      </ContentWrapper>
      <ButtonWrapper>
        <Link href={`/peers/search?country=${country.value}&age=${age.value}&gender=${gender.value}&religion=${religion.value}&budget_low=${budget_low.value}&budget_high=${budget_high.value}`}>
          <PrimaryButton color={theme.light.secondaryColor} title="Search" />
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;

  & .row {
    display: grid;
    grid-template-columns: auto;
    gap: 10px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: 80%;
  @media (max-width: 800px) {
    display: block;
    max-width: 100%;
    margin-left: 0;
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 16% 16% 16% 10% 19% 19%;
  gap: 10px;
  @media (max-width: 1000px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;
