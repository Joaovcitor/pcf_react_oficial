import React from "react";
import { Switch, Route } from "react-router-dom";
import { toast } from "react-toastify";

import Login from "../pages/Login";
import Home from "../pages/Home";
import MyRoute from "./MyRoute";
import Criancas from "../pages/Visitador/Criancas";
import CadastrarCuidador from "../pages/Visitador/CadastrarCuidador";
import CadastrarCrianca from "../pages/Visitador/CadastrarCrianca";
import DetalhesCrianca from "../pages/Visitador/DetalhesCrianca";
import EditarCrianca from "../pages/Visitador/EditarCrianca";
import TodasAsVisitas from "../pages/Coordenador/VisitasFeitasPelosVisitadores";
import VisitarPorGeolocalizacao from "../pages/Geolocalizacao/VisitarPorGeolocalizacao";
import RealizarVisitasPorGeolocalizacao from "../pages/Geolocalizacao/Criancas/RealizarVisitasPorGeolocalizacao";
import RealizarVisitasMarcadas from "../pages/Geolocalizacao/RealizarVisitasMarcadas";
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
import EditarVisitador from "../pages/Coordenador/Visitadores";
import Notifications from "../pages/Notificacoes/CriarNotificacoes";
import EditarUsuario from "../pages/EditarUsuario";
import RelatoriosVisitadores from "../pages/Supervisor/RelatoriosVisitadores";
import VisitasFeitasPelosVisitadores from "../pages/Supervisor/VisitasFeitasPelosVisitadores";
import ValidarBeneficiarios from "../pages/Supervisor/ValidarBeneficiarios";
import Supervisores from "../pages/Coordenador/Supervisores";
import Formulario5 from "../pages/Formularios/Formularios5";
import Formulario7 from "../pages/Formularios/Formularios7";
import FormulariosBeneficiario from "../pages/Formularios/Beneficiario";
import Relatorios from "../pages/Coordenador/RelatoriosVisitadores";
import SupervisorCuidadores from "../pages/Supervisor/Cuidadores";
import CoordenadorCuidadores from "../pages/Coordenador/Cuidadores";

import Page404 from "../pages/Page404";
import BuscarSupervisores from "../components/BuscarSupervisores";
import DetalhesSupervisores from "../components/DetalhesSupervisores";
import FormsCuidadores from "../pages/Gestante/FormsCuidadores";
import PedirSenhaNova from "../pages/Users/PedirSenhaNova";
import ResetarSenha from "../pages/Users/ResetarSenha";
import ResetPassword from "../pages/ResetPassword";
import Administrativo from "../pages/Adm";

import CriarFalta from "../pages/Faltas/CriarFalta";
import RecorrerAFalta from "../pages/Faltas/RecorrerAFalta";
import RelatorioIndividualVisitador from "../pages/Coordenador/RelatoriosVisitador";
import CriarPlanosDeVisitaGravida from "../pages/Gestante/CriarPlanosDeVisitasGravida";
import RealizarVisitasDasGestantes from "../pages/Geolocalizacao/RealizarVisitasPorGeolocalizacao";
import PlanosDeVisitasDaGestante from "../pages/Gestante/PlanosDeVisitaDaGestante";
import CriarTabelaParaGestante from "../pages/Gestante/Tabelas";
import MapaDeCalor from "../pages/Coordenador/MapaDeCalor";
import ModelosPlanos from "../pages/Supervisor/ModelosPlanos";
import ListarCriancas from "../pages/Coordenador/ListarCriancas";

