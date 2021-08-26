import React from "react";
import styled from "styled-components";
import { firestore } from "../../../model/firebase-config";
import PeerCard from "../../../components/ui/PeerCard";
import Empty from "../../../components/ui/Empty";
import PeersFilter from "../../../components/ui/PeersFilter";

export default function SearchPeers({ data }) {
  console.log();
  return (
    <Wrapper>
      <PeersFilter class="row" />
      {data.length === 0 ? (
        <Empty />
      ) : (
        <ContentWrapper>
          {data.map((peer, idx) => (
            <PeerCard key={idx} data={peer} />
          ))}
        </ContentWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 10px;
`;

export async function getServerSideProps(context) {
  const queries = context.query;
  const { country, age, gender, religion, budget_high } = queries;

  const getPeers = async () => {
    let query = firestore.collection("users");
    if (country !== "") query = query.where("country", "==", country);
    if (gender !== "") query = query.where("gender", "==", gender);
    if (age !== "") query = query.where("age", "==", age);
    if (religion !== "") query = query.where("religion", "==", religion);
    if (budget_high !== "") query = query.where("budget_high", "<=", Number(budget_high));
    return query
      .get()
      .then((querySnapshot) => {
        var data = [];
        querySnapshot.forEach((doc) => {
          let user_data = doc.data();
          user_data.created_at = `${user_data.created_at.toDate()}`;
          data.push(user_data);
        });
        return data;
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };
  let data = await getPeers();
  return {
    props: { data },
  };
}
