import React from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import Image from "next/image";

export default function FlatCard(props) {
  return (
    <Wrapper>
      <ImageWrapper>
        <Image src="/flat.jpg" width={300} height={200} />
      </ImageWrapper>
      <Title>{props.title}</Title>
      <TextWrapper>
        <SubTitle>{props.price}</SubTitle>
        <Text>{props.address}</Text>
        <Text>{props.size}</Text>
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  min-width: 300px;
  min-height: 350px;
  border-radius: 5px;
  background-color: white;
  border: thin solid ${theme.light.lightPurple};
  transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    border: thin solid ${theme.light.primaryColor};
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

const TextWrapper = styled.div`
  line-height: 0.5;
`;

const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 25px;
`;
const SubTitle = styled.h3`
  color: gray;
`;
const Text = styled.p`
  font-size: 10px;
`;
