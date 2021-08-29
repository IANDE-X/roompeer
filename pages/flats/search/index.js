import React from "react";
import styled from "styled-components";
import FlatCard from "../../../components/ui/FlatCard";
import Empty from "../../../components/ui/Empty";
import FlatsFilter from "../../../components/ui/FlatsFliter";
import { getSearchedFlatsQuery, graphCmsClient, getQueryString } from "../../../model/graphcms";

export default function SearchFlats({ data }) {
  return (
    <Wrapper>
      <FilterWrapper>
        <FlatsFilter />
      </FilterWrapper>
      {data.flats.length === 0 ? (
        <Empty />
      ) : (
        <ContentWrapper>
          {data.flats.map((flat) => (
            <FlatCard key={flat.id} data={flat} />
          ))}
        </ContentWrapper>
      )}
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
  padding: 10px;
  display: flex;
  gap: 10px;
`;

const FilterWrapper = styled.div`
  padding: 10px;
  border-radius: 15px;
  background-color: white;
`;

export async function getServerSideProps(context) {
  let queryString = getQueryString(context.query, context.locale);
  const query = getSearchedFlatsQuery(queryString);
  let data = await graphCmsClient.request(query);
  return {
    props: { data },
  };
}
