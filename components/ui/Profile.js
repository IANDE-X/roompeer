import React, { useState } from "react";
import styled from "styled-components";
import { Avatar, Switch, Divider } from "@material-ui/core";
import useInput from "../../hooks/useInput";
import PrimartButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import ProfileTextField from "./ProfileTexField";
import { updateUserProfileInfo } from "../../model/firebase-config";
import { useSnackbar } from "notistack";
import { Alert } from "@material-ui/lab";
import UploadButton from "../buttons/UploadButton";
import { countries, genders, prices, zodiacs } from "../../model/data";
import SelectButton from "../buttons/SelectButton";

export default function Profile(props) {
  const { firstname, lastname, age, gender, occupation, residence, astrological_sign, country, rent_high, rent_low, avatar_url, email, pets, phone_number, prefered_area, prefered_contract_length, socials, smoking } = props.data;
  const { enqueueSnackbar } = useSnackbar();

  const [edit, setEdit] = useState(true);
  const firstname_ = useInput(firstname);
  const lastname_ = useInput(lastname);
  const age_ = useInput(age);
  const gender_ = useInput(gender);
  const occupation_ = useInput(occupation);
  const residence_ = useInput(residence);
  const astrological_sign_ = useInput(astrological_sign);
  const country_ = useInput(country);
  const rent_high_ = useInput(rent_high);
  const rent_low_ = useInput(rent_low);
  const phone_number_ = useInput(phone_number);
  const prefered_area_ = useInput(prefered_area);
  const prefered_contract_lenght_ = useInput(prefered_contract_length);
  const [pets_, setPets_] = useState(pets);
  const [smoking_, setSmoking_] = useState(smoking);
  const facebook_ = useInput(socials.facebook);
  const instagram_ = useInput(socials.instagram);
  const twitter_ = useInput(socials.twitter);

  const update = {
    gender: gender_.value,
    firstname: firstname_.value,
    lastname: lastname_.value,
    age: age_.value,
    occupation: occupation_.value,
    residence: residence_.value,
    country: country_.value,
    prefered_area: prefered_area_.value,
    prefered_contract_lenght: prefered_contract_lenght_.value,
    rent_low: rent_low_.value,
    rent_high: rent_high_.value,
    smoking: smoking_,
    pets: pets_,
    astrological_sign: astrological_sign_.value,
    socials: {
      facebook: facebook_.value,
      instagram: instagram_.value,
      twitter: twitter_.value,
    },
  };
  const saveChages = () => {
    updateUserProfileInfo(props.user.uid, update);
    enqueueSnackbar("Profile Updated", { variant: "success" });
    setEdit(!edit);
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

  return (
    <Wrapper>
      <H1>Profile</H1>
      {props.user.emailVerified ? (
        <></>
      ) : (
        <ButtonWrapper>
          <Alert severity="warning" variant="filled">
            Email Not Verified!, please check your inbox for Verification
          </Alert>
          <SecondaryButton title="Resend Verification Email" />
        </ButtonWrapper>
      )}
      <ContentWrapper>
        <SidebarWrapper>
          {avatar_url ? (
            <Avatar src={avatar_url} alt="Profile Picture" style={{ width: 200, height: 200 }} />
          ) : (
            <Avatar alt="Profile Picture" style={{ width: 200, height: 200 }}>
              {firstname[0].toUpperCase()}
              {lastname[0].toUpperCase()}
            </Avatar>
          )}
          <UploadButton user_id={props.user.uid} />
          <P>{email}</P>
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
            <ProfileTextField label="Phone Number" input={phone_number_} disabled={edit} />
            <ProfileTextField label="Preferd Area" input={prefered_area_} disabled={edit} />
            <SelectButton label="Contract" input={prefered_contract_lenght_} disabled={edit} array={["6-Month", "12-Month"]} />
            <SelectButton label="Budget Low (HUF)" input={rent_low_} disabled={edit} array={prices} />
            <SelectButton label="Budget High (HUF)" input={rent_high_} disabled={edit} array={prices} />
            <SelectButton label="Zodiac Sign" input={astrological_sign_} disabled={edit} array={zodiacs} />
            <ToggleWrapper>
              <P>Pets: </P>
              <Switch disabled={edit} checked={pets_} onChange={petsToggler} />
              <P>Smoking: </P>
              <Switch disabled={edit} checked={smoking_} onChange={smokingToggler} />
            </ToggleWrapper>
          </Row>
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
        </SectionWrapper>
      </ContentWrapper>
    </Wrapper>
  );
}

const H1 = styled.h1``;
const P = styled.p``;

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
  flex-direction: column;
  gap: 10px;
  align-items: center;

  & .buttons {
    display: flex;
    gap: 10px;
    flex-direction: column;
  }
  @media (max-width: 850px) {
    align-items: center;
    & .buttons {
      display: flex;
      gap: 10px;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  @media (max-width: 450px) {
    & .buttons {
      display: none;
    }
  }
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
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
  @media (max-width: 850px) {
    align-items: center;
    justify-content: center;
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
