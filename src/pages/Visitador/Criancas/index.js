import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

import { Section, Info, Infos } from "./styled";

// eslint-disable-next-line react/prop-types
export default function Login({ match }) {
  const [child, setChildren] = useState("");
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/crianca/info/${id}`);
      setChildren(response.data.child);
    }
    getData();
  }, []);

  return (
    <Section>
      <h2>Formulários e serviços do(a) {child.name}</h2>
      <Infos>
        <Info>
          <p>Formulários 5</p>
          <Link to={`/formularios5/${child.id}`}>Acessar</Link>
        </Info>
        <Info>
          <p>Formulários 7</p>
          <Link to={`/formularios7/${child.id}`}>Acessar</Link>
        </Info>
        <Info>
          <p>Planos de visita</p>
          <Link to={`/planos/planos-do-beneficiario/${child.id}`}>Acessar</Link>
        </Info>
        <Info>
          <p>Tabela de visita</p>
          <Link to={`/tabelas/criar/${child.id}`}>Acessar</Link>
        </Info>
      </Infos>
    </Section>
  );
}
