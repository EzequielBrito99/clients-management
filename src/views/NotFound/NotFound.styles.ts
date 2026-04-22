import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80vh',
    textAlign: 'center',
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  errorWrapper: {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    alignContent: 'center'
  },
  errorIcon: {
    width: "9rem",
    height: "9rem",
    color: theme.palette.primary.main,
  },
  errorCode: {
    fontSize: '7rem',
    fontWeight: 800,
    color: theme.palette.primary.main,
    lineHeight: 1,
    [theme.breakpoints.down('xs')]: {
      fontSize: '5rem',
    },
  },
  illustration: {
    width: '100%',
    maxWidth: '400px',
    marginBottom: theme.spacing(4),
  },
  button: {
    marginTop: theme.spacing(4),
    padding: theme.spacing(1.5, 4),
    borderRadius: '30px',
    fontWeight: 600,
  }
}));