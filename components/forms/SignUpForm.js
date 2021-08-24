import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
import useTranslation from "next-translate/useTranslation";
import { countries, genders } from "../../model/data";
import { auth } from "../../model/firebase-config";
import { addUserProfileInfo } from "../../model/firebase-user";
import { Typography, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuth } from "../../context/Auth";
import SelectButton from "../buttons/SelectButton";
import PrimaryButton from "../buttons/PrimaryButton";

export default function SingUpForm() {
  let { t } = useTranslation();
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
  const { sendEmailVerification } = useAuth();

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
      auth.createUserWithEmailAndPassword(email.value, password.value).then((userCredentials) => {
        const meta = {
          user_id: userCredentials.user.uid,
          phone_number: userCredentials.user.phoneNumber,
          avatar_url: userCredentials.user.photoURL,
        };
        addUserProfileInfo(userCredentials.user.uid, {
          ...user_info,
          ...meta,
        });
        sendEmailVerification();
        setSigningUp(false);
        router.push("/");
      });
    } catch (error) {
      setSigningUp(false);
    }
  };

  return (
    <Wrapper>
      <form onSubmit={createAccount}>
        <FormWrapper>
          <Typography variant="h4" component="h2" gutterBottom color="primary">
            {t("form:createaccount")}
          </Typography>
          <Row>
            <TextField label={t("form:firstname")} variant="outlined" type="text" {...firstname} />
            <TextField label={t("form:lastname")} variant="outlined" type="text" {...lastname} />
          </Row>
          <Row>
            <TextField label={t("form:age")} variant="outlined" type="text" {...age} />
            <SelectButton label={t("form:country")} input={country} array={countries} />
          </Row>
          <Row>
            <TextField label={t("form:occupation")} placeholder="e.g Student ?" variant="outlined" type="text" {...occupation} />
            <SelectButton label={t("Gender")} input={gender} array={genders} />
          </Row>
          <TextField label={t("form:residence")} placeholder={t("form:citycountry")} variant="outlined" {...residence} />
          <TextField label={t("form:email")} variant="outlined" type="email" {...email} />
          <TextField label={t("form:password")} variant="outlined" type="password" {...password} />
          <div>{signingup ? <CircularProgress color="primary" /> : <PrimaryButton type="submit" title={t("form:signup")} />}</div>
        </FormWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 10px;
`;

const FormWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 20px;
`;
