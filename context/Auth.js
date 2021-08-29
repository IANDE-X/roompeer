import React, { useEffect, useContext, createContext, useState } from "react";
import { auth, getUserCredential } from "../model/firebase-config";
import { deleteUserAvatar, deleteUserData, getUserData } from "../model/firebase-user";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const deleteUser = async (password) => {
    if (password == null || password == "") {
      enqueueSnackbar("Please provide your password to continue!", { variant: "error" });
      return;
    }
    await user
      .reauthenticateWithCredential(getUserCredential(user.email, password))
      .then(() => {
        deleteUserData(user.uid).then(() => {
          deleteUserAvatar(user.uid);
          user
            .delete()
            .then(() => {
              enqueueSnackbar("Your account was successfully deleted", { variant: "success" });
            })
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: "error" });
            });
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

  const provideUserData = async (user_id) => {
    let data = await getUserData(user_id);
    setUserData(data);
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (!user) {
        setUser(null);
        router.push("/login");
        return;
      }
      setUser(user);
      provideUserData(user.uid);
    });
  }, []);
  return <AuthContext.Provider value={{ user, userData, signOut, sendEmailVerification, deleteUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
