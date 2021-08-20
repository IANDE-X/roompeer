import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { firebaseInstance } from "../../model/firebase-config";

export default function Profile(props) {
  const [userData, setUserData] = useState(null);
  console.log(userData);
  const getUser = async () => {
    if (firebaseInstance) {
      const db = await firebaseInstance.firestore();
      db.collection("users")
        .doc(props.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <Wrapper>
      <H1>Profile</H1>
      {userData ? (
        <ContentWrapper>
          {userData.avatar_url ? (
            <Avatar
              src={avatar_url}
              alt="Profile Picture"
              style={{ width: 150, height: 150 }}
            />
          ) : (
            <Avatar alt="Profile Picture" style={{ width: 150, height: 150 }}>
              {userData.firstname[0].toUpperCase()}
              {userData.lastname[0].toUpperCase()}
            </Avatar>
          )}
          <P>{userData.age}</P>
          <P>{userData.email}</P>
          <P>{userData.country}</P>
          <P>{userData.astrological_sign}</P>
          <P>{userData.firstname}</P>
          <P>{userData.lastname}</P>
          <P>{userData.hobbies}</P>
          <P>{userData.languages}</P>
          <P>{userData.occupation}</P>
          <P>{userData.rent_high}</P>
          <P>{userData.rent_low}</P>
        </ContentWrapper>
      ) : (
        <h1>Loading ..</h1>
      )}
    </Wrapper>
  );
}

const H1 = styled.h1``;
const P = styled.p``;

const Wrapper = styled.div``;

const ContentWrapper = styled.div``;
