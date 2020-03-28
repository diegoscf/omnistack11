import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Cadastrar from './pages/Cadastrar';
import Perfil from './pages/Perfil';
import NovoIncidente from './pages/NovoIncidente';

export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon} />
                <Route path="/cadastrar" component={Cadastrar} />
                <Route path="/ong" component={Perfil} />
                <Route path="/incidentes/novo" component={NovoIncidente} />
            </Switch>
        </BrowserRouter>
    );
}