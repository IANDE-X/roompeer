import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter } from "next/router";
import Link from "next/dist/client/link";
import useMenu from "../../hooks/useMenu";

export default function LocaleButton() {
  const { locales, asPath, locale } = useRouter();
  const menu = useMenu();

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={menu.handleMenuOpen}
        color="default"
      >
        {locale}
      </Button>
      <Menu id="simple-menu" keepMounted {...menu.menuOption}>
        {locales.map((loc, idx) => (
          <Link href={asPath} locale={loc} key={idx}>
            <MenuItem onClick={menu.handleMenuClose}>{loc}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
