import React from "react";
import styled from "styled-components";
import { Avatar, Paper } from "@material-ui/core";
import { theme } from "../../model/data";
import Link from "next/link";

export default function PeerCard(props) {
  const { avatar_url, firstname, lastname, country, occupation, residence, user_id } = props.data;
  return (
    <Link href={`/peers/${user_id}`}>
      <Wrapper>
        <ImageWrapper>
          {avatar_url ? (
            <Avatar src={avatar_url} alt="Profile Picture" style={{ width: 150, height: 150 }} />
          ) : (
            <Avatar alt="Profile Picture" style={{ width: 150, height: 150 }}>
              {firstname[0].toUpperCase()}
              {lastname[0].toUpperCase()}
            </Avatar>
          )}
        </ImageWrapper>
        <Title>
          {firstname} {lastname}
        </Title>
        <TextWrapper>
          <SubTitle>{country}</SubTitle>
          <Text>{occupation}</Text>
          <Text>{residence}</Text>
        </TextWrapper>
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  min-width: 250px;
  min-height: 320px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  border: thin solid white;
  transition: 0.2s ease-in;
  :hover {
    border: thin solid ${theme.light.primaryColor};
    transform: translateY(-3px);
    box-shadow: rgba(0, 0, 0, 0.09) 0px 3px 12px;
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
  font-size: 20px;
`;
const SubTitle = styled.h3`
  color: gray;
`;
const Text = styled.p`
  font-size: 10px;
`;
