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
          <p>Famílias</p>
          <Link className="links" to="/familias">
            Acessar
          </Link>
        </div>
        <div>
          <IoPersonAdd size={38} style={{ color: 'white' }} />
          <p>Cadastrar Família</p>
          <Link className="links" to="/">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: 'white' }} />
          <p>Planos de Visita</p>
          <Link className="links" to="/planos">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{color: 'white'}} />
          <p>Cuidadores</p>
          <Link className="links" to="/">
            Acessar
          </Link>
        </div>
        <div>
          <CiCompass1 size={38} style={{color: 'white'}} />
          <p>Realizar Visitas</p>
          <Link className="links" to="/">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
