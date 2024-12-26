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
      <Nav>
        <div>
          <IoPeopleSharp size={38} style={{ color: "white" }} />
          <p>Famílias</p>
          <Link className="links" to="/familias">
            Acessar
          </Link>
        </div>
        <div>
          <IoPersonAdd size={38} style={{ color: "white" }} />
          <p>Cadastrar Família</p>
          <Link className="links" to="/cuidador/cadastrar">
            Acessar
          </Link>
        </div>
        <div>
          <IoReader size={38} style={{ color: "white" }} />
          <p>Criar Planos de Visita</p>
          <Link className="links" to="/planos">
            Acessar
          </Link>
        </div>
        <div>
          <IoPeopleCircleSharp size={38} style={{ color: "black" }} />
          <p>Cuidadores</p>
          <Link className="links" to="/cuidadores">
            Acessar
          </Link>
        </div>
        <div>
          <CiCompass1 size={38} style={{ color: "white" }} />
          <p>Realizar Visitas</p>
          <Link className="links" to="/visitas-marcadas">
            Acessar
          </Link>
        </div>
      </Nav>
    </Section>
  );
}
