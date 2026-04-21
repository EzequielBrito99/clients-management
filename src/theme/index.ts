import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e',
      light: '#534bae',
      dark: '#000051',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#455a64',
      light: '#718792',
      dark: '#1c313a',
      contrastText: '#ffffff',
    },
    background: {
      default: '#f5f5f5',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
    },
  },
});

export default theme;