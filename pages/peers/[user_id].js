import { Avatar, Paper } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { firestore } from "../../model/firebase-config";

export default function PeerDetail({ data }) {
  const { firstname, lastname, budget_low, budget_high, socials, astrological_sign, country, avatar_url, residence, religion, age, occupation, pets, smoking, gender, email, about, phone_number, prefered_contract_lenght } = data;
  return (
    <Wrapper>
      <Avatar src={avatar_url} component={Paper} elevation={5} style={{ width: 250, height: 250 }} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 20px;
`;

export async function getServerSideProps(context) {
  const user_id = context.params.user_id;
  const getUserData = async () => {
    let query = firestore.collection("users").doc(user_id);
    return query
      .get()
      .then((doc) => {
        if (doc.exists) {
          var data = doc.data();
          delete data.created_at;
          return data;
        }
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  let data = await getUserData();
  return {
    props: { data },
  };
}
