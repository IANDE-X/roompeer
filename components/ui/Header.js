import styled from "styled-components";
import Link from "next/dist/client/link";
import { Avatar, Divider, IconButton, Menu, MenuItem } from "@material-ui/core";
import { MenuRounded } from "@material-ui/icons";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/dist/client/image";
import useMenu from "../../hooks/useMenu";
import { useAuth } from "../../context/Auth";
import MenuButton from "../buttons/MenuButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";
import { theme } from "../../model/data";

export default function Header() {
  const menu = useMenu();
  const handburgerMenu = useMenu();
  const { signOut, user, userData } = useAuth();

  const SignOut = () => {
    menu.handleMenuClose();
    signOut();
  };

  return (
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Image src="/logo.jpg" width={100} height={100} />
          <H1>Roompeer</H1>
        </LogoWrapper>
      </Link>
      <ContentWrapper>
        <MenuButton title="Peers" href="/peers/search?country=&age=&gender=&religion=&budget_high=" />
        <MenuButton title="Flats" href="/flats/search?city=&for=&type=&rooms=&price_low=&price_high=" />
        <MenuButton title="Info" href="/info" />
        {user && userData ? (
          <IconButton onClick={menu.handleMenuOpen} color="inherit">
            <Avatar src={userData.avatar_url} />
          </IconButton>
        ) : (
          <ButtonWrapper>
            <Link href="/signup">
              <SecondaryButton title="Create Account" />
            </Link>
            <Link href="/login">
              <PrimaryButton title="Sign In" />
            </Link>
          </ButtonWrapper>
        )}
        <Menu keepMounted {...menu.menuOption}>
          <Link href="/account">
            <MenuItem onClick={menu.handleMenuClose}>Profile</MenuItem>
          </Link>
          <MenuItem onClick={SignOut}>Sign Out</MenuItem>
        </Menu>
        <LocaleButton />
      </ContentWrapper>

      <Hamburger>
        <MenuRounded onClick={handburgerMenu.handleMenuOpen} style={{ width: 40, height: 40 }} />
        <LocaleButton />
      </Hamburger>
      <Menu keepMounted {...handburgerMenu.menuOption}>
        <Link href="/peers/search?country=&age=&gender=&religion=&budget_high=">
          <MenuItem>Peers</MenuItem>
        </Link>
        <Link href="/flats/search?city=&for=&type=&rooms=&price_low=&price_high=">
          <MenuItem>Flats</MenuItem>
        </Link>
        <Link href="/info">
          <MenuItem>Info</MenuItem>
        </Link>

        <Divider />
        {user && userData ? (
          <MenuButtonWrapper>
            <Link href="/account">
              <MenuItem onClick={handburgerMenu.handleMenuClose}>Profile</MenuItem>
            </Link>
            <MenuItem onClick={SignOut}>Sign Out</MenuItem>
          </MenuButtonWrapper>
        ) : (
          <MenuButtonWrapper>
            <Link href="/signup">
              <SecondaryButton title="Create Account" />
            </Link>
            <Link href="/login">
              <PrimaryButton title="Sign In" />
            </Link>
          </MenuButtonWrapper>
        )}
      </Menu>
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

const MenuButtonWrapper = styled.div`
  display: flex;
  padding: 10px;
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
