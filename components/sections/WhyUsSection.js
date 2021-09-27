import styled from "styled-components";
import WhyUsCard from "../ui/WhyUsCard";
import { whyUsContent } from "../../model/data";

export default function WhyUsSection() {
  return (
    <Wrapper>
      <Heading>
        <h1>Why Us</h1>
      </Heading>
      <ContentWrapper>
        {whyUsContent.map((item, idx) => {
          return <WhyUsCard key={idx} content={item} />;
        })}
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: #f0f0f0;
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  justify-content: space-evenly;
`;

const Heading = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
