import React, { useState, useEffect } from 'react';
import {
  Paper, Typography, TextField, Button, Box, Table,
  TableBody, TableCell, TableContainer, TableHead, TableRow,
  IconButton, LinearProgress
} from '@material-ui/core';
import { Search as SearchIcon, Add as AddIcon, Edit as EditIcon, Undo, Delete } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import { useStyles } from './ConsultaClientes.styles';
import { Client } from '../../types/client';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import api from '../../services/api';
import ENDPOINTS from '../../services/endpoints';

const ConsultaClientes: React.FC = () => {
  const classes = useStyles();
  const [clientes, setClientes] = useState<Client[]>([]);
  const [filter, setFilter] = useState({ nombre: '', identificacion: '' });
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const { notify } = useNotification();
  const history = useHistory();

  const fetchClientes = async () => {
    setLoading(true);
    try {
      const response = await api.post(ENDPOINTS.clientes.listado, {
        identificacion: filter.identificacion.trim() || '',
        nombre: filter.nombre.trim() || '',
        usuarioId: user?.id
      });
      setClientes(response.data);
    } catch (error) {
      notify('Error al cargar el listado de clientes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
    //eslint-disable-next-line
  }, []);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Box>
      <Box className={classes.headerContainer}>
        <Typography variant="h4" className={classes.pageTitle}>
          Consulta de Clientes
        </Typography>
        <Box className={classes.actionButtons}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => history.push('/mantenimiento')}
            className={classes.addClient}
          >
            NUEVO CLIENTE
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<Undo />}
            onClick={() => history.push('/home')}
            className={classes.goHome}
          >
            REGRESAR
          </Button>
        </Box>
      </Box>

      <Paper elevation={2} className={classes.filterPaper}>
        <Box display="flex" alignItems="center" justifyContent="flex-end" gridGap={20} flexWrap="wrap">
          <TextField
            name="nombre"
            label="Nombre"
            variant="outlined"
            size="small"
            value={filter.nombre}
            onChange={handleFilterChange}
          />
          <TextField
            name="identificacion"
            label="Identificación"
            variant="outlined"
            size="small"
            value={filter.identificacion}
            onChange={handleFilterChange}
          />
          <Button
            variant="outlined"
            color="secondary"
            onClick={fetchClientes}
            startIcon={<SearchIcon />}
            disabled={loading}
            className={classes.searchButton}
          >
            BUSCAR
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={3} className={classes.tableContainer}>
        {loading && <LinearProgress />}
        <Table stickyHeader className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>Identificación</TableCell>
              <TableCell className={classes.tableHeaderCell}>Nombre completo</TableCell>
              <TableCell className={classes.tableHeaderCell} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientes.length > 0 ? (
              clientes.map((cliente) => (
                <TableRow key={cliente.id} hover className={classes.tableRow}>
                  <TableCell className={classes.tableBodyCell}>{cliente.identificacion}</TableCell>
                  <TableCell className={classes.tableBodyCell}>{`${cliente.nombre} ${cliente.apellidos}`}</TableCell>
                  <TableCell className={classes.tableBodyCell}>
                    <Box className={classes.actionTableButtons}>
                      <IconButton
                        color="secondary"
                        onClick={() => history.push(`/mantenimiento/${cliente.id}`)}
                        title="Editar cliente"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => history.push(`/mantenimiento/${cliente.id}`)}
                        title="Editar cliente"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} align="center" style={{ padding: '60px 0' }}>
                  <Typography color="textSecondary">
                    {loading ? 'Buscando registros...' : 'No se encontraron clientes.'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ConsultaClientes;