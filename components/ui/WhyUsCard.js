import styled from "styled-components";
import Image from "next/image";

export default function WhyUsCard(props) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={props.image} width={100} height={100} />
      </ImageWrapper>
      <ContentWrapper>
        <Title>{props.title}</Title>
        <SubTitle>{props.subtitle}</SubTitle>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 250px;
  min-height: 300px;
`;

const ImageWrapper = styled.div`
  display: grid;
  border-radius: 50%;
  width: 200px;
  height: 200px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  padding: 15px;
`;

const Title = styled.h2`
  line-height: 1;
`;

const SubTitle = styled.p`
  color: gray;
`;
