import { makeStyles } from '@material-ui/core';

const drawerWidth = 280;

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.palette.background.default
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: 'none',
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: theme.palette.background.paper
  },
  menuButton: { marginRight: 16 },
  title: { flexGrow: 1, fontWeight: 600, letterSpacing: '0.5px' },
  username: { marginRight: 16 },
  drawerPaper: {
    width: drawerWidth,
    border: 'none',
    boxShadow: '4px 0px 10px rgba(0,0,0,0.05)'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    marginTop: '64px',
  },
  avatarSection: {
    padding: theme.spacing(4, 2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.dark} 90%)`,
    color: 'white'
  },
  largeAvatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
    border: '3px solid rgba(255,255,255,0.3)',
  },
  avatarIcon: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  caption: { opacity: 0.8 },
  listItem: {
    margin: theme.spacing(1, 1),
    borderRadius: '8px',
    width: 'auto'
  },
  activeItem: {
    backgroundColor: `${theme.palette.primary.main}15 !important`,
    color: theme.palette.primary.main,
    '& .MuiListItemIcon-root': { color: theme.palette.primary.main },
    '& .MuiTypography-root': { fontWeight: 600 }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
}));