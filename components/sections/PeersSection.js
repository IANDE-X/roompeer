import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "../../model/data";
import { firestore } from "../../model/firebase-config";
import PeerCard from "../ui/PeerCard";
import { Skeleton } from "@material-ui/lab";

export default function PeersSection() {
  const ref = useRef();
  const [peers, setPeers] = useState(null);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  const getPeers = async () => {
    firestore
      .collection("users")
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
            <PeerCard key={idx} data={peer} />
          ))}
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          {skeletons.map((item, idx) => (
            <SkeletonWrapper key={idx}>
              <Skeleton height={150} width={150} variant="circle" />
              <Skeleton height={50} />
              <Skeleton animation="wave" height={20} />
              <Skeleton animation="wave" />
              <Skeleton animation="wave" />
            </SkeletonWrapper>
          ))}
        </ContentWrapper>
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

const SkeletonWrapper = styled.div`
  padding: 20px;
  min-width: 250px;
  min-height: 320px;
  border-radius: 10px;
  background-color: white;
  border: thin solid white;
`;
