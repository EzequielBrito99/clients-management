import React, { createContext, useState, useContext, ReactNode } from 'react';

interface User {
  id: string;
  username: string;
}

interface AuthContextData {
  isAuthenticated: boolean;
  user: User | null;
  login: (userData: LoginResponse) => void;
  logout: () => void;
}

export interface LoginResponse {
  token: string;
  userid: string;
  username: string;
  expiration: string;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const id = sessionStorage.getItem('userid');
    const username = sessionStorage.getItem('username');
    return id && username ? { id, username } : null;
  });

  const isAuthenticated = !!user;

  const login = (userData: LoginResponse) => {
    sessionStorage.setItem('token', userData.token);
    sessionStorage.setItem('userid', userData.userid);
    sessionStorage.setItem('username', userData.username);
    
    setUser({
      id: userData.userid,
      username: userData.username
    });
  };

  const logout = () => {
    sessionStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);