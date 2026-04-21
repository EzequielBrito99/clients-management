import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { IconButton, InputAdornment, Link as MuiLink } from '@material-ui/core';
import { Container, Paper, TextField, Button, Typography, FormControlLabel, Checkbox, Box } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import ENDPOINTS from '../services/endpoints';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({ username: '', password: '', rememberMe: false });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const { notify } = useNotification();
  const history = useHistory();

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
      notify('El usuario y la contraseña son requeridos', 'warning');
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

      notify('¡Inicio de sesión exitoso!', 'success');

      login(response.data);
      history.push('/home');

    } catch (err: any) {
      notify('Hubo un inconveniente con la transacción. Verifique sus credenciales.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem', borderRadius: '8px' }}>
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
            disabled={loading}
          />
          <TextField
            fullWidth
            name="password"
            label="Contraseña *"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(prev => !prev)}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                color="primary"
                disabled={loading}
              />
            }
            label="Recuérdame"
          />

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

            <Box mt={2} textAlign="center">
              <Typography variant="body2">
                ¿No tiene una cuenta?{' '}
                <MuiLink component={RouterLink} to="/register" color="primary" style={{ fontWeight: 600 }}>
                  Regístrese aquí
                </MuiLink>
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;