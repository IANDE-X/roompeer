import React, { useEffect, useContext, createContext, useState } from "react";
import { firebaseInstance, getUserCredential } from "../model/firebase-config";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  let userIns, db, storage, storageRef;
  if (firebaseInstance) {
    userIns = firebaseInstance.auth().currentUser;
    db = firebaseInstance.firestore();
    storage = firebaseInstance.storage();
    storageRef = storage.ref("avatars");
  }

  const deleteUser = async (password) => {
    if (password == null || password == "") return;
    await user
      .reauthenticateWithCredential(getUserCredential(user.email, password))
      .then(() => {
        db.collection("users")
          .doc(user.uid)
          .delete()
          .then(() => {
            user
              .delete()
              .then(() => {
                enqueueSnackbar("Your account was successfully deleted", { variant: "success" });
              })
              .catch((error) => {
                enqueueSnackbar(error.message, { variant: "error" });
              });
          })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  const sendEmailVerification = async () => {
    try {
      if (firebaseInstance) {
        await firebaseInstance
          .auth()
          .currentUser.sendEmailVerification()
          .then(() => {
            enqueueSnackbar("Verification Email was sent Successfully", { variant: "success" });
          });
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const signOut = async () => {
    try {
      if (firebaseInstance) {
        await firebaseInstance.auth().signOut();
      }
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    if (firebaseInstance) {
      return firebaseInstance.auth().onAuthStateChanged((user) => {
        if (!user) {
          setUser(null);
          router.push("/login");
          return;
        }
        setUser(user);
      });
    }
  }, []);
  return <AuthContext.Provider value={{ user, signOut, sendEmailVerification, deleteUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