// Posts
import PostsVisitador from "../pages/Visitador/Posts";
import PostsSupervisor from "../pages/Supervisor/Posts";
import PostsCoordenador from "../pages/AdministrativoCoordenador/Posts";
import CriarPostSupervisor from "../pages/Supervisor/CriarPost";
import CriarPostCoordenador from "../pages/AdministrativoCoordenador/CriarPost";
import CriarFormulario from "../pages/Supervisor/CriarFormulario";
import FormulariosSupervisor from "../pages/Supervisor/Formularios";
import DashboardRH from "../pages/RH/DashboardRH";
import CriarUsuarioRH from "../pages/Coordenador/CriarUsuarioRH";

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
      <MyRoute
        exact
        path="/planos/criarplano-gravida/:id"
        component={CriarPlanosDeVisitaGravida}
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
        path="/visitadores/editar/:id"
        component={EditarVisitador}
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
      <MyRoute exact path="/crianca/:id" component={DetalhesCrianca} isClosed />
      <MyRoute
        exact
        path="/crianca/editar/:id"
        component={EditarCrianca}
        isClosed
      />
      <MyRoute exact path="/visitas" component={MapaDeCalor} isClosed />
      <MyRoute
        exact
        path="/visitas-marcadas"
        component={VisitarPorGeolocalizacao}
        isClosed
      />
      <MyRoute
        exact
        path="/visitas/visitas-agendadas-gravida/:id"
        component={RealizarVisitasDasGestantes}
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
      <MyRoute exact path="/formularios/:id" component={FormulariosBeneficiario} isClosed />
      <MyRoute
        exact
        path="/formularios/desenvolvimento-infantil/:id"
        component={FormulariosBeneficiario}
        isClosed
      />
      <MyRoute
        exact
        path="/formularios/gravidas/:id"
        component={FormsCuidadores}
        isClosed
      />

      <MyRoute
        exact
        path="/planos/planos-do-beneficiario/:id"
        component={PlanosDeVisitaDaCrianca}
        isClosed
      />
      <MyRoute
        exact
        path="/planos/planos-da-gestante/:id"
        component={PlanosDeVisitasDaGestante}
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
        path="/tabelas/gestante/criar/:id"
        component={CriarTabelaParaGestante}
        isClosed
      />
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
      <MyRoute
        exact
        path="/supervisor/cuidadores"
        component={SupervisorCuidadores}
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
        path="/coordenador/visitadores/detalhes/:id"
        component={RelatorioIndividualVisitador}
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
      <MyRoute exact path="/modelos" component={ModelosPlanos} isClosed />
      <MyRoute exact path="/supervisores" component={Supervisores} isClosed />
      <MyRoute
        exact
        path="/coordenador/cuidadores"
        component={CoordenadorCuidadores}
        isClosed
      />
      <MyRoute
        exact
        path="/coordenador/criancas"
        component={ListarCriancas}
        isClosed
      />
      <MyRoute
        exact
        path="/meus-supervisores/detalhes/:id"
        component={DetalhesSupervisores}
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
        path="/formularios7/:id"
        component={Formulario7}
        isClosed
      />
      <MyRoute exact path="/relatorios" component={Relatorios} isClosed />
      <MyRoute
        exact
        path="/pedir-senha-nova"
        component={PedirSenhaNova}
        isClosed={false}
      />
      <MyRoute
        exact
        path="/perfil/resetar-senha/:token"
        component={ResetarSenha}
        isClosed={false}
      />
      <MyRoute
        exact
        path="/reset-password/:token"
        component={ResetPassword}
        isClosed={false}
      />
      <MyRoute
        exact
        path="/administrativo"
        component={Administrativo}
        isClosed
      />
      <MyRoute
        exact
        path="/administrativo"
        component={Administrativo}
        isClosed
      />
      <MyRoute exact path="/faltas/criar/:id" component={CriarFalta} isClosed />
      <MyRoute
        exact
        path="/faltas/pedir-para-invalidar/:id"
        component={RecorrerAFalta}
        isClosed
      />

      {/* Rotas de Posts */}
      <MyRoute exact path="/posts" component={PostsVisitador} isClosed />
      <MyRoute
        exact
        path="/visitador/posts"
        component={PostsVisitador}
        isClosed
      />
      <MyRoute
        exact
        path="/supervisor/posts"
        component={PostsSupervisor}
        isClosed
      />
      <MyRoute
        exact
        path="/coordenador/posts"
        component={PostsCoordenador}
        isClosed
      />
      <MyRoute
        exact
        path="/supervisor/criar-post"
        component={CriarPostSupervisor}
        isClosed
      />
      <MyRoute
        exact
        path="/coordenador/criar-post"
        component={CriarPostCoordenador}
        isClosed
      />

      {/* Rotas de Formulários */}
      <MyRoute
        exact
        path="/supervisor/formularios"
        component={FormulariosSupervisor}
        isClosed
      />
      <MyRoute
        exact
        path="/supervisor/criar-formulario"
        component={CriarFormulario}
        isClosed
      />

      {/* Rota do Dashboard RH */}
      <MyRoute exact path="/rh/dashboard" component={DashboardRH} isClosed />

      {/* Rota para Criar Usuário RH */}
      <MyRoute
        exact
        path="/coordenador/criar-usuario-rh"
        component={CriarUsuarioRH}
        isClosed
      />

      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
