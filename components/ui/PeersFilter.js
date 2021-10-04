import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { prices, countries, genders, theme, religions } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import SelectButton from "../buttons/SelectButton";
import { SearchRounded } from "@material-ui/icons";

export default function PeersFilter(props) {
  const country = useInput("");
  const gender = useInput("");
  const religion = useInput("");
  const age = useInput("");
  const budget_high = useInput("");

  return (
    <Wrapper>
      <ContentWrapper className={props.class}>
        <SelectButton label="Country" input={country} array={countries} placeholder="Origin" />
        <SelectButton label="Gender" input={gender} array={genders} />
        <SelectButton label="Religion" input={religion} array={religions} />
        <TextField variant="outlined" type="number" label="Age" placeholder="E.g 2?" {...age} fullWidth />
        <SelectButton label="Max Budget(HUF)" input={budget_high} array={prices} />
        <Link href={`/peers/search?country=${country.value}&age=${age.value}&gender=${gender.value}&religion=${religion.value}&budget_high=${budget_high.value}&page=1`}>
          <ButtonWrapper>
            <SearchRounded />
          </ButtonWrapper>
        </Link>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  cursor: pointer;
  min-height: 50px;
  min-width: 100px;
  color: white;
  background-color: ${theme.light.primaryColor};
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    background-color: ${theme.light.secondaryColor};
  }
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 25% 15% 15% 15% 15% auto;
  gap: 10px;
  @media (max-width: 1000px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;
