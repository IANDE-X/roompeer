import React from "react";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/dist/client/image";
import { AccountCircle } from "@material-ui/icons";
import useMenu from "../../hooks/useMenu";
import { useAuth } from "../../context/Auth";
import MenuButton from "../buttons/MenuButton";

export default function Header() {
  const menu = useMenu();
  const { signOut, user } = useAuth();

  return (
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Image src="/logo.jpg" width={100} height={100} />
          <h1>Roompeer</h1>
        </LogoWrapper>
      </Link>
      <ContentWrapper>
        <MenuButton title="Peers" />
        <MenuButton title="Flats" />
        <MenuButton title="Info" />
        {user ? (
          <IconButton onClick={menu.handleMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
        ) : (
          <></>
        )}
        <Menu keepMounted {...menu.menuOption}>
          <Link href="/account">
            <MenuItem onClick={menu.handleMenuClose}>My Profile</MenuItem>
          </Link>

          <MenuItem onClick={signOut}>Sign Out</MenuItem>
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

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 800px) {
    display: none;
  }
`;
