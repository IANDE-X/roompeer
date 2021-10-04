import React, { useEffect, useState } from "react";
import styled from "styled-components";
import FlatCard from "../ui/FlatCard";
import RoundButton from "../buttons/RoundButton";
import Link from "next/link";

export default function FlatsSection(props) {
  const flats = props.data.flats;
  return (
    <Wrapper>
      <h1>Recent Flats</h1>
      <ContentWrapper>
        {flats.map((flat) => (
          <FlatCard key={flat.id} data={flat} />
        ))}
      </ContentWrapper>
      <ContentWrapper>
        <Link href="/flats/search?city=&type=&rooms=&price_low=&price_high=&page=1">
          <RoundButton title="View all Flats" />
        </Link>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
  padding: 20px;
  gap: 20px;
  width: 95vw;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
