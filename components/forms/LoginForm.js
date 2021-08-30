import React, { useState } from "react";
import styled from "styled-components";
import { Typography, CircularProgress, TextField } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { auth } from "../../model/firebase-config";
import { useSnackbar } from "notistack";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

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
      const key = enqueueSnackbar("Sending Email ...", { variant: "info" });
      auth
        .sendPasswordResetEmail(email.value)
        .then(() => {
          enqueueSnackbar("Password Reset Email was sent", {
            variant: "success",
          });
        })
        .then(() => {
          closeSnackbar(key);
        })
        .catch((error) => {
          enqueueSnackbar(error.message, { variant: "error" });
        });
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    setSigningIn(true);
    try {
      auth.signInWithEmailAndPassword(email.value, password.value).then((authUser) => {
        if (authUser) {
          router.push("/");
        }
      });
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
      setSigningIn(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={signIn}>
        <TextWrapper>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("form:signin")}
          </Typography>
        </TextWrapper>
        <FormWrapper>
          <TextField label={t("form:email")} type="email" variant="outlined" {...email} />
          <TextField label={t("form:password")} variant="outlined" type="password" {...password} />
          <div className="btns">
            <SecondaryButton onClick={forgotPassword} title={t("form:forgotpassword")} />
            {signingIn ? <CircularProgress color="primary" /> : <PrimaryButton type="submit" title="Sign in" />}
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

  & > .btns {
    display: flex;
    justify-content: space-around;
    gap: 20px;
  }

  @media only screen and (max-width: 600px) {
    min-width: 250px;
  }
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
