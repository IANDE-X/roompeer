import React, { useRef } from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import PeerCard from "../ui/PeerCard";

export default function PeersSection() {
  const peers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const ref = useRef();

  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <Wrapper>
      <h1>Recently joined Peers</h1>
      <ContentWrapper ref={ref}>
        {peers.map((peer, idx) => (
          <PeerCard
            key={idx}
            firstname={"Abdulrahim"}
            lastname={"Iliasu"}
            country={"Nigeria"}
            occupation={"Student"}
            residence={"Debrecen,HU"}
          />
        ))}
      </ContentWrapper>
      <button onClick={() => scroll(-200)}>LEFT</button>
      <button onClick={() => scroll(200)}>RIGHT</button>
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
  padding: 20px;
  gap: 15px;
  width: 95vw;
`;
