import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { NotificationProvider } from './context/NotificationContext';

import Login from './views/Login/Login';
import Register from './views/Register';
import Home from './views/Home';
import ConsultaClientes from './views/ConsultaClientes/ConsultaClientes';
import MantenimientoCliente from './views/MantenimientoClientes/MantenimientoCliente';
import NotFound from './views/NotFound/NotFound';
import MainLayout from './components/MainLayout/MainLayout';

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Switch>
        <Route exact path="/login">
          {isAuthenticated ? <Redirect to="/home" /> : <Login />}
        </Route>
        <Route exact path="/register">
           {isAuthenticated ? <Redirect to="/home" /> : <Register />}
        </Route>

        <Route exact path="/">
          <Redirect to="/home" />
        </Route>

        <Route>
          <MainLayout>
            <Switch>
              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/clientes" component={ConsultaClientes} />
              <PrivateRoute exact path="/mantenimiento" component={MantenimientoCliente} />
              <PrivateRoute exact path="/mantenimiento/:id" component={MantenimientoCliente} />
              
              <Route component={NotFound} />
            </Switch>
          </MainLayout>
        </Route>
      </Switch>
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <AppContent />
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;