import React from 'react';
import { Container, Typography, Box } from '@material-ui/core';

const Home: React.FC = () => {

  return (
    <Container 
      maxWidth="md" 
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '80vh'
      }}
    >
      <Box textAlign="center">
        <Typography 
          variant="h2" 
          color="primary" 
          gutterBottom 
          style={{ fontWeight: 700, letterSpacing: '-1px' }}
        >
          Bienvenido
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;