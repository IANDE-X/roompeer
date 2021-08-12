import React from "react";
import styled from "styled-components";
import FilterBox from "../ui/FilterBox";

export default function HeroSection() {
  return (
    <Wrapper>
      <FilterBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 300px;
  background-image: linear-gradient(
    68.2deg,
    rgba(255, 202, 88, 1) 0%,
    rgba(139, 73, 255, 1) 100.2%
  );
`;
