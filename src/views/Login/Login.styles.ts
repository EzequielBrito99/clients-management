import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: theme.palette.background.default,
    backgroundImage: `radial-gradient(circle at 2px 2px, ${theme.palette.grey[200]} 1px, transparent 0)`,
    backgroundSize: '40px 40px',
  },
  loginPaper: {
    padding: theme.spacing(4),
    borderRadius: theme.shape.borderRadius * 2,
    width: '100%',
    maxWidth: 400,
  },
  title: {
    fontWeight: 700,
    marginBottom: theme.spacing(3),
    color: theme.palette.primary.main,
    letterSpacing: '1px',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submitButton: {
    margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
    fontWeight: 600,
    borderRadius: theme.shape.borderRadius,
  },
  registerLink: {
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  footerText: {
    marginTop: theme.spacing(2),
  }
}));