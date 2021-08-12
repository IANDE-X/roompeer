import React, { useState } from "react";
import styled from "styled-components";
import {
  Typography,
  Button,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import useInput from "../../hooks/useInput";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { firebaseInstance } from "../../model/firebase-config";
import { useSnackbar } from "notistack";

export default function LoginForm() {
  const email = useInput("", true);
  const password = useInput("", true);
  let { t } = useTranslation();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const forgotPassword = () => {
    if (email.value === "") {
      enqueueSnackbar("Please fill in email !", { variant: "error" });
    } else {
      firebaseInstance
        .auth()
        .sendPasswordResetEmail(email.value)
        .then(() => {
          enqueueSnackbar("Password Reset Email was sent", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: "error" });
        });
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (email.value === "" || password.value === "") {
      enqueueSnackbar("All fields are required !", { variant: "error" });
    } else {
      setSigningIn(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then((authUser) => {
              if (authUser) {
                router.push("/");
              }
            });
        }
      } catch (error) {
        enqueueSnackbar(error.message, { variant: "error" });
        setSigningIn(false);
      }
    }
  };

  return (
    <Wrapper>
      <form onSubmit={signIn}>
        <FormWrapper>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("form:signin")}
          </Typography>
          <TextField
            label={t("form:email")}
            type="email"
            variant="outlined"
            {...email}
          />
          <TextField
            label={t("form:password")}
            variant="outlined"
            type="password"
            {...password}
          />
          <div>
            <Button color="primary" onClick={forgotPassword}>
              {t("form:forgotpassword")}
            </Button>
            {signingIn ? (
              <CircularProgress color="primary" />
            ) : (
              <Button variant="contained" color="primary" type="submit">
                {t("form:signin")}
              </Button>
            )}
          </div>
        </FormWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 350px;

  & > div {
    display: flex;
    justify-content: space-around;
  }
`;

const H1 = styled.h1`
  color: black;
  font-size: 25px;
`;
