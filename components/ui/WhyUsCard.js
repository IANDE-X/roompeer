import styled from "styled-components";
import Image from "next/image";

export default function WhyUsCard(props) {
  const { image, title, subtitle } = props.content;
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src={image} width={100} height={100} />
      </ImageWrapper>
      <ContentWrapper>
        <Title>{title}</Title>
        <SubTitle>{subtitle}</SubTitle>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 250px;
  min-height: 300px;
`;

const ImageWrapper = styled.div`
  display: grid;
  border-radius: 20px;
  width: 200px;
  height: 150px;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const ContentWrapper = styled.div`
  padding: 15px;
`;

const Title = styled.h2`
  line-height: 0.5;
`;

const SubTitle = styled.p`
  color: gray;
`;
