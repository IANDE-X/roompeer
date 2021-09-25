import React, { useState } from "react";
import styled from "styled-components";
import { Typography, CircularProgress, TextField } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import useTranslation from "next-translate/useTranslation";
import { useSnackbar } from "notistack";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { useAuth } from "../../context/Auth";

export default function LoginForm() {
  const email = useInput("", true);
  const password = useInput("", true);
  let { t } = useTranslation();
  const [signingIn, setSigningIn] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { signInUser, forgotPassword } = useAuth();

  const handleforgotPassword = () => {
    if (email.value === "") {
      enqueueSnackbar("Please fill in your email !", { variant: "error" });
    } else {
      forgotPassword(email.value);
    }
  };

  const signIn = async (event) => {
    event.preventDefault();
    setSigningIn(true);
    signInUser(email.value, password.value).catch((error) => {
      if (error.code === "auth/wrong-password") enqueueSnackbar("Password is Incorrect", { variant: "error" });
      if (error.code === "auth/user-not-found") enqueueSnackbar("User account not found!", { variant: "error" });
      setSigningIn(false);
    });
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
            <SecondaryButton onClick={handleforgotPassword} title={t("form:forgotpassword")} />
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
