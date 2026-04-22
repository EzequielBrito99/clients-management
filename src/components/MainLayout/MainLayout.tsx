import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, Divider, Box } from '@material-ui/core';
import { Menu as MenuIcon, ExitToApp as LogoutIcon, ChevronLeft as ChevronLeftIcon } from '@material-ui/icons';
import { useAuth } from '../../context/AuthContext';
import { useStyles } from './MainLayout.styles';
import Sidebar from './Sidebar';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const classes = useStyles();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => setOpen(!open);

  return (
    <div className={classes.root}>
      {/* HEADER COMPONENT */}
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <IconButton color="primary" edge="start" onClick={toggleDrawer} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title} noWrap color="primary">INNOVASOFT</Typography>
          <Box display="flex" alignItems="center">
            <Typography variant="body2" color="textSecondary" className={classes.username}>{user?.username}</Typography>
            <IconButton color="default" onClick={logout}><LogoutIcon /></IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* SIDEBAR COMPONENT */}
      <Drawer variant="temporary" anchor="left" open={open} onClose={toggleDrawer} classes={{ paper: classes.drawerPaper }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleDrawer}><ChevronLeftIcon /></IconButton>
        </div>
        <Divider />
        <Sidebar onClose={toggleDrawer} />
      </Drawer>

      <main className={classes.content}>{children}</main>
    </div>
  );
};

export default MainLayout;