import React, { useEffect, useContext, createContext, useState } from "react";
import { auth, getUserCredential, firestore } from "../model/firebase-config";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = async (password) => {
    if (password == null || password == "") return;
    await user
      .reauthenticateWithCredential(getUserCredential(user.email, password))
      .then(() => {
        firestore
          .collection("users")
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
      await auth.currentUser.sendEmailVerification().then(() => {
        enqueueSnackbar("Verification Email was sent Successfully", { variant: "success" });
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        router.push("/login");
        return;
      }
      setUser(user);
    });
  }, []);
  return <AuthContext.Provider value={{ user, signOut, sendEmailVerification, deleteUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
