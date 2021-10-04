import React, { useEffect, useContext, createContext, useState } from "react";
import { auth, getUserCredential } from "../model/firebase-config";
import { onAuthStateChanged, sendEmailVerification, deleteUser, reauthenticateWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { deleteUserAvatar, deleteUserData, getUserData, addUserProfileInfo } from "../model/firebase-user";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import useTranslation from "next-translate/useTranslation";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  let { t } = useTranslation();

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
        enqueueSnackbar(t("notification:emailsent"), { variant: "success" });
      })
      .catch((error) => {
        enqueueSnackbar(error.message, { variant: "error" });
      });
  };

  const signInUser = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password).then((authUser) => {
      if (authUser) {
        enqueueSnackbar(t("notification:loginsuccess"), {
          variant: "success",
        });
        router.push("/");
      } else {
        enqueueSnackbar(t("notification:loginproblem"), {
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
    const key = enqueueSnackbar(t("notification:sending_email"));
    sendPasswordResetEmail(auth, email)
      .then(() => {
        enqueueSnackbar(t("notification:pass_reset_email_sent"), {
          variant: "success",
        });
      })
      .then(() => {
        closeSnackbar(key);
      })
      .catch((error) => {
        if (error.code === "auth/invalid-email") enqueueSnackbar(t("notification:invalid_email"), { variant: "error" });
        if (error.code === "auth/user-not-found") enqueueSnackbar(t("notification:user_account_not_found"), { variant: "error" });
        closeSnackbar(key);
      });
  };

  const reauthenticateUser = (password) => {
    const credential = getUserCredential(user.email, password);
    return reauthenticateWithCredential(user, credential);
  };

  const deleteCurrentUser = async (password) => {
    if (password == null || password == "") {
      enqueueSnackbar(t("notification:provide_password"), { variant: "error" });
      return;
    }
    const key = enqueueSnackbar(t("notification:deleting_account"));
    reauthenticateUser(password)
      .then(() => {
        deleteUserData(user.uid).then(() => {
          deleteUserAvatar(user.uid)
            .then(() => {
              // File deleted successfully
            })
            .catch((error) => {
              if (error.code === "storage/object-not-found") {
                console.log("User does not have a profile picture!");
              } else console.log(error.code);
            }); // User Avatar does not exist.
          deleteUser(user)
            .then(() => {
              enqueueSnackbar(t("notification:account_deleted"), { variant: "success" });
              closeSnackbar(key);
            })
            .catch((error) => {
              enqueueSnackbar(error.message, { variant: "error" });
              closeSnackbar(key);
            });
        });
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") enqueueSnackbar(t("notification:password_incorrect"), { variant: "error" });
        if (error.code === "auth/user-not-found") enqueueSnackbar(t("notification:user_account_not_found"), { variant: "error" });
        closeSnackbar(key);
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
