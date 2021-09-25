import React, { useEffect, useContext, createContext, useState } from "react";
import { auth, getUserCredential } from "../model/firebase-config";
import { onAuthStateChanged, sendEmailVerification, deleteUser, reauthenticateWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { deleteUserAvatar, deleteUserData, getUserData, addUserProfileInfo } from "../model/firebase-user";
import "firebase/auth";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const retrieveUserData = async (user_id) => {
    let data = await getUserData(user_id);
    setUserData(data);
  };

  const signUpUser = async (email, password, user_info) => {
    return createUserWithEmailAndPassword(auth, email, password).then((userCredentials) => {
      const meta = {
        phone_number: userCredentials.user.phoneNumber,
        avatar_url: userCredentials.user.photoURL,
      };
      addUserProfileInfo(userCredentials.user.uid, {
        ...user_info,
        ...meta,
      });
      resendEmailVerification();
      router.push("/");
    });
  };

  const resendEmailVerification = async () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        enqueueSnackbar("Verification Email was sent Successfully", { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((authUser) => {
      if (authUser) {
        enqueueSnackbar("Successfully logged in", {
          variant: "success",
        });
        router.push("/");
      } else {
        enqueueSnackbar("There was a problem sigining in", {
          variant: "error",
        });
      }
    });
  };

  const signOutUser = async () => {
    await signOut(auth).catch((error) => {
      enqueueSnackbar(error.message, { variant: "error" });
    });
  };

  const forgotPassword = async (email) => {
    const key = enqueueSnackbar("Sending Email ...");
    sendPasswordResetEmail(auth, email)
      .then(() => {
        enqueueSnackbar("Password Reset Email was sent", {
          variant: "success",
        });
      })
      .then(() => {
        closeSnackbar(key);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") enqueueSnackbar("Invalid Email!", { variant: "error" });
        if (error.code === "auth/user-not-found") enqueueSnackbar("User account not found!", { variant: "error" });
        closeSnackbar(key);
      });
  };

  const reauthenticateUser = (password) => {
    const credential = getUserCredential(user.email, password);
    return reauthenticateWithCredential(user, credential);
  };

  const deleteCurrentUser = async (password) => {
    if (password == null || password == "") {
      enqueueSnackbar("Please provide your password to continue!", { variant: "error" });
      return;
    }
    const key = enqueueSnackbar("Deleting account...");
    reauthenticateUser(password)
      .then(() => {
        deleteUserData(user.uid).then(() => {
          deleteUserAvatar(user.uid);
          deleteUser(user)
            .then(() => {
              enqueueSnackbar("Your account was successfully deleted", { variant: "success" });
              closeSnackbar(key);
            })
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: "error" });
            });
        });
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") enqueueSnackbar("Password Incorrect!", { variant: "error" });
        if (error.code === "auth/user-not-found") enqueueSnackbar("User account not found!", { variant: "error" });
      });
  };

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
        router.push("/login");
        return;
      }
      setUser(user);
      retrieveUserData(user.uid);
    });
  }, []);
  return <AuthContext.Provider value={{ user, userData, signOutUser, resendEmailVerification, deleteCurrentUser, signUpUser, signInUser, forgotPassword }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
