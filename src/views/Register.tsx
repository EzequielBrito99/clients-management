import React, { useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';
import {
  Container, Paper, TextField, Button, Typography,
  Box, InputAdornment, IconButton, Link as MuiLink
} from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import api from '../services/api';
import { useNotification } from '../context/NotificationContext';
import ENDPOINTS from '../services/endpoints';
import { EMAIL_REGEX, PWD_REGEX } from '../helpers/utils';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { notify } = useNotification();
  const history = useHistory();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    let tempErrors = { username: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;

    if (!formData.username.trim()) {
      tempErrors.username = 'El nombre de usuario es requerido';
      isValid = false;
    }

    if (!formData.email) {
      tempErrors.email = 'El correo electrónico es requerido';
      isValid = false;
    } else if (!EMAIL_REGEX.test(formData.email)) {
      tempErrors.email = 'Formato de correo electrónico inválido';
      isValid = false;
    }

    if (!formData.password) {
      tempErrors.password = 'La contraseña es requerida';
      isValid = false;
    } else if (!PWD_REGEX.test(formData.password)) {
      tempErrors.password = 'Debe tener al menos 8 caracteres, 1 mayúscula y 1 minúscula';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = 'Las contraseñas no coinciden';
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      notify('Por favor, complete correctamente los campos requeridos', 'warning');
      return;
    }

    setLoading(true);
    try {
      await api.post(ENDPOINTS.auth.register, {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });

      notify('Usuario registrado exitosamente. Ya puede iniciar sesión.', 'success');
      history.push('/login');

    } catch (err: any) {
      const backendMessage =
        err.response?.data?.message.includes('PasswordTooShort')
          ? 'La contraseña es demasiado corta'
          : err.response?.data?.message || 'Error al registrar el usuario';
      notify(backendMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="xs" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2.5rem', borderRadius: '12px', width: '100%' }}>
        <Typography variant="h5" align="center" color="primary" gutterBottom style={{ fontWeight: 700, letterSpacing: '1px' }}>
          REGISTRO
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          <TextField
            fullWidth
            name="username"
            label="Nombre de Usuario *"
            variant="outlined"
            margin="normal"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            disabled={loading}
          />

          <TextField
            fullWidth
            name="email"
            label="Correo Electrónico *"
            type="email"
            variant="outlined"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña *"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            margin="normal"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword}
            disabled={loading}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Box mt={4}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={loading}
              style={{ fontWeight: 600, padding: '10px' }}
            >
              {loading ? 'PROCESANDO...' : 'REGISTRARME'}
            </Button>
          </Box>

          <Box mt={3} textAlign="center">
            <Typography variant="body2">
              ¿Ya tiene una cuenta?{' '}
              <MuiLink component={RouterLink} to="/login" color="primary" style={{ fontWeight: 600 }}>
                Inicie sesión aquí
              </MuiLink>
            </Typography>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;