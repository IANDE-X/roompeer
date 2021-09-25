import React from "react";
import styled from "styled-components";
import PeerCard from "../../../components/ui/PeerCard";
import Empty from "../../../components/ui/Empty";
import PeersFilter from "../../../components/ui/PeersFilter";
import { getSearchedPeers } from "../../../model/firebase-user";

export default function SearchPeers({ data }) {
  return (
    <Wrapper>
      <FilterWrapper>
        <PeersFilter class="row" />
      </FilterWrapper>
      {data.length === 0 ? (
        <Empty />
      ) : (
        <ContentWrapper>
          {data.map((peer, idx) => (
            <PeerCard key={peer.id} data={peer.data} id={peer.id} />
          ))}
        </ContentWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  padding: 10px;
  gap: 10px;
`;

const FilterWrapper = styled.div`
  padding: 10px;
  border-radius: 15px;
  background-color: white;
`;

export async function getServerSideProps(context) {
  let data = await getSearchedPeers(context.query).catch((error) => {
    console.log(error);
    return [];
  });
  return {
    props: { data },
  };
}
