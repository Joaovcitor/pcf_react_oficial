import React from "react";
import { CiCompass1 } from "react-icons/ci";
import { IoPersonAdd, IoPeopleSharp, IoReader, IoPeopleCircleSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { Nav, Section } from "./styled";

export default function Header() {
  return (
    <Section>
      <h3>Serviços e ferramentas</h3>
      <Nav>
        <div>
          <IoPeopleSharp size={38} style={{ color: 'white' }}/>
          <p>Cadastrar Visitador</p>
          <Link className="links" to="/cadastrar-visitador">
            Acessar
          </Link>
        </div>
        <div>
          <IoPersonAdd size={38} style={{ color: 'white' }} />
          <p>Visitadores</p>
          <Link className="links" to="/cuidador/cadastrar">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: 'white' }} />
          <p>Notificações</p>
          <Link className="links" to="/notificacoes">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{color: 'white'}} />
          <p>Validar Adesão</p>
          <Link className="links" to="/">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
