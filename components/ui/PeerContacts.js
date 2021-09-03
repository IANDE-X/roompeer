import React, { useState } from "react";
import styled from "styled-components";
import SocialButton from "../buttons/SocialButton";
import { Instagram, Twitter, Facebook, MailOutlineRounded, PhoneRounded, WhatsApp } from "@material-ui/icons";
import PrimaryButton from "../buttons/PrimaryButton";
import { useAuth } from "../../context/Auth";
import { useSnackbar } from "notistack";
import MenuButton from "../buttons/MenuButton";

export default function PeerContacts(props) {
  const { facebook, instagram, twitter } = props.data;
  const [showContacts, setShowContacts] = useState(false);
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const action = (key) => <MenuButton title="Log In" href="/login" color="white" />;

  const handleShowContacts = () => {
    user
      ? setShowContacts(!showContacts)
      : enqueueSnackbar("Please Log in to see contact details", {
          variant: "error",
          action,
        });
  };
  return (
    <Wrapper>
      {showContacts ? (
        <ContentWrapper>
          {facebook === "" ? <></> : <SocialButton href={facebook} title="Facebook" color="#1877f2" icon={<Facebook />} />}
          {instagram === "" ? <></> : <SocialButton href={instagram} title="Instagram" color="#c32aa3" icon={<Instagram />} />}
          {twitter === "" ? <></> : <SocialButton href={twitter} title="Twitter" color="#1da1f2" icon={<Twitter />} />}
          {twitter === "" ? <></> : <SocialButton href={`tel:${props.phone_number}`} title="WhatsApp" color=" #25d366" icon={<WhatsApp />} />}
          {props.email === "" ? <></> : <SocialButton href={`mailto:${props.email}`} title="Email" color="#a6b1b7" icon={<MailOutlineRounded />} />}
          {props.phone === "" ? <></> : <SocialButton href={`tel:${props.phone}`} title="Phone" color="red" icon={<PhoneRounded />} />}
        </ContentWrapper>
      ) : (
        <ContentWrapper>
          <PrimaryButton color="black" title="Show Contacts" onClick={handleShowContacts} width="200px" />
        </ContentWrapper>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;
