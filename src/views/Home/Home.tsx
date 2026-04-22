import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';
import { useStyles } from './Home.styles';

const Home: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md" className={classes.mainContainer}>
      <Box className={classes.welcomeBox}>
        <Typography 
          variant="h2" 
          gutterBottom 
          className={classes.title}
        >
          Bienvenido
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;