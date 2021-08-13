import React from "react";
import styled from "styled-components";
import Link from "next/dist/client/link";
import { Button, IconButton, Menu, MenuItem } from "@material-ui/core";
import LocaleButton from "../buttons/LocaleButton";
import Image from "next/dist/client/image";
import { AccountCircle } from "@material-ui/icons";
import { signOut } from "../../model/firebase-config";
import useMenu from "../../hooks/useMenu";

export default function Header() {
  const menu = useMenu();
  return (
    <Wrapper>
      <Link href="/">
        <LogoWrapper>
          <Image src="/logo.jpg" width={100} height={100} />
          <h1>Roompeer</h1>
        </LogoWrapper>
      </Link>
      <ContentWrapper>
        <Button>Peers</Button>
        <Button>Flats</Button>
        <Button>Info</Button>
        <IconButton
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={menu.handleMenuOpen}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <Menu keepMounted {...menu.menuOption}>
          <MenuItem onClick={menu.handleMenuClose}>My Profile</MenuItem>
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
`;
