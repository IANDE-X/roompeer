import { useState } from "react";

const useMenu = (
  position = {
    vertical: "top",
    horizontal: "bottom",
  }
) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return {
    handleMenuOpen: handleMenu,
    handleMenuClose: handleClose,
    menuOption: {
      anchorEl: anchorEl,
      open: open,
      onClose: handleClose,
      transformOrigin: position,
    },
  };
};

export default useMenu;
