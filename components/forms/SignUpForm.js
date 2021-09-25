import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import useInput from "../../hooks/useInput";
import useTranslation from "next-translate/useTranslation";
import { countries, genders } from "../../model/data";
import { Typography, CircularProgress } from "@material-ui/core";
import { useAuth } from "../../context/Auth";
import SelectButton from "../buttons/SelectButton";
import PrimaryButton from "../buttons/PrimaryButton";
import { useSnackbar } from "notistack";
import Checkbox from "@material-ui/core/Checkbox";

export default function SignUpForm() {
  let { t } = useTranslation();
  const email = useInput("", true);
  const password = useInput("", true, true);
  const firstname = useInput("", true);
  const lastname = useInput("", true);
  const age = useInput("", true);
  const gender = useInput("", true);
  const occupation = useInput("", true);
  const residence = useInput("", true);
  const country = useInput("", true);
  const [signingup, setSigningUp] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { signUpUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

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
    if (!agreed) {
      enqueueSnackbar("Please read and agree to the Terms and Conditions to continue!", { variant: "error" });
      return;
    }
    setSigningUp(true);
    signUpUser(email.value, password.value, user_info).catch((error) => {
      if (error.code === "auth/invalid-email") enqueueSnackbar("The email provided is invalid!", { variant: "error" });
      if (error.code === "auth/weak-password") enqueueSnackbar("Password must be at least 6 characters long!", { variant: "error" });
      if (error.code === "auth/email-already-in-use") enqueueSnackbar("Email is already in use!", { variant: "error" });
      setSigningUp(false);
    });
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
            <TextField label={t("form:occupation")} placeholder="e.g Medical Student ?" variant="outlined" type="text" {...occupation} />
            <SelectButton label={t("Gender")} input={gender} array={genders} />
          </Row>
          <TextField label={t("form:residence")} placeholder={t("form:citycountry")} variant="outlined" {...residence} />
          <TextField label={t("form:email")} variant="outlined" type="email" {...email} />
          <TextField label={t("form:password")} variant="outlined" type="password" {...password} />
          <CheckboxWrapper>
            <div>
              <Checkbox
                checked={agreed}
                onChange={() => {
                  setAgreed(!agreed);
                }}
              />
              I have read and agreed with the
              <a>Terms and Conditions</a>
            </div>
          </CheckboxWrapper>
          <ButtonWrapper>{signingup ? <CircularProgress color="primary" /> : <PrimaryButton type="submit" title={t("form:signup")} />}</ButtonWrapper>
        </FormWrapper>
      </form>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 5px;
`;

const CheckboxWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const FormWrapper = styled.div`
  display: grid;
  gap: 20px;
`;
