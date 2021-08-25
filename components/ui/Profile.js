import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Switch, Divider, Paper } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import PrimartButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ProfileTextField from "./ProfileTexField";
import { updateUserProfileInfo } from "../../model/firebase-user";
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";
import UploadButton from "../buttons/UploadButton";
import { countries, genders, prices, zodiacs, religions } from "../../model/data";
import SelectButton from "../buttons/SelectButton";
import { useAuth } from "../../context/Auth";

export default function Profile(props) {
  const { firstname, lastname, age, gender, occupation, residence, astrological_sign, country, budget_high, budget_low, avatar_url, email, pets, phone_number, prefered_area, socials, smoking, religion, about } = props.data;
  const { enqueueSnackbar } = useSnackbar();
  const { sendEmailVerification, deleteUser } = useAuth();

  const [deleteField, setDeleteField] = useState(false);
  const [edit, setEdit] = useState(true);

  const firstname_ = useInput(firstname);
  const lastname_ = useInput(lastname);
  const age_ = useInput(age);
  const religion_ = useInput(religion);
  const about_ = useInput(about);
  const gender_ = useInput(gender);
  const occupation_ = useInput(occupation);
  const residence_ = useInput(residence);
  const astrological_sign_ = useInput(astrological_sign);
  const country_ = useInput(country);
  const budget_high_ = useInput(budget_high);
  const budget_low_ = useInput(budget_low);
  const phone_number_ = useInput(phone_number);
  const prefered_area_ = useInput(prefered_area);
  const [pets_, setPets_] = useState(pets);
  const [smoking_, setSmoking_] = useState(smoking);
  const facebook_ = useInput(socials.facebook);
  const instagram_ = useInput(socials.instagram);
  const twitter_ = useInput(socials.twitter);
  const password = useInput("");

  const update = {
    gender: gender_.value,
    firstname: firstname_.value,
    lastname: lastname_.value,
    age: age_.value,
    religion: religion_.value,
    about: about_.value,
    occupation: occupation_.value,
    residence: residence_.value,
    country: country_.value,
    prefered_area: prefered_area_.value,
    budget_low: budget_low_.value,
    budget_high: budget_high_.value,
    smoking: smoking_,
    pets: pets_,
    astrological_sign: astrological_sign_.value,
    phone_number: phone_number_.value,
    socials: {
      facebook: facebook_.value,
      instagram: instagram_.value,
      twitter: twitter_.value,
    },
  };
  const saveChages = () => {
    if (updateUserProfileInfo(props.user.uid, update)) {
      enqueueSnackbar("Profile Updated", { variant: "success" });
      setEdit(!edit);
    } else {
      enqueueSnackbar("Profile Not Updated", { variant: "error" });
    }
  };
  const Edit = () => {
    setEdit(!edit);
  };
  const petsToggler = () => {
    setPets_(!pets_);
  };
  const smokingToggler = () => {
    setSmoking_(!smoking_);
  };

  const deleteAccountToggler = () => {
    setDeleteField(!deleteField);
  };
  function handleDeleteUser() {
    deleteUser(password.value);
  }

  return (
    <Wrapper>
      <H1>Profile</H1>
      {props.user.emailVerified ? (
        <></>
      ) : (
        <ButtonWrapper>
          <Alert severity="warning" variant="standard" action={<SecondaryButton title="Resend Verification Email" onClick={sendEmailVerification} />} style={{ display: "flex", flexWrap: "wrap" }}>
            Email Not Verified!, please check your inbox for Verification
          </Alert>
        </ButtonWrapper>
      )}
      <ContentWrapper>
        <SidebarWrapper>
          {avatar_url ? (
            <Avatar src={avatar_url} alt="Profile Picture" style={{ width: 200, height: 200 }} component={Paper} elevation={5} />
          ) : (
            <Avatar alt="Profile Picture" style={{ width: 200, height: 200 }} component={Paper} elevation={7}>
              {firstname[0].toUpperCase()}
              {lastname[0].toUpperCase()}
            </Avatar>
          )}
          <UploadButton user_id={props.user.uid} />
          <TextWrapper>
            <h2>
              {firstname_.value} {lastname_.value}
            </h2>
            <p>{email}</p>
          </TextWrapper>
          <div className="buttons">
            <a href="#Primary">
              <SecondaryButton title="Primary Details" width="200px" />
            </a>
            <a href="#Secondary">
              <SecondaryButton title="Secondary Details" width="200px" />
            </a>
            <a href="#Socials">
              <SecondaryButton title="Socials" width="200px" />
            </a>
          </div>
        </SidebarWrapper>
        <SectionWrapper>
          <P>Primary Details</P>
          <Row id="Primary">
            <ProfileTextField label="Firstname" input={firstname_} disabled={edit} />
            <ProfileTextField label="Lastname" input={lastname_} disabled={edit} />
            <ProfileTextField label="Age" input={age_} disabled={edit} />
            <SelectButton label="Gender" input={gender_} disabled={edit} array={genders} />
            <ProfileTextField label="Occupation" input={occupation_} disabled={edit} />
            <ProfileTextField label="Residence" input={residence_} disabled={edit} />
            <SelectButton label="Country" input={country_} disabled={edit} array={countries} />
          </Row>
          <Divider />
          <P>Secondary Details</P>
          <Row id="Seconday">
            <ProfileTextField label="Phone Number" input={phone_number_} disabled={edit} type="tel" />
            <ProfileTextField label="Preferd Area" input={prefered_area_} disabled={edit} />
            <SelectButton label="Budget Low (HUF)" input={budget_low_} disabled={edit} array={prices} />
            <SelectButton label="Budget High (HUF)" input={budget_high_} disabled={edit} array={prices} />
            <SelectButton label="Zodiac Sign" input={astrological_sign_} disabled={edit} array={zodiacs} />
            <SelectButton label="Religion" input={religion_} disabled={edit} array={religions} />
            <ToggleWrapper>
              <P>Pets: </P>
              <Switch disabled={edit} checked={pets_} onChange={petsToggler} />
              <P>Smoking: </P>
              <Switch disabled={edit} checked={smoking_} onChange={smokingToggler} />
            </ToggleWrapper>
          </Row>
          <ProfileTextField label="About me" input={about_} disabled={edit} multiline={true} fullwidth={true} />
          <Divider />
          <P>Socials</P>
          <Row id="Socials">
            <ProfileTextField label="Facebook Url" input={facebook_} disabled={edit} />
            <ProfileTextField label="Instagram Url" input={instagram_} disabled={edit} />
            <ProfileTextField label="Twitter Url" input={twitter_} disabled={edit} />
          </Row>
          <ButtonWrapper>
            <PrimartButton width="100px" onClick={saveChages} title="Save" disabled={edit} />
            <PrimartButton width="100px" onClick={Edit} title={edit ? "Edit" : "Cancel"} />
          </ButtonWrapper>
          <Divider />
          <PrimartButton color="red" width="150px" onClick={deleteAccountToggler} title="Delete Account" />
          {deleteField ? (
            <SectionWrapper>
              <WarningText>This action will permanently delete user account, and cannot be undone! Confirm your password to continue.</WarningText>
              <ProfileTextField width="200px" label="Re-enter Password" input={password} type="password" />
              <ButtonWrapper>
                <PrimartButton width="100px" color="red" onClick={handleDeleteUser} title="Proceed" />
                <SecondaryButton width="100px" onClick={deleteAccountToggler} title="Cancel" />
              </ButtonWrapper>
            </SectionWrapper>
          ) : (
            <></>
          )}
        </SectionWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const H1 = styled.h1``;
const P = styled.p``;
const WarningText = styled.p`
  color: red;
  font-weight: bold;
`;

const Wrapper = styled.div`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  padding: 20px;
  @media (max-width: 850px) {
    grid-template-columns: auto;
    padding: 10px;
  }
`;

const SidebarWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 15px;
  & .buttons {
    display: flex;
    gap: 5px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media (max-width: 850px) {
    align-items: center;
    & .buttons {
      display: flex;
      gap: 5px;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 500px) {
    & .buttons {
      display: none;
    }
  }
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 0.5;
  align-items: center;
  justify-content: center;
`;
const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 850px) {
    align-items: center;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 33% 33% 33%;
  gap: 10px;
  margin: 10px;
  @media (max-width: 850px) {
    grid-template-columns: 50% 50%;
  }

  @media (max-width: 550px) {
    grid-template-columns: auto;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 10px;
`;

const ToggleWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  justify-content: center;
  align-items: center;
`;
