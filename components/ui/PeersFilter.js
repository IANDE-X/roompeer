import React from "react";
import styled from "styled-components";
import { TextField, MenuItem, Button } from "@material-ui/core";
import { prices, countries, genders } from "../../model/data";
import Link from "next/link";
import useInput from "../../hooks/useInput";

export default function PeersFilter() {
  const country = useInput("");
  const gender = useInput("");
  const contract = useInput("");
  const age = useInput("");
  const budget_low = useInput("");
  const budget_high = useInput("");
  return (
    <Wrapper>
      <ContentWrapper>
        <TextField
          variant="outlined"
          label="Country"
          placeholder="Nigeria ?"
          select
          {...country}
        >
          {countries.map((option) => (
            <MenuItem key={option.code} value={option.name}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
        <TextField variant="outlined" label="Gender" select {...gender}>
          {genders.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Contract Lenght"
          fullWidth
          select
          {...contract}
        >
          <MenuItem value={"6-months"}>{"6-Months"}</MenuItem>
          <MenuItem value={"12-months"}>{"12-Months"}</MenuItem>
        </TextField>
        <TextField
          variant="outlined"
          label="Age"
          placeholder="E.g 2?"
          {...age}
        />
        <TextField variant="outlined" label="Budget Low" select {...budget_low}>
          {prices.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          variant="outlined"
          label="Budget High"
          select
          {...budget_high}
        >
          {prices.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.text}
            </MenuItem>
          ))}
        </TextField>
      </ContentWrapper>
      <ButtonWrapper>
        <Link
          href={`/peers/search?country=${country.value}age=${age.value}gender=${gender.value}contract=${contract.value}budget_low=${budget_low.value}budget_high=${budget_high.value}`}
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
