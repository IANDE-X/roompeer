import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
import Link from "next/dist/client/link";
import useTranslation from "next-translate/useTranslation";
import { countries, genders } from "../../model/data";
import {
  firebaseInstance,
  addUserProfileInfo,
} from "../../model/firebase-config";
import {
  Typography,
  Button,
  MenuItem,
  CircularProgress,
} from "@material-ui/core";
import { useSnackbar } from "notistack";

export default function SingUpForm() {
  const email = useInput("");
  const password = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const age = useInput("");
  const gender = useInput("");
  const occupation = useInput("");
  const residence = useInput("");
  const country = useInput("");
  const [signingup, setSigningUp] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const user_info = {
    email,
    gender,
    firstname,
    lastname,
    age,
    occupation,
    residence,
    country,
  };

  const createAccount = async (event) => {
    event.preventDefault();
    if (
      email.value == "" ||
      password.value == "" ||
      firstname.value == "" ||
      lastname.value == "" ||
      age.value == "" ||
      country.value == "" ||
      residence.value == "" ||
      gender.value == "" ||
      occupation.value == ""
    ) {
      enqueueSnackbar("All fields are required !", { variant: "error" });
    } else {
      setSigningUp(true);
      try {
        if (firebaseInstance) {
          await firebaseInstance
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value)
            .then((userCredentials) => {
              addUserProfileInfo(userCredentials.user.uid, user_info);
              setSigningUp(false);
              //   sendEmailVerification();
              router.push("/");
            });
        }
      } catch (error) {
        console.log(error.message);
        setSigningUp(false);
      }
    }
  };

  let { t } = useTranslation();
  return (
    <Wrapper>
      <form>
        <FormWrapper>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("form:createaccount")}
          </Typography>
          <div>
            <TextField
              label={t("form:firstname")}
              variant="outlined"
              type="text"
              style={{ width: 150 }}
              {...firstname}
            />
            <TextField
              label={t("form:lastname")}
              variant="outlined"
              type="lastname"
              style={{ width: 150 }}
              {...lastname}
            />
          </div>
          <div>
            <TextField
              label={t("form:age")}
              variant="outlined"
              type="text"
              style={{ width: 100 }}
              {...age}
            />
            <TextField
              label={t("form:country")}
              variant="outlined"
              type="lastname"
              style={{ width: 200 }}
              select
              {...country}
            >
              {countries.map((option) => (
                <MenuItem key={option.code} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              label={t("form:occupation")}
              placeholder="e.g Student ?"
              variant="outlined"
              type="text"
              style={{ width: 150 }}
              {...occupation}
            />
            <TextField
              label={t("Gender")}
              variant="outlined"
              type="text"
              style={{ width: 150 }}
              {...gender}
              select
            >
              {genders.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            label={t("form:residence")}
            placeholder={t("form:citycountry")}
            variant="outlined"
            type="lastname"
            {...residence}
          />
          <TextField
            label={t("form:email")}
            variant="outlined"
            type="email"
            {...email}
          />
          <TextField
            label={t("form:password")}
            variant="outlined"
            type="password"
            {...password}
          />
          <div>
            {signingup ? (
              <CircularProgress color="primary" />
            ) : (
              <Link href="/">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={createAccount}
                >
                  {t("form:signup")}
                </Button>
              </Link>
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
  width: 320px;

  & > div {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
`;

const H1 = styled.h1`
  color: black;
  font-size: 25px;
`;
