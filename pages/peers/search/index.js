import React from "react";
import styled from "styled-components";
import PeerCard from "../../../components/ui/PeerCard";
import Empty from "../../../components/ui/Empty";
import PeersFilter from "../../../components/ui/PeersFilter";
import { getSearchedPeers } from "../../../model/firebase-user";
import Pagination from "../../../components/ui/Pagination";

export default function SearchPeers({ data, queries }) {
  const { country, age, gender, religion, budget_high, page } = queries;

  return (
    <Wrapper>
      <FilterWrapper>
        <PeersFilter searchedQueries={queries} />
      </FilterWrapper>
      {data.length === 0 ? (
        <Empty />
      ) : (
        <>
          <ContentWrapper>
            {data.map((peer) => (
              <PeerCard key={peer.id} data={peer.data} id={peer.id} />
            ))}
          </ContentWrapper>
          <PaginationWrapper>
            <Pagination
              hasPrevious={Number(page) > 1}
              previous={`/peers/search?country=${country}&age=${age}&gender=${gender}&religion=${religion}&budget_high=${budget_high}&page=${Number(page) - 1}&cursor=${data[data.length - 1].id}&previous=${true}`}
              current={page}
              hasNext={data.length >= 10}
              next={`/peers/search?country=${country}&age=${age}&gender=${gender}&religion=${religion}&budget_high=${budget_high}&page=${Number(page) + 1}&cursor=${data[data.length - 1].id}`}
            />
          </PaginationWrapper>
        </>
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 15px;
`;

export async function getServerSideProps(context) {
  const queries = context.query;
  let data = await getSearchedPeers(queries).catch((error) => {
    console.log(error);
    return [];
  });
  return {
    props: { data, queries },
  };
}
