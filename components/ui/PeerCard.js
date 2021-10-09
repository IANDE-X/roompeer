import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { theme } from "../../model/data";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

export default function PeerCard(props) {
  const { avatar_url, firstname, lastname, country, occupation, residence, flatmate_status } = props.data;
  let { t } = useTranslation();
  return (
    <Link href={`/peers/${props.id}`}>
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
        {flatmate_status ? <StatusText status={flatmate_status}>{t("common:actively_looking")}</StatusText> : <StatusText status={flatmate_status}>{t("common:not_looking")}</StatusText>}
      </Wrapper>
    </Link>
  );
}

const Wrapper = styled.div`
  padding: 20px;
  min-width: 250px;
  max-width: 270px;
  min-height: 320px;
  max-height: 350px;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  border: thin solid white;
  transition: 0.2s ease-in;
  text-overflow: ellipsis;
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
  line-height: 1;
`;
const Text = styled.p`
  font-size: 10px;
`;

const StatusText = styled.p`
  font-size: 10px;
  color: ${(props) => (props.status ? "green" : "red")};
`;
