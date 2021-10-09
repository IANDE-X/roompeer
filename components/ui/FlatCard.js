import React from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import Image from "next/image";
import Link from "next/dist/client/link";

export default function FlatCard(props) {
  const { title, price, address, size, pictures, referenceNumber } = props.data;
  return (
    <Link href={`/flats/${referenceNumber}`}>
      <Wrapper>
        <ImageWrapper>
          <RoundImage src={pictures[0].url} width={300} height={200} />
        </ImageWrapper>
        <Title>{title}</Title>
        <TextWrapper>
          <SubTitle>{price} HUF /Month</SubTitle>
          <Text>{address}</Text>
          <Text>{size} sq.m</Text>
        </TextWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  min-width: 300px;
  max-width: 300px;
  padding: 20px;
  min-height: 350px;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;
  border: thin solid white;
  transition: 0.3s ease-in-out;
  :hover {
    border: thin solid ${theme.light.primaryColor};
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    transform: translateY(-5px);
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

const RoundImage = styled(Image)`
  border-radius: 3px;
`;

const Title = styled.h1`
  font-size: 20px;
`;
const SubTitle = styled.h3`
  color: gray;
`;
const Text = styled.p`
  font-size: 10px;
`;
