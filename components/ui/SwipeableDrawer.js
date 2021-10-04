import React, { useState } from "react";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import { Avatar, Divider, IconButton, MenuItem } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import styled from "styled-components";
import Link from "next/dist/client/link";
import SecondaryButton from "../buttons/SecondaryButton";
import PrimaryButton from "../buttons/PrimaryButton";
import useTranslation from "next-translate/useTranslation";

export default function SwipeableTemporaryDrawer(props) {
  const [state, setState] = useState(false);
  const { user, userData, SignOut } = props.authData;
  let { t } = useTranslation();

  const toggleDrawer = () => (event) => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setState(true);
  };

  const hideDrawer = () => {
    setState(false);
  };

  return (
    <Wrapper>
      <IconButton onClick={toggleDrawer()} color="primary">
        <MenuRounded style={{ width: 40, height: 40 }} />
      </IconButton>
      <SwipeableDrawer anchor="right" open={state} onClose={hideDrawer} onOpen={toggleDrawer}>
        <ContentWrapper onClick={hideDrawer}>
          {user && userData ? (
            <div>
              <MenuButtonWrapper>
                <Link href="/account">
                  <IconButton color="inherit">
                    <Avatar src={userData.avatar_url} style={{ width: 50, height: 50 }} />
                  </IconButton>
                </Link>
                <Name>
                  {userData.firstname} {userData.lastname}
                  <Sub>{userData.email}</Sub>
                </Name>
              </MenuButtonWrapper>

              <Link href="/account">
                <MenuItem>{t("common:profile")}</MenuItem>
              </Link>
              <MenuItem onClick={SignOut}>{t("common:signout")}</MenuItem>
            </div>
          ) : (
            <MenuButtonWrapper>
              <h3>{t("common:loggedout")}</h3>
              <Link href="/login">
                <PrimaryButton title={t("common:signin")} />
              </Link>
              <Link href="/signup">
                <SecondaryButton title={t("common:createaccount")} width="100%" />
              </Link>
            </MenuButtonWrapper>
          )}
          <Divider />
          <Link href="/flats/search?city=&for=&type=&rooms=&price_low=&price_high=&page=1">
            <MenuItem>{t("common:rooms")}</MenuItem>
          </Link>
          <Link href="/peers/search?country=&age=&gender=&religion=&budget_high=&page=1">
            <MenuItem>{t("common:peers")}</MenuItem>
          </Link>
          <Link href="/info">
            <MenuItem>{t("common:info")}</MenuItem>
          </Link>
          <Link href="/about">
            <MenuItem>{t("common:aboutus")}</MenuItem>
          </Link>
        </ContentWrapper>
      </SwipeableDrawer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ContentWrapper = styled.div`
  padding: 5px;
`;

const MenuButtonWrapper = styled.div`
  display: grid;
  min-width: 250px;
  justify-items: center;
  align-items: center;
  gap: 10px;
`;

const Name = styled.p`
  font-size: 20px;
`;

const Sub = styled.p`
  font-size: 10px;
  color: gray;
`;
