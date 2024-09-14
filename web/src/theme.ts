import { createTheme } from "@mui/material/styles";

export const BLACK_COLOR = "#4B382C";
export const WHITE_COLOR = "#FFFFFF";

const theme = createTheme({
  typography: {
    fontFamily: "EastmanGrotesque",
    h4: {
      fontFamily: "MoreSugar",
    },
  },

  palette: {
    text: {
      primary: WHITE_COLOR,
      secondary: "#000000",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            color: "#000000",
          },
          "& .MuiOutlinedInput-root": {
            backgroundColor: WHITE_COLOR,
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused fieldset": {
              borderColor: "transparent",
            },
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "grey",
          "&.Mui-focused": {
            color: BLACK_COLOR,
          },
        },
      },
    },
  },
});

export default theme;
