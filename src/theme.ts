import { createTheme } from "@mui/material";
import MontserratRegular from "./assets/fonts/Montserrat-VariableFont_wght.ttf";

export default createTheme({
  palette: {
    primary: {
      main: "rgba(255,145,83,1)",
      contrastText: "#fff",
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Montserrat';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Montserrat'), local('Montserrat-Regular'), url(${MontserratRegular}) format('ttf');
            unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
          }
        `,
    },
  },
  typography: {
    fontFamily: "Montserrat, Arial",
  },
});

export const GRADIENT =
  "radial-gradient( circle farthest-corner at 10% 20%,  rgba(255,209,67,1) 0%, rgba(255,145,83,1) 90% )";
