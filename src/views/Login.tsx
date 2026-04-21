import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Button, Typography, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import ENDPOINTS from '../services/endpoints';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();

  useEffect(() => {
    const savedUser = localStorage.getItem('rememberedUsername');
    if (savedUser) {
      setFormData(prev => ({ ...prev, username: savedUser, rememberMe: true }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      setError('Datos requeridos');
      return;
    }

    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.auth.login, {
        username: formData.username,
        password: formData.password
      });

      if (formData.rememberMe) {
        localStorage.setItem('rememberedUsername', formData.username);
      } else {
        localStorage.removeItem('rememberedUsername');
      }

      login(response.data);
      
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} style={{ padding: '2rem', marginTop: '10vh', borderRadius: '8px' }}>
        <Typography variant="h5" align="center" color="primary" gutterBottom style={{ fontWeight: 600 }}>
          INICIAR SESIÓN
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            name="username"
            label="Usuario *"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name="password"
            label="Contraseña *"
            type="password"
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox 
                name="rememberMe"
                checked={formData.rememberMe} 
                onChange={handleChange} 
                color="primary"
              />
            }
            label="Recuérdame"
          />
          {error && <Typography color="error" variant="body2" style={{ marginTop: '10px' }}>{error}</Typography>}
          <Box mt={3}>
            <Button 
              fullWidth 
              variant="contained" 
              color="primary" 
              type="submit" 
              size="large"
              disabled={loading}
            >
              {loading ? 'Validando...' : 'INICIAR SESIÓN'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;