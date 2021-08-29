import styled from "styled-components";
import FlatCard from "../ui/FlatCard";

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
