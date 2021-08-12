import React from "react";
import styled from "styled-components";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { prices, homeTypes } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";

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
        <TextField variant="outlined" label="For" select {...property_for}>
          <MenuItem value={"Rent"}>Rent</MenuItem>
          <MenuItem value={"Sale"}>Sale</MenuItem>
        </TextField>
        <TextField variant="outlined" label="Type" fullWidth select {...type}>
          {homeTypes.map((option, idx) => (
            <MenuItem key={idx} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Rooms"
          placeholder="E.g 2?"
          {...rooms}
        />
        <TextField variant="outlined" label="Price Low" select {...price_low}>
          {prices.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
        <TextField variant="outlined" label="Price High" select {...price_high}>
          {prices.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
      </ContentWrapper>
      <ButtonWrapper>
        <Link
          href={`/flats/search?city=${city.value}for=${property_for.value}type=${type.value}rooms=${rooms.value}price_low=${price_low.value}price_high=${price_high.value}`}
        >
          <Button color="primary" variant="contained" fullWidth>
            Search
          </Button>
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
  grid-template-columns: auto auto auto auto auto auto;
  gap: 10px;
  @media (max-width: 900px) {
    display: grid;
    grid-template-columns: auto auto;
  }
  @media (max-width: 600px) {
    display: grid;
    grid-template-columns: auto;
  }
`;
