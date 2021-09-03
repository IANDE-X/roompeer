import { Avatar, Divider } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { getUserData } from "../../model/firebase-user";
import PeerContacts from "../../components/ui/PeerContacts";
import { theme } from "../../model/data";
import BoolIndicator from "../../components/ui/BoolIndicator";

export default function PeerDetail({ data }) {
  const { firstname, lastname, budget_low, budget_high, socials, astrological_sign, country, avatar_url, residence, religion, age, occupation, pets, smoking, gender, email, about, phone_number, prefered_contract_lenght } = data;
  return (
    <Wrapper>
      <TopWrapper>
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
      </TopWrapper>
      <BottomWrapper>
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
          <P>Prefered Contract</P>
          <h3>{prefered_contract_lenght}</h3>
        </Row>
        <Row>
          <P>Prefered Contract</P>
          <h3>{prefered_contract_lenght}</h3>
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
        </PreferenceWrapper>
      </BottomWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  gap: 30px;
  padding: 35px;
  @media (max-width: 800px) {
    grid-template-columns: auto;
    justify-content: center;
    gap: 15px;
  }
`;

const TopWrapper = styled.div`
  display: block;
  padding: 20px;
`;

const BottomWrapper = styled.div`
  padding: 15px;
  border-radius: 20px;
  background-color: white;
`;
const Row = styled.div`
  display: grid;
  grid-template-columns: 200px auto;
  justify-items: save;
  gap: 10px;

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

const TextWrapper = styled.div`
  line-height: 0.7;
`;

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
