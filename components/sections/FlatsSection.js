import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import FlatCard from "../ui/FlatCard";
import { Skeleton } from "@material-ui/lab";

export default function FlatsSection() {
  const peers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Wrapper>
      <h1>Latest Flats</h1>
      <ContentWrapper>
        {peers.map((peer, idx) => (
          <FlatCard key={idx} title={"1 bedroom Apartment"} price={"100,000 HUF / Month"} address={"Civis Utca 1"} size={"50 sq.m"} />
        ))}
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
