import React, { useEffect, useContext, createContext, useState } from "react";
import { firebaseInstance } from "../model/firebase-config";
import "firebase/auth";
import { useRouter } from "next/router";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (firebaseInstance) {
      return firebaseInstance.auth().onAuthStateChanged((user) => {
        if (!user) {
          setUser(null);
          router.push("/login");
          return;
        }
        setUser(user);
        console.log("User from: " + user);
      });
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
