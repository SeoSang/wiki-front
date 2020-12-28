import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1f3c88',
      light: '#4791db',
      dark: '#115293',
    },
    secondary: {
      main: '#ee6f57',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f6f5f5',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: `"NanumBarunGothic","Noto sans KR", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

export default responsiveFontSizes(theme);
