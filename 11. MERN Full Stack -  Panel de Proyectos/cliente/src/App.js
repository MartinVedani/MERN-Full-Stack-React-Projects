import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import CentralProyectos from './components/proyectos/CentralProyectos';

import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './config/token';
import RutaPrivada from './components/rutas/RutaPrivadas';

// Revisar si tenemos un Json Web Token
const token = localStorage.getItem('token');
if (token) {
    tokenAuth(token);
}

function App() {

    return (

        <ProyectoState>

            <TareaState>

                <AlertaState>

                    <AuthState>

                        <Router>
                            <Switch>
                                <Route exact path='/' component={Login} />
                                <Route exact path='/nueva-cuenta' component={NuevaCuenta} />
                                <RutaPrivada exact path='/proyectos' component={CentralProyectos} />
                            </Switch>
                        </Router>

                    </AuthState>

                </AlertaState>

            </TareaState>

        </ProyectoState>
    );
}

export default App;
