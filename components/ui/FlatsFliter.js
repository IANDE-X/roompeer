import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { cities, prices, theme } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import SelectButton from "../buttons/SelectButton";
import { SearchRounded } from "@material-ui/icons";
import useTranslation from "next-translate/useTranslation";

export default function FlatsFilter(props) {
  let q;
  let { t } = useTranslation();
  q = props.searchedQueries ? props.searchedQueries : "";
  const city = useInput(q.city ? q.city : "");
  const property_for = useInput(q.type ? q.type : "");
  const rooms = useInput(q.rooms ? q.rooms : "");
  const price_low = useInput(q.price_low ? q.price_low : "");
  const price_high = useInput(q.price_high ? q.price_high : "");
  return (
    <Wrapper>
      <ContentWrapper>
        <SelectButton label={t("common:city")} input={city} array={cities} />
        <SelectButton label={t("common:for")} input={property_for} array={["Rent", "Sale"]} width="100px" />
        <TextField variant="outlined" type="number" label={t("common:bedrooms")} placeholder={t("common:eg-2")} {...rooms} />
        <SelectButton label={t("common:price_low")} input={price_low} array={prices} />
        <SelectButton label={t("common:price_high")} input={price_high} array={prices} />
        <Link href={`/flats/search?city=${city.value}&type=${property_for.value}&rooms=${rooms.value}&price_low=${price_low.value}&price_high=${price_high.value}&page=1`}>
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
  @media (max-width: 900px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;
