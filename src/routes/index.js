import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Home from "../pages/Home";
import MyRoute from "./MyRoute";
import Criancas from "../pages/Criancas";
import Familias from "../pages/Familias";
import PlanosDeVisita from "../pages/PlanosDeVisita";
import Cuidadores from "../pages/Cuidadores";
import RegistrarCoordenador from "../pages/RegistrarCoordenador";

// cadastro

import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <MyRoute
        exact path="/"
        component={Home}
        isClosed />
      <MyRoute
        exact path="/familias"
        component={Familias}
        isClosed />
        <MyRoute
        exact path="/cuidador"
        component={Cuidadores}
        isClosed />
        <MyRoute
        exact path="/planos"
        component={PlanosDeVisita}
        isClosed />
      <MyRoute exact path="/login"
        component={Login}
        isClosed={false} />
      <MyRoute exact path="/cadastrar-coordenador"
        component={RegistrarCoordenador}
        isClosed={false} />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
