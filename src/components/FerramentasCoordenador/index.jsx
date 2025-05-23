import React from "react";
import {
  IoPersonAdd,
  IoPeopleSharp,
  IoReader,
  IoPeopleCircleSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { ImProfile } from "react-icons/im";

import { Nav, Section } from "./styled";

export default function Header() {
  return (
    <Section>
      <h3>Serviços e ferramentas</h3>
      <Nav>
        <div>
          <IoPersonAdd size={38} style={{ color: "white" }} />
          <p>Cadastrar Supervisor</p>
          <Link className="links" to="/cadastrar-supervisor">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: "white" }} />
          <p>Relatórios</p>
          <Link className="links" to="/relatorios">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: "white" }} />
          <p>Mapa de calor</p>
          <Link className="links" to="/visitas">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{ color: "white" }} />
          <p>Notificações</p>
          <Link className="links" to="/notificacoes">
            Acessar
          </Link>
        </div>
        <div>
          <ImProfile size={38} style={{ color: "white" }} />
          <p>Administrativo</p>
          <Link className="links" to="/administrativo">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
