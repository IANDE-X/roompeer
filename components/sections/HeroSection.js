import React from "react";
import styled from "styled-components";
import FilterBox from "../ui/FilterBox";

export default function HeroSection() {
  return (
    <Wrapper>
      <Title>Find Rooms and Roomates</Title>
      <FilterBox />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 500px;
  background-color: #f0f0f0;
  background-image: url("/backgrounds/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Title = styled.h1`
  color: white;
  font-size: 40px;
  text-shadow: rgba(0, 0, 0, 0.3) 0px 20px 40px;
  font-weight: bold;
`;
