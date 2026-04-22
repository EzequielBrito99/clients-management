import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    margin: '10px'
  },
  dialogTitle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(1.5),
  },
  warningIcon: {
    color: theme.palette.warning.main,
    width: '4rem',
    height: '4rem',
  },
  actions: {
    padding: theme.spacing(2),
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.error.dark,
    },
  },
}));