import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  headerContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column-reverse',
      gap: 20
    },
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  pageTitle: {
    fontWeight: 700,
    color: theme.palette.primary.dark,
    [theme.breakpoints.down('sm')]: {
      fontSize: '20px',
    },
  },
  avatarContainer: {
    position: 'relative',
    cursor: 'pointer',
    '&:hover $avatarOverlay': {
      opacity: 1,
    },
  },
  largeAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    border: `2px solid ${theme.palette.primary.main}`,
  },
  avatarOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    opacity: 0,
    transition: 'opacity 0.3s',
  },
  formPaper: {
    borderRadius: 12,
    overflow: 'hidden'
  },
  gridContainer: {    
    padding: theme.spacing(4),
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: theme.spacing(3),
    [theme.breakpoints.down('sm')]: {
      gridTemplateColumns: '1fr',
    },
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  actions: {
    display: 'flex',
    gap: theme.spacing(2),
  },
  button: {
    borderRadius: 8,
    padding: '8px 24px',
    fontWeight: 600,
  }
}));