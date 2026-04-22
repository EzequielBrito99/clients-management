import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '80vh',
  },
  welcomeBox: {
    textAlign: 'center',
    animation: '$fadeInUp 0.8s ease-out',
  },
  title: {
    fontWeight: 700,
    letterSpacing: '-1px',
    color: theme.palette.primary.main,
    textShadow: '0px 4px 10px rgba(0,0,0,0.05)',
  },
  '@keyframes fadeInUp': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));