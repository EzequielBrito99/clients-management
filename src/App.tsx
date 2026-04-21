import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import theme from './theme';
import { NotificationProvider } from './context/NotificationContext';

import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';
import ConsultaClientes from './views/ConsultaClientes';
import MantenimientoCliente from './views/MantenimientoCliente';
import NotFound from './views/NotFound';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NotificationProvider>
          <Router>
            <Switch>
              <Route exact path="/login">
                {isAuthenticated ? <Redirect to="/home" /> : <Login />}
              </Route>
              <Route exact path="/register" component={Register} />

              <PrivateRoute exact path="/home" component={Home} />
              <PrivateRoute exact path="/clientes" component={ConsultaClientes} />
              <PrivateRoute exact path="/mantenimiento" component={MantenimientoCliente} />
              <PrivateRoute exact path="/mantenimiento/:id" component={MantenimientoCliente} />

              <Route exact path="/">
                <Redirect to="/home" />
              </Route>

              <Route component={NotFound} />
            </Switch>
          </Router>
        </NotificationProvider>
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;