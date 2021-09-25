import { createTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import { theme } from "../../model/data";

const Theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: theme.light.primaryColor,
    },
    secondary: {
      main: theme.light.secondaryColor,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: theme.light.background,
    },
  },
});

export default Theme;
