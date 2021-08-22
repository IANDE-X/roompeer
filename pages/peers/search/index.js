import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { firebaseInstance } from "../../../model/firebase-config";
import PeerCard from "../../../components/ui/PeerCard";
import { Skeleton } from "@material-ui/lab";

export default function SearchPeers({ queries }) {
  const [peers, setPeers] = useState(null);
  const { country, age, gender, contract, budget_low, budget_high } = queries;

  const getPeers = async () => {
    if (firebaseInstance) {
      const db = await firebaseInstance.firestore();
      let query = db.collection("users");
      if (country !== "") query = query.where("country", "==", country);
      if (gender !== "") query = query.where("gender", "==", gender);
      if (age !== "") query = query.where("age", "==", age);
      if (contract !== "") query = query.where("prefered_contract_lenght", "==", contract);
      if (budget_low !== "") query = query.where("budget_low", ">=", budget_low);
      if (budget_high !== "") query = query.where("budget_high", "<=", budget_high);
      query
        .get()
        .then((querySnapshot) => {
          var data = [];
          querySnapshot.forEach((doc) => {
            data.push(doc.data());
          });
          setPeers(data);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };
  useEffect(() => {
    getPeers();
  }, []);

  return (
    <Wrapper>
      {peers ? (
        <ContentWrapper>
          {peers.map((peer, idx) => (
            <PeerCard key={idx} firstname={peer.firstname} lastname={peer.lastname} country={peer.country} occupation={peer.occupation} residence={peer.residence} avatar_url={peer.avatar_url} />
          ))}
        </ContentWrapper>
      ) : (
        <>
          <Skeleton height={100} width={100} variant="circle" />
          <Skeleton height={100} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  gap: 15px;
`;

export async function getServerSideProps(context) {
  const queries = context.query;
  return {
    props: { queries },
  };
}
