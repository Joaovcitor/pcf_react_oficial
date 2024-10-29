import React from "react";
import {
  IoPersonAdd,
  IoPeopleSharp,
  IoReader,
  IoPeopleCircleSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";

import { Nav, Section } from "./styled";

export default function Header() {
  return (
    <Section>
      <h3>Serviços e ferramentas</h3>
      <Nav>
        <div>
          <IoPersonAdd size={38} style={{ color: "black" }} />
          <p>Cadastrar Supervisor</p>
          <Link className="links" to="/cadastrar-supervisor">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleSharp size={38} style={{ color: "black" }} />
          <p>Supervisores</p>
          <Link className="links" to="/supervisores">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: "black" }} />
          <p>Relatórios</p>
          <Link className="links" to="/relatorios">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{ color: "black" }} />
          <p>Notificações</p>
          <Link className="links" to="/notificacoes">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
