import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useRouter, router } from "next/router";
import Link from "next/dist/client/link";

export default function LocaleButton() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { locales, asPath, locale } = useRouter();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        color="default"
      >
        {locale}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {locales.map((loc, idx) => (
          <Link href={asPath} locale={loc} key={idx}>
            <MenuItem onClick={handleClose}>{loc}</MenuItem>
          </Link>
        ))}
      </Menu>
    </div>
  );
}
