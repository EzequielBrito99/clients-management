import { createTheme } from '@material-ui/core/styles';
import { blue, blueGrey } from '@material-ui/core/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: blue[700],
      main: blue[800],
      dark: blue[900],
      contrastText: '#ffffff',
    },
    secondary: {
      light: blueGrey[400],
      main: blueGrey[600],
      dark: blueGrey[800],
      contrastText: '#ffffff',
    },
    background: {
      default: '#f8f9fa',
      paper: '#ffffff',
    },
    error: {
      main: '#f44336',
    },
    text: {
      primary: '#263238',
      secondary: '#546e7a',
    }
  },
  typography: {
    fontFamily: [
      'Inter',
      '"Roboto"',
      '"Helvetica"',
      '"Arial"',
      'sans-serif',
    ].join(','),
    h4: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;