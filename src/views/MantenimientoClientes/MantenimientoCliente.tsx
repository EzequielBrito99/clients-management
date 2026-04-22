import React, { useState, useEffect, useRef } from 'react';
import {
  Paper, Typography, TextField, Button, Box, MenuItem, Avatar,
  LinearProgress
} from '@material-ui/core';
import { Save, PhotoCamera, Undo } from '@material-ui/icons';
import { useHistory, useParams } from 'react-router-dom';
import { useStyles } from './MantenimientoCliente.styles';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import ENDPOINTS from '../../services/endpoints';
import { CreateClientPayload, GetClientByIDResponse } from '../../types/client';
import { Interests } from '../../types/interests';

interface Interes {
  id: string | number;
  descripcion: string;
}

const MantenimientoCliente: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id?: string }>();
  const history = useHistory();
  const { notify } = useNotification();
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [intereses, setIntereses] = useState<Interes[]>([]);

  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    identificacion: '',
    celular: '',
    otroTelefono: '',
    direccion: '',
    fNacimiento: '',
    fAfiliacion: '',
    sexo: '',
    resennaPersonal: '',
    imagen: '',
    interesFK: '',
  });

  useEffect(() => {
    const init = async () => {
      await fetchIntereses();
      if (id) await fetchCliente(id);
    };
    init();
    //eslint-disable-next-line
  }, [id]);

  const fetchIntereses = async () => {
    try {
      const response = await api.get<Interests[]>(ENDPOINTS.intereses.listado);
      setIntereses(response.data);
    } catch (e) {
      notify('Error al cargar intereses', 'error');
    }
  };

  const fetchCliente = async (clienteId: string) => {
    setLoading(true);
    try {
      const response = await api.get<GetClientByIDResponse>(`${ENDPOINTS.clientes.obtener(clienteId)}`);
      const c = response.data;
      setFormData({
        nombre: c.nombre || '',
        apellidos: c.apellidos || '',
        identificacion: c.identificacion || '',
        celular: c.telefonoCelular || '',
        otroTelefono: c.otroTelefono || '',
        direccion: c.direccion || '',
        fNacimiento: c.fNacimiento?.split('T')[0] || '',
        fAfiliacion: c.fAfiliacion?.split('T')[0] || '',
        sexo: c.sexo || '',
        resennaPersonal: c.resenaPersonal || '',
        imagen: c.imagen || '',
        interesFK: c.interesesId || '',
      });
    } catch (e) {
      notify('Error al cargar datos del cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagen: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        ...formData,
        ...(id ? { id } : {}),
        fNacimiento: formData.fNacimiento ? new Date(formData.fNacimiento).toISOString() : '',
        fAfiliacion: formData.fAfiliacion ? new Date(formData.fAfiliacion).toISOString() : '',
        usuarioId: user?.id || ''
      } satisfies CreateClientPayload;

      await api.post(`${ENDPOINTS.clientes[id ? 'actualizar' : 'crear']}`, payload);
      notify(`Cliente ${id ? 'actualizado' : 'creado'} con éxito`, 'success');
      history.push('/clientes');
    } catch (error) {
      notify('Error al guardar el cliente', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box className={classes.headerContainer}>
        <Box className={classes.titleSection}>
          <input
            type="file"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Box className={classes.avatarContainer} onClick={() => fileInputRef.current?.click()}>
            <Avatar src={formData.imagen} className={classes.largeAvatar} />
            <Box className={classes.avatarOverlay}>
              <PhotoCamera />
            </Box>
          </Box>
          <Typography variant="h4" className={classes.pageTitle}>
            Mantenimiento de clientes
          </Typography>
        </Box>
        <Box className={classes.actions}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<Save />}
            disabled={loading}
            className={classes.button}
          >
            Guardar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Undo />}
            onClick={() => history.push('/clientes')}
            className={classes.button}
          >
            Regresar
          </Button>
        </Box>
      </Box>

      <Paper elevation={3} className={classes.formPaper}>
        {loading && <LinearProgress />}
        <Box className={classes.gridContainer}>
          <TextField required name="identificacion" label="Identificación" variant="outlined" fullWidth value={formData.identificacion} onChange={handleChange} />
          <TextField required name="nombre" label="Nombre" variant="outlined" fullWidth value={formData.nombre} onChange={handleChange} />
          <TextField required name="apellidos" label="Apellidos" variant="outlined" fullWidth value={formData.apellidos} onChange={handleChange} />

          <TextField required select name="sexo" label="Género" variant="outlined" fullWidth value={formData.sexo} onChange={handleChange}>
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Femenino</MenuItem>
          </TextField>
          <TextField required name="fNacimiento" label="Fecha de nacimiento" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={formData.fNacimiento} onChange={handleChange} />
          <TextField required name="fAfiliacion" label="Fecha de afiliación" type="date" variant="outlined" fullWidth InputLabelProps={{ shrink: true }} value={formData.fAfiliacion} onChange={handleChange} />

          <TextField required name="celular" label="Teléfono Celular" variant="outlined" fullWidth value={formData.celular} onChange={handleChange} />
          <TextField required name="otroTelefono" label="Teléfono Otro" variant="outlined" fullWidth value={formData.otroTelefono} onChange={handleChange} />
          <TextField required select name="interesFK" label="Interés" variant="outlined" fullWidth value={formData.interesFK} onChange={handleChange}>
            {intereses.map(i => (
              <MenuItem key={i.id} value={i.id}>{i.descripcion}</MenuItem>
            ))}
          </TextField>

          <TextField required name="direccion" label="Dirección" variant="outlined" fullWidth multiline rows={2} className={classes.fullWidth} value={formData.direccion} onChange={handleChange} />
          <TextField name="resennaPersonal" label="Reseña" variant="outlined" fullWidth multiline rows={3} className={classes.fullWidth} value={formData.resennaPersonal} onChange={handleChange} />
        </Box>
      </Paper>
    </Box>
  );
};

export default MantenimientoCliente;