import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { prices, countries, genders, theme, religions } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import SelectButton from "../buttons/SelectButton";
import { SearchRounded } from "@material-ui/icons";
import useTranslation from "next-translate/useTranslation";

export default function PeersFilter(props) {
  let q;
  let { t } = useTranslation();
  q = props.searchedQueries ? props.searchedQueries : "";
  const country = useInput(q.country ? q.country : "");
  const gender = useInput(q.gender ? q.gender : "");
  const religion = useInput(q.religion ? q.religion : "");
  const age = useInput(q.age ? q.age : "");
  const budget_high = useInput(q.budget_high ? q.budget_high : "");

  return (
    <Wrapper>
      <ContentWrapper className={props.class}>
        <SelectButton label={t("common:country")} input={country} array={countries} placeholder={t("common:origin")} />
        <SelectButton label={t("common:gender")} input={gender} array={genders} />
        <SelectButton label={t("common:religion")} input={religion} array={religions} />
        <TextField variant="outlined" type="number" label={t("common:age")} placeholder={t("common:eg-2")} {...age} fullWidth />
        <SelectButton label={t("common:max_budget")} input={budget_high} array={prices} />
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
