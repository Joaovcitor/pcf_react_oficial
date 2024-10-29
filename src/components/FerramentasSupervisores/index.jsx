import React from "react";
import { CiCompass1 } from "react-icons/ci";
import {
  IoPersonAdd,
  IoPeopleSharp,
  IoReader,
  IoPeopleCircleSharp,
} from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Nav, Section } from "./styled";

export default function Header() {
  return (
    <Section>
      <h3>Serviços e ferramentas</h3>
      <Nav>
        <div>
          <IoPersonAdd size={38} style={{ color: "black" }} />
          <p style={{ color: "black" }}>Cadastrar Visitador</p>
          <Link className="links" to="/cadastrar-visitador">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleSharp size={38} style={{ color: "black" }} />
          <p>Visitadores</p>
          <Link className="links" to="/meus-visitadores">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: "black" }} />
          <p>Notificações</p>
          <Link className="links" to="/notificacoes">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{ color: "black" }} />
          <p>Validar Adesão</p>
          <Link className="links" to="/beneficiarios-pendente">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
