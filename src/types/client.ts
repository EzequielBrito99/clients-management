export interface Client {
  id?: string;
  nombre: string;
  apellidos: string;
  identificacion: string;
  telefonoCelular: string;
  otroTelefono: string;
  direccion: string;
  fNacimiento: string;
  fAfiliacion: string;
  sexo: 'M' | 'F';
  resenaPersonal: string;
  imagen?: string;
  interesesId: string;
}

export interface GetClient{
  id:             string;
  identificacion: string;
  nombre:         string;
  apellidos:      string;
}

export interface GetClientsPayload {
  identificacion: string;
  nombre:         string;
  usuarioId:      string;
}

export type GetClientsResponse = GetClient[]

export interface GetClientByIDResponse {
  id:              string;
  nombre:          string;
  apellidos:       string;
  identificacion:  string;
  telefonoCelular: string;
  otroTelefono:    string;
  direccion:       string;
  fNacimiento:     string;
  fAfiliacion:     string;
  sexo:            string;
  resenaPersonal:  string;
  imagen:          string;
  interesesId:     string;
}

export interface CreateClientPayload {
  nombre:          string;
  apellidos:       string;
  identificacion:  string;
  celular:         string;
  otroTelefono:    string;
  direccion:       string;
  fNacimiento:     string;
  fAfiliacion:     string;
  sexo:            string;
  resennaPersonal: string;
  imagen:          string;
  interesFK:       string;
  usuarioId:       string;
}

