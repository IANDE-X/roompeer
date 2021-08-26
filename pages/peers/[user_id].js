import { Avatar, Paper, Divider } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { firestore } from "../../model/firebase-config";
import { theme } from "../../model/data";
import Socials from "../../components/ui/Socials";

export default function PeerDetail({ data }) {
  const { firstname, lastname, budget_low, budget_high, socials, astrological_sign, country, avatar_url, residence, religion, age, occupation, pets, smoking, gender, email, about, phone_number, prefered_contract_lenght } = data;
  return (
    <Wrapper>
      <TopWrapper>
        <Avatar src={avatar_url} component={Paper} elevation={5} style={{ width: 200, height: 200 }} />
        <TextWrapper>
          <H1>
            {firstname} {lastname}
          </H1>
          <p>
            {email}, {phone_number}
          </p>
          <H3>
            {occupation} from {country}
          </H3>
          <H3>{residence}</H3>
          <H3>{gender}</H3>
          <Socials data={socials} />
        </TextWrapper>
      </TopWrapper>
      <BottomWrapper>
        <h3>About Me:</h3>
        <p>{about}</p>
        <h3>Religion: {religion}</h3>
        <h3>age: {age}</h3>
        <h3>Minimum Budget: {budget_low} HUF</h3>
        <h3>Maximum Budget: {budget_high} HUF</h3>
        <h3>Prefered Contract: {prefered_contract_lenght}</h3>
        <h3>Zodiac Sign: {astrological_sign}</h3>
        <h3>Smoking: {smoking ? "Yes" : "No"}</h3>
        <h3>Pets: {pets ? "Yes" : "No"}</h3>
        <Divider />
      </BottomWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
  padding: 35px;
`;

const TopWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  border-radius: 20px;
  padding: 20px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`;

const BottomWrapper = styled.div`
  padding: 15px;
  border-radius: 20px;
  background-color: white;
`;

const TextWrapper = styled.div`
  line-height: 0.7;
`;

const H1 = styled.h1``;
const H3 = styled.h3`
  color: gray;
`;
const P = styled.p``;

export async function getServerSideProps(context) {
  const user_id = context.params.user_id;
  const getUserData = async () => {
    let query = firestore.collection("users").doc(user_id);
    return query
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          return data;
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  let data = await getUserData();
  data.created_at = `${data.created_at.toDate()}`;
  return {
    props: { data },
  };
}
