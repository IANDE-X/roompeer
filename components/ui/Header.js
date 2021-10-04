import styled from "styled-components";
import Link from "next/dist/client/link";
import { Avatar, IconButton, Menu, MenuItem } from "@material-ui/core";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/image";
import useMenu from "../../hooks/useMenu";
import { useAuth } from "../../context/Auth";
import MenuButton from "../buttons/MenuButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { theme } from "../../model/data";
import SwipeableTemporaryDrawer from "./SwipeableDrawer";
import useTranslation from "next-translate/useTranslation";

export default function Header() {
  const menu = useMenu();
  const { signOutUser, user, userData } = useAuth();
  let { t } = useTranslation();

  const SignOut = () => {
    menu.handleMenuClose();
    signOutUser();
  };

  return (
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Image src="/branding/logo.JPG" width={75} height={75} />
          <H1>Roompeer</H1>
        </LogoWrapper>
      </Link>
      <ContentWrapper>
        <MenuButton title={t("common:rooms")} href="/flats/search?city=&for=&type=&rooms=&price_low=&price_high=&page=1" />
        <MenuButton title={t("common:peers")} href="/peers/search?country=&age=&gender=&religion=&budget_high=&page=1" />
        <MenuButton title={t("common:info")} href="/info" />
        <MenuButton title={t("common:aboutus")} href="/about" />
        {user && userData ? (
          <IconButton onClick={menu.handleMenuOpen} color="inherit">
            <Avatar src={userData.avatar_url} />
          </IconButton>
        ) : (
          <ButtonWrapper>
            <Link href="/signup">
              <SecondaryButton title={t("common:createaccount")} />
            </Link>
            <Link href="/login">
              <PrimaryButton title={t("common:signin")} />
            </Link>
          </ButtonWrapper>
        )}
        <Menu keepMounted {...menu.menuOption}>
          <Link href="/account">
            <MenuItem onClick={menu.handleMenuClose}>{t("common:profile")}</MenuItem>
          </Link>
          <MenuItem onClick={SignOut}>{t("common:signout")}</MenuItem>
        </Menu>
        <LocaleButton />
      </ContentWrapper>
      <Hamburger>
        <LocaleButton />
        <SwipeableTemporaryDrawer authData={{ user, userData, SignOut }} />
      </Hamburger>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0px 15px 0px 0px;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 10px;
`;

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  @media (max-width: 800px) {
    display: none;
  }
`;

const Hamburger = styled.div`
  display: none;
  @media (max-width: 800px) {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition: 0.2s ease-in;
    :hover {
      color: ${theme.light.primaryColor};
    }
  }
`;

const H1 = styled.h1`
  font-size: 25px;

  @media (max-width: 800px) {
    font-size: 20px;
  }

  @media (max-width: 340px) {
    display: none;
  }
`;
