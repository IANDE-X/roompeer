import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Profile from "../components/ui/Profile";
import LoadingPage from "../components/ui/LoadingPage";
import { firebaseInstance } from "../model/firebase-config";
import { useSnackbar } from "notistack";

export default function Account() {
  const [userData, setUserData] = useState(null);
  const [user, setUser] = useState(null);
  const { enqueueSnackBar } = useSnackbar();

  async function getData() {
    firebaseInstance.auth().onAuthStateChanged(async (user) => {
      if (user) {
        const db = await firebaseInstance.firestore();
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setUserData(doc.data());
              setUser(user);
            } else {
              enqueueSnackBar("User details not found!", { variant: "error" });
            }
          })
          .catch((error) => {
            enqueueSnackBar(error.message, { variant: "error" });
          });
      }
    });
  }

  useEffect(() => {
    getData();
  }, []);

  return <Wrapper>{userData && user ? <Profile data={userData} user={user} /> : <LoadingPage />}</Wrapper>;
}

const Wrapper = styled.div``;
