import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import styled from "styled-components";
import { theme } from "../../model/data";
import Link from "next/link";

export default function Pagination(props) {
  return (
    <Wrapper>
      {props.hasPrevious ? (
        <Link href={props.previous}>
          <ContentWrapper>
            <ChevronLeft fontSize="medium" />
          </ContentWrapper>
        </Link>
      ) : (
        <></>
      )}
      <ContentWrapper>
        <Page>{props.current}</Page>
      </ContentWrapper>
      {props.hasNext ? (
        <Link href={props.next}>
          <ContentWrapper>
            <ChevronRight fontSize="medium" />
          </ContentWrapper>
        </Link>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  color: white;
  cursor: pointer;
  background-color: ${theme.light.primaryColor};
  transition: 0.3s ease-in-out;
  :hover {
    opacity: 70%;
  }
`;

const Page = styled.p`
  font-size: 15px;
  font-weight: bold;
`;
