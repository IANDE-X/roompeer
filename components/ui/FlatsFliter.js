import React from "react";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import { prices, homeTypes, theme } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";
import PrimaryButton from "../buttons/PrimaryButton";
import SelectButton from "../buttons/SelectButton";

export default function FlatsFilter() {
  const city = useInput("");
  const property_for = useInput("");
  const type = useInput("");
  const rooms = useInput("");
  const price_low = useInput("");
  const price_high = useInput("");
  return (
    <Wrapper>
      <ContentWrapper>
        <TextField variant="outlined" label="City" {...city} />
        <SelectButton label="For" input={property_for} array={["Rent", "Sale"]} width="100px" />
        <SelectButton label="Type" input={type} array={homeTypes} />
        <TextField variant="outlined" label="Rooms" placeholder="E.g 2?" {...rooms} />
        <SelectButton label="Price Low (HUF)" input={price_low} array={prices} />
        <SelectButton label="Price High (HUF)" input={price_high} array={prices} />
      </ContentWrapper>
      <ButtonWrapper>
        <Link href={`/flats/search?city=${city.value}for=${property_for.value}type=${type.value}rooms=${rooms.value}price_low=${price_low.value}price_high=${price_high.value}`}>
          <PrimaryButton color={theme.light.secondaryColor} title="Search" />
        </Link>
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 10px;
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
  @media (max-width: 900px) {
    grid-template-columns: 50% 50%;
  }
  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;
