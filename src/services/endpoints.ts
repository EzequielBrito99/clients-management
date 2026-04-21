export const BASE_URL = 'https://pruebareactjs.test-class.com/Api/';

export const ENDPOINTS = {
  auth: {
    login: 'api/Authenticate/login',
    register: 'api/Authenticate/register',
  },
  clientes: {
    listado: 'api/Cliente/Listado',
    obtener: (id: string) => `api/Cliente/Obtener/${id}`,
    crear: 'api/Cliente/Crear',
    actualizar: 'api/Cliente/Actualizar',
    eliminar: (id: string) => `api/Cliente/Eliminar/${id}`,
  },
  intereses: {
    listado: 'api/Intereses/Listado',
  },
};

export default ENDPOINTS;