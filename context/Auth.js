import React, { useEffect, useContext, createContext, useState } from "react";
import { firebaseInstance } from "../model/firebase-config";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

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
  return (
    <AuthContext.Provider value={{ user, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
