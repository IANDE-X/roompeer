import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import { FormControl, Typography, Button } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import Link from "next/dist/client/link";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { firebaseInstance } from "../../model/firebase-config";

export default function LoginForm() {
  const email = useInput("");
  const password = useInput("");
  let { t } = useTranslation();
  const router = useRouter();
  const [signingIn, setSigningIn] = useState(false);

  const forgotPassword = () => {
    firebaseInstance
      .auth()
      .sendPasswordResetEmail(email.value)
      .then(() => {
        // cogoToast.success(t("forms:passwordreset"));
      })
      .catch((error) => {
        // cogoToast.error(error.message);
      });
  };

  const signIn = async (event) => {
    event.preventDefault();
    if (email.value === "" || password.value === "") {
    } else {
      setSigningIn(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then((authUser) => {
              if (authUser) {
                // cogoToast.success(t("forms:successlogin"));
                // router.push("/account");
              }
            });
        }
      } catch (error) {
        // cogoToast.error(error.message);
        setSigningIn(false);
      }
    }
  };

  return (
    <Wrapper>
      <FormControl>
        <FormWrapper>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("form:signin")}
          </Typography>
          <TextField
            id="outlined-basic"
            label={t("form:email")}
            variant="outlined"
            type="email"
            {...email}
          />
          <TextField
            id="outlined-basic"
            label={t("form:password")}
            variant="outlined"
            type="password"
            {...password}
          />
          <div>
            <Link href="/">
              <Button color="primary" onClick={forgotPassword}>
                {t("form:forgotpassword")}
              </Button>
            </Link>
            <Link href="/">
              <Button variant="contained" color="primary" onClick={signIn}>
                {t("form:signin")}
              </Button>
            </Link>
          </div>
        </FormWrapper>
      </FormControl>
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
