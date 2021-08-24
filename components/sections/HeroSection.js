import React from "react";
import styled from "styled-components";
import FilterBox from "../ui/FilterBox";

export default function HeroSection() {
  return (
    <Wrapper>
      <h1>Find Rooms and Peers</h1>
      <FilterBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 400px;
  background-color: #f0f0f0;
`;
