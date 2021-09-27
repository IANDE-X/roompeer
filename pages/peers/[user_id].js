import { Avatar, Divider } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { getUserData } from "../../model/firebase-user";
import PeerContacts from "../../components/ui/PeerContacts";
import { theme } from "../../model/data";
import BoolIndicator from "../../components/ui/BoolIndicator";

export default function PeerDetail({ data }) {
  const { firstname, lastname, budget_low, budget_high, socials, astrological_sign, country, avatar_url, residence, religion, age, occupation, pets, smoking, partying, noise, gender, email, about, phone_number } = data;
  return (
    <Wrapper>
      <MainWrapper>
        <AvatarWrapper>
          <Avatar src={avatar_url} style={{ width: 250, height: 250 }} />
        </AvatarWrapper>
        <TextWrapper>
          <H1>
            {firstname} {lastname}
          </H1>
          <h2>
            {occupation} from {country}
          </h2>
          <H3>{residence}</H3>
          <H3>{gender}</H3>
          <PeerContacts data={socials} email={email} phone={phone_number} />
        </TextWrapper>
      </MainWrapper>
      <DetailsWrapper>
        <h2>Details</h2>
        <Divider />
        <Row>
          <P>About Me</P>
          <h3>{about}</h3>
        </Row>
        <Row>
          <P>Religion</P>
          <h3> {religion}</h3>
        </Row>
        <Row>
          <P>Age</P>
          <h3>{age}</h3>
        </Row>
        <Row>
          <P>Minimum Budget</P>
          <h3> {budget_low} HUF</h3>
        </Row>
        <Row>
          <P>Maximum Budget</P>
          <h3>{budget_high} HUF</h3>
        </Row>
        <Row>
          <P>Zodiac Sign</P>
          <h3>{astrological_sign}</h3>
        </Row>
        <h2>Flatmate Preferences</h2>
        <Divider />
        <PreferenceWrapper>
          <BoolIndicator title="Smoking" bool={smoking} />
          <BoolIndicator title="Pets" bool={pets} />
          <BoolIndicator title="Partying" bool={partying} />
          <BoolIndicator title="Noise" bool={noise} />
        </PreferenceWrapper>
      </DetailsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 30px;
  padding: 35px;
`;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
`;

const DetailsWrapper = styled.div`
  padding: 15px;
  border-radius: 20px;
  background-color: white;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  @media (max-width: 800px) {
    grid-template-columns: auto;
  }
`;
const AvatarWrapper = styled.div`
  width: 250px;
  height: 250px;
  margin-bottom: 50px;
  background-color: gray;
  border-radius: 50%;
  box-shadow: rgba(14, 31, 53, 0.153) 0px 40px 64px;
`;

const TextWrapper = styled.div``;

const PreferenceWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 10px;
`;

const H1 = styled.h1`
  font-size: 35px;
  @media (max-width: 800px) {
    font-size: 30px;
    line-height: 1;
  }
`;
const H3 = styled.h3`
  color: ${theme.light.primaryColor};
`;
const P = styled.h3`
  color: gray;
`;

export async function getServerSideProps(context) {
  const user_id = context.params.user_id;
  let data = await getUserData(user_id);
  data.created_at = `${data.created_at.toDate()}`;
  return {
    props: { data },
  };
}
