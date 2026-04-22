import React from 'react';
import { List, ListItem, ListItemIcon, ListItemText, Avatar, Typography, Box } from '@material-ui/core';
import { Home as HomeIcon, People as PeopleIcon, Person } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useStyles } from './MainLayout.styles';


const SidebarContent: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/home' },
    { text: 'Consulta Clientes', icon: <PeopleIcon />, path: '/clientes' },
  ];

  const handleNavigation = (path: string) => {
    history.push(path);
    onClose();
  };

  return (
    <>
      <Box className={classes.avatarSection}>
        <Avatar className={classes.largeAvatar}>
          <Person className={classes.avatarIcon} />
        </Avatar>
        <Typography variant="h6">{user?.username}</Typography>
        <Typography variant="caption" className={classes.caption}>Panel de Administración</Typography>
      </Box>
      <Box p={2}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => handleNavigation(item.path)}
              className={`${classes.listItem} ${location.pathname === item.path ? classes.activeItem : ''}`}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default SidebarContent;