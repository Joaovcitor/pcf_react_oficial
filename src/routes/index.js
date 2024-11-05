import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Home from "../pages/Home";
import MyRoute from "./MyRoute";
import Criancas from "../pages/Visitador/Criancas";
import CadastrarCuidador from "../pages/Visitador/CadastrarCuidador";
import CadastrarCrianca from "../pages/Visitador/CadastrarCrianca";
import VisitarPorGeolocalizacao from "../pages/Visitador/VisitarPorGeolocalizacao";
import RealizarVisitasPorGeolocalizacao from "../pages/Visitador/RealizarVisitasPorGeolocalizacao";
import RealizarVisitasMarcadas from "../pages/Visitador/RealizarVisitasMarcadas";
import Familias from "../pages/Visitador/Familias";
import PlanosDeVisita from "../pages/Visitador/PlanosDeVisita";
import CriarPlanosDeVisitas from "../pages/Visitador/CriarPlanosDeVisitas";
import Cuidadores from "../pages/Visitador/Cuidadores";
import RegistrarCoordenador from "../pages/Coordenador/RegistrarCoordenador";
import RegistrarSupervisor from "../pages/Coordenador/RegistrarSupervisor";
import RegistrarVisitador from "../pages/Supervisor/RegistrarVisitador";
import PlanosDeVisitaDaCrianca from "../pages/Visitador/PlanosDeVisitaDaCrianca";
import EditarPlanosDeVisitas from "../pages/Visitador/EditarPlanosDeVisitas";
import Tabelas from "../pages/Visitador/Tabelas";
import EditarEExcluirTabelas from "../pages/Visitador/EditarEExcluirTabelas";
import Visitadores from "../pages/Supervisor/Visitadores";
import Notifications from "../pages/Notificacoes/CriarNotificacoes";
import EditarUsuario from "../pages/EditarUsuario";
import RelatoriosVisitadores from "../pages/Supervisor/RelatoriosVisitadores"
import VisitasFeitasPelosVisitadores from "../pages/Supervisor/VisitasFeitasPelosVisitadores"
import ValidarBeneficiarios from "../pages/Supervisor/ValidarBeneficiarios"
import Supervisores from "../pages/Coordenador/Supervisores"
import Formulario5 from "../pages/Formularios/Formularios5"
import Relatorios from "../pages/Coordenador/RelatoriosVisitadores"


import Page404 from "../pages/Page404";

export default function Routes() {
  return (
    <Switch>
      <MyRoute exact path="/" component={Home} isClosed />
      <MyRoute exact path="/familias" component={Familias} isClosed />
      <MyRoute exact path="/cuidador" component={Cuidadores} isClosed />
      <MyRoute exact path="/planos" component={PlanosDeVisita} isClosed />
      <MyRoute
        exact
        path="/planos/criarplano/:id"
        component={CriarPlanosDeVisitas}
        isClosed
      />
      <MyRoute exact path="/login" component={Login} isClosed={false} />
      <MyRoute
        exact
        path="/cadastrar-coordenador"
        component={RegistrarCoordenador}
        isClosed={false}
      />
      <MyRoute
        exact
        path="/cadastrar-supervisor"
        component={RegistrarSupervisor}
        isClosed
      />
      <MyRoute
        exact
        path="/cadastrar-visitador"
        component={RegistrarVisitador}
        isClosed
      />
      <MyRoute
        exact
        path="/cuidador/cadastrar"
        component={CadastrarCuidador}
        isClosed
      />
      <MyRoute
        exact
        path="/crianca/cadastrar/:id"
        component={CadastrarCrianca}
        isClosed
      />
      <MyRoute
        exact
        path="/visitas-marcadas"
        component={VisitarPorGeolocalizacao}
        isClosed
      />
      <MyRoute
        exact
        path="/visitas/iniciar/:id"
        component={RealizarVisitasMarcadas}
        isClosed
      />
      <MyRoute
        exact
        path="/visitas/realizar/:id"
        component={RealizarVisitasPorGeolocalizacao}
        isClosed
      />
      <MyRoute exact path="/formularios/:id" component={Criancas} isClosed />
      <MyRoute
        exact
        path="/planos/planos-do-beneficiario/:id"
        component={PlanosDeVisitaDaCrianca}
        isClosed
      />
      <MyRoute
        exact
        path="/planos/editar/:id"
        component={EditarPlanosDeVisitas}
        isClosed
      />
      <MyRoute exact path="/tabelas/criar/:id" component={Tabelas} isClosed />
      <MyRoute
        exact
        path="/tabelas/editar/:id"
        component={EditarEExcluirTabelas}
        isClosed
      />
      <MyRoute
        exact
        path="/meus-visitadores"
        component={Visitadores}
        isClosed
      />
      <MyRoute exact path="/cuidadores" component={Cuidadores} isClosed />
      <MyRoute exact path="/notificacoes" component={Notifications} isClosed />
      <MyRoute
        exact
        path="/editar-usuario"
        component={EditarUsuario}
        isClosed
      />
      <MyRoute
        exact
        path="/visitadores/detalhes/:id"
        component={RelatoriosVisitadores}
        isClosed
      />
      <MyRoute
        exact
        path="/visitas/:id"
        component={VisitasFeitasPelosVisitadores}
        isClosed
      />
      <MyRoute
        exact
        path="/beneficiarios-pendente"
        component={ValidarBeneficiarios}
        isClosed
      />
      <MyRoute
        exact
        path="/supervisores"
        component={Supervisores}
        isClosed
      />
      <MyRoute
        exact
        path="/formularios5/:id"
        component={Formulario5}
        isClosed
      />
      <MyRoute
        exact
        path="/relatorios"
        component={Relatorios}
        isClosed
      />
      <MyRoute path="*" component={Page404} />
    </Switch >
  );
}
