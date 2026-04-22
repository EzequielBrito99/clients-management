export interface LoginPayload {
  username: string;
  password: string;
}


export interface LoginResponse {
  token:      string;
  expiration: Date;
  userid:     string;
  username:   string;
}


export interface RegisterPayload {
  username: string;
  email:    string;
  password: string;
}


export interface RegisterResponse {
  status:  string;
  message: string;
}
