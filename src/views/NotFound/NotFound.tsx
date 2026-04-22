import React from 'react';
import { Typography, Button, Container, Box } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Home as HomeIcon, WarningRounded } from '@material-ui/icons';
import { useStyles } from './NotFound.styles';

const NotFound: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container className={classes.root}>
      <Box className={classes.errorWrapper}>
        <WarningRounded className={classes.errorIcon} />
        <Typography className={classes.errorCode}>
          404
        </Typography>
      </Box>

      <Typography variant="h4" gutterBottom style={{ fontWeight: 700 }}>
        ¡Oops! Página no encontrada
      </Typography>

      <Typography variant="body1" color="textSecondary">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Typography>

      <Button
        variant="contained"
        color="primary"
        size="large"
        className={classes.button}
        startIcon={<HomeIcon />}
        onClick={() => history.push('/home')}
      >
        VOLVER AL INICIO
      </Button>
    </Container>
  );
};

export default NotFound;