import styled from "styled-components";
import FlatCard from "../ui/FlatCard";
import { theme } from "../../model/data";
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
        <Link href="/flats/search?city=&type=&rooms=&price_low=&price_high=">
          <ButtonWrapper>View all Flats</ButtonWrapper>
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

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 25px;
  cursor: pointer;
  height: 50px;
  width: 150px;
  color: white;
  background-color: ${theme.light.primaryColor};
  transition: 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    background-color: ${theme.light.secondaryColor};
  }
`;
