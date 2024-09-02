import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Visitador from "../pages/Visitador";
import Coordenador from "../pages/Coordenador";
import Supervisor from "../pages/Supervisor";
import Criancas from "../pages/Criancas";
import Familias from "../pages/Familias";
import PlanosDeVisita from "../pages/PlanosDeVisita";
import Cuidadores from "../pages/Cuidadores";
import RegistrarCoordenador from "../pages/RegistrarCoordenador"

import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <Route
        exact path="/"
        component={Visitador}
        isClosed={false} />
      <Route exact path="/login"
        component={Login}
        isClosed={false} />
      <Route exact path="/cadastrar-coordenador"
        component={RegistrarCoordenador}
        isClosed={false} />
      <Route path="*" component={Page404} />
    </Switch>
  );
}
