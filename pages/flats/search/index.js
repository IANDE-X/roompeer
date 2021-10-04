import React from "react";
import styled from "styled-components";
import FlatCard from "../../../components/ui/FlatCard";
import Empty from "../../../components/ui/Empty";
import FlatsFilter from "../../../components/ui/FlatsFliter";
import { getSearchedFlatsQuery, graphCmsClient, getQueryString } from "../../../model/graphcms";
import Pagination from "../../../components/ui/Pagination";

export default function SearchFlats({ data, queries }) {
  const { city, type, rooms, price_low, price_high, page } = queries;
  return (
    <Wrapper>
      <FilterWrapper>
        <FlatsFilter />
      </FilterWrapper>
      {data.flats.length === 0 ? (
        <Empty />
      ) : (
        <ContentWrapper>
          {data.flats.slice(0, 10).map((flat) => (
            <FlatCard key={flat.id} data={flat} />
          ))}
        </ContentWrapper>
      )}
      <PaginationWrapper>
        <Pagination
          hasPrevious={Number(page) > 1}
          previous={`/flats/search?city=${city}&type=${type}&rooms=${rooms}&price_low=${price_low}&price_high=${price_high}&page=${Number(page) - 1}`}
          current={page}
          hasNext={data.flats.length > 10}
          next={`/flats/search?city=${city}&type=${type}&rooms=${rooms}&price_low=${price_low}&price_high=${price_high}&page=${Number(page) + 1}`}
        />
      </PaginationWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
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
  let queryString = getQueryString(queries, context.locale);
  const query = getSearchedFlatsQuery(queryString);
  let data = await graphCmsClient.request(query);
  return {
    props: { data, queries },
  };
}
