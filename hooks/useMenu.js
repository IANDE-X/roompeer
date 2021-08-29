import { useState } from "react";

const useMenu = () => {
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
    },
  };
};

export default useMenu;
