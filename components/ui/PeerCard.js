import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { theme } from "../../model/data";

export default function PeerCard(props) {
  return (
    <Wrapper>
      <ImageWrapper>
        {props.avatar_url ? (
          <Avatar
            src={avatar_url}
            alt="Profile Picture"
            style={{ width: 150, height: 150 }}
          />
        ) : (
          <Avatar alt="Profile Picture" style={{ width: 150, height: 150 }}>
            {props.firstname[0].toUpperCase()}
            {props.lastname[0].toUpperCase()}
          </Avatar>
        )}
      </ImageWrapper>
      <Title>
        {props.firstname} {props.lastname}
      </Title>
      <TextWrapper>
        <SubTitle>{props.country}</SubTitle>
        <Text>{props.occupation}</Text>
        <Text>{props.residence}</Text>
      </TextWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  min-width: 250px;
  min-height: 320px;
  border-radius: 20px;
  background-color: white;
  border: thin solid ${theme.light.lightPurple};
  transition: 0.2s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    border: thin solid ${theme.light.primaryColor};
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
  font-size: 25px;
`;
const SubTitle = styled.h3`
  color: gray;
`;
const Text = styled.p`
  font-size: 10px;
`;
