import styled from "styled-components";
import Link from "next/dist/client/link";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/dist/client/image";
import { AccountCircle } from "@material-ui/icons";
import useMenu from "../../hooks/useMenu";
import { useAuth } from "../../context/Auth";
import MenuButton from "../buttons/MenuButton";
import PrimaryButton from "../buttons/PrimaryButton";
import SecondaryButton from "../buttons/SecondaryButton";

export default function Header() {
  const menu = useMenu();
  const { signOut, user } = useAuth();

  const SignOut = () => {
    menu.handleMenuClose();
    signOut();
  };

  return (
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Image src="/logo.jpg" width={100} height={100} />
          <h1>Roompeer</h1>
        </LogoWrapper>
      </Link>
      <ContentWrapper>
        <MenuButton title="Peers" href="/peers/search?country=&age=&gender=&religion=&budget_low=&budget_high=" />
        <MenuButton title="Flats" href="/flats/search?city=for=type=rooms=price_low=price_high=" />
        <MenuButton title="Info" href="/info" />
        {user ? (
          <IconButton onClick={menu.handleMenuOpen} color="inherit">
            <AccountCircle />
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
            <MenuItem onClick={menu.handleMenuClose}>My Profile</MenuItem>
          </Link>
          <MenuItem onClick={SignOut}>Sign Out</MenuItem>
        </Menu>
        <LocaleButton />
      </ContentWrapper>
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
