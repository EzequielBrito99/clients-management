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
  registerPaper: {
    padding: theme.spacing(5),
    borderRadius: theme.shape.borderRadius * 1.5,
    width: '100%',
    maxWidth: 450,
  },
  title: {
    fontWeight: 700,
    letterSpacing: '1px',
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  form: {
    width: '100%',
  },
  submitButton: {
    fontWeight: 600,
    padding: theme.spacing(1.5),
    marginTop: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
  },
  loginLink: {
    fontWeight: 600,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  footerText: {
    marginTop: theme.spacing(3),
  }
}));