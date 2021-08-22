import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import { firebaseInstance } from "../../model/firebase-config";
import PeerCard from "../ui/PeerCard";
import { Skeleton } from "@material-ui/lab";

export default function PeersSection() {
  const ref = useRef();
  const [peers, setPeers] = useState(null);

  const getPeers = async () => {
    if (firebaseInstance) {
      const db = await firebaseInstance.firestore();
      db.collection("users")
        .orderBy("created_at", "desc")
        .limit(10)
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
      <h1>Recently joined Peers</h1>
      {peers ? (
        <ContentWrapper ref={ref}>
          {peers.map((peer, idx) => (
            <PeerCard key={idx} firstname={peer.firstname} lastname={peer.lastname} country={peer.country} occupation={peer.occupation} residence={peer.residence} avatar_url={peer.avatar_url} />
          ))}
        </ContentWrapper>
      ) : (
        <>
          <Skeleton height={100} width={100} variant="circle" />
          <Skeleton height={100} />
          <Skeleton animation="wave" height={70} />
          <Skeleton animation="wave" />
          <Skeleton animation="wave" />
        </>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 25px;
  background-color: #f0f0f0;
`;

const ContentWrapper = styled.div`
  display: flex;
  overflow-x: scroll;
  flex-wrap: nowrap;
  padding: 20px;
  gap: 15px;
  width: 95vw;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;
