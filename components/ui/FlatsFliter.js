import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { cities, prices, theme } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import SelectButton from "../buttons/SelectButton";
import { SearchRounded } from "@material-ui/icons";

export default function FlatsFilter() {
  const city = useInput("");
  const property_for = useInput("");
  const rooms = useInput("");
  const price_low = useInput("");
  const price_high = useInput("");
  return (
    <Wrapper>
      <ContentWrapper>
        <SelectButton label="City" input={city} array={cities} />
        <SelectButton label="For" input={property_for} array={["Rent", "Sale"]} width="100px" />
        <TextField variant="outlined" label="Bedrooms" placeholder="E.g 2?" {...rooms} />
        <SelectButton label="Price Low (HUF)" input={price_low} array={prices} />
        <SelectButton label="Price High (HUF)" input={price_high} array={prices} />
        <Link href={`/flats/search?city=${city.value}&type=${property_for.value}&rooms=${rooms.value}&price_low=${price_low.value}&price_high=${price_high.value}`}>
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
  background-color: ${theme.light.secondaryColor};
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    background-color: ${theme.light.primaryColor};
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
