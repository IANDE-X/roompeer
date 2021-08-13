import React from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import PeerCard from "../ui/PeerCard";

export default function PeersFeaturedSection() {
  const peers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <Wrapper>
      <h1>Recently joined Peers</h1>
      <ContentWrapper>
        {peers.map((peer) => (
          <PeerCard
            firstname={"Abdulrahim"}
            lastname={"Iliasu"}
            country={"Nigeria"}
            occupation={"Student"}
            residence={"Debrecen,HU"}
          />
        ))}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  background-color: ${theme.light.background};
`;

const ContentWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
  gap: 15px;
  width: 100vw;
`;
