import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: "#D5A419",
      light: "#E3B94D",
      dark: "#B88E14",
      contrastText: "#fff",
    },
    secondary: {
      main: "#5C4033",
      light: "#7C604D",
      dark: "#3C2A21",
      contrastText: "#fff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "#ffffff",
        },
      },
    },
  },
});

export default theme;
