import { createTheme } from "@material-ui/core/styles";

// Create a theme instance.
export const theme = createTheme({
  palette: {
    primary: {
      main: "#f46d25",
    },
    secondary: {
      main: "#121212",
    },
    action: {
      disabledBackground: "#f46d2575",
      disabled: "#f46d2575",
    },
  },
  spacing: 8,
  overrides: {
    MuiOutlinedInput: {
      root: {
        "&$disabled $notchedOutline": {
          borderColor: "#D3D3D3",
          color:"#000 !important",
        },
        "& $notchedOutline": {
          borderColor: "#f46d25",
        },
        "&$focused $notchedOutline": {
          borderColor: "#f46d25",
        },
      },
      notchedOutline: {},
    },
    MuiTextField: {
      root: {
        background: "#fff",
      },
    },
    
    MuiCheckbox: {
      colorSecondary: {
        color: "#fff",
        "&$checked": {
          color: "#f46d25",
        },
      },
    },
    MuiTableCell:{
      root:{
        padding:"10px"
      }
    },
    MuiButton: {
      root: {
        textTransform: "none",
      },
      fullWidth: {
        maxWidth: "100%",
      },
      label: {
        color: "#fff",
        fontSize: "14px",
        fontFamily: "Sans-serif",
      },
      containedSecondary: {
        backgroundColor:"#121212"
      },
    },
  },
  props: {
    MuiButton: {
      disableRipple: true,
      variant: "contained",
      color: "primary",
    },
    MuiCheckbox: {
      disableRipple: true,
    },
    MuiTextField: {
      InputLabelProps: {
        shrink: true,
      },
      
    },
  },
});
