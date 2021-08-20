import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
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
import { useRouter } from "next/router";

export default function SingUpForm() {
  const email = useInput("", true);
  const password = useInput("", true);
  const firstname = useInput("", true);
  const lastname = useInput("", true);
  const age = useInput("", true);
  const gender = useInput("", true);
  const occupation = useInput("", true);
  const residence = useInput("", true);
  const country = useInput("", true);
  const [signingup, setSigningUp] = useState(false);
  const router = useRouter();

  const user_info = {
    email: email.value,
    gender: gender.value,
    firstname: firstname.value,
    lastname: lastname.value,
    age: age.value,
    occupation: occupation.value,
    residence: residence.value,
    country: country.value,
  };

  const createAccount = async (event) => {
    event.preventDefault();
    setSigningUp(true);
    try {
      if (firebaseInstance) {
        await firebaseInstance
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then((userCredentials) => {
            console.log(userCredentials);
            const meta = {
              signup_date: userCredentials.user.metadata.creationTime,
              phone_number: userCredentials.user.phoneNumber,
              avatar_url: userCredentials.user.photoURL,
            };
            addUserProfileInfo(userCredentials.user.uid, {
              ...user_info,
              ...meta,
            });
            setSigningUp(false);
            // sendEmailVerification();
            router.push("/");
          });
      }
    } catch (error) {
      console.log(error.message);
      setSigningUp(false);
    }
  };

  let { t } = useTranslation();
  return (
    <Wrapper>
      <form onSubmit={createAccount}>
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
              <Button variant="contained" color="primary" type="submit">
                {t("form:signup")}
              </Button>
            )}
          </div>
        </FormWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & > div {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    flex-wrap: wrap;
  }
`;

const H1 = styled.h1`
  color: black;
  font-size: 25px;
`;
