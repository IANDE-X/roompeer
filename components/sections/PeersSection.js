import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { getRecentlyJoinedPeers } from "../../model/firebase-user";
import PeerCard from "../ui/PeerCard";
import RoundButton from "../buttons/RoundButton";
import PeerSkeleton from "../ui/PeerSkeleton";
import Link from "next/link";

export default function PeersSection() {
  const [peers, setPeers] = useState(null);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
  const getPeers = async () => {
    const data = await getRecentlyJoinedPeers();
    setPeers(data);
  };
  useEffect(() => {
    getPeers();
  }, []);
  return (
    <Wrapper>
      <h1>Recently joined Peers</h1>
      {peers ? (
        <ContentWrapper>
          {peers.map((peer) => (
            <PeerCard key={peer.id} data={peer.data} id={peer.id} />
          ))}
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          {skeletons.map((item, idx) => (
            <PeerSkeleton key={idx} />
          ))}
        </ContentWrapper>
      )}
      <ContentWrapper>
        <Link href="/peers/search?country=&age=&gender=&religion=&budget_high=&page=1">
          <RoundButton title="View all Peers" />
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
  gap: 15px;
  width: 95vw;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
