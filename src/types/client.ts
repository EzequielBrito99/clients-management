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
