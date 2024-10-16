import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [supervisores, setSupervisores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/coordenador/meus-supervisores");
      setSupervisores(response.data.supervisores);
    }
    getData();
  }, []);

  return (
    <Section>
      {supervisores.map((supervisor) => {
        return (
          <div key={supervisor.id}>
            <p>Nome: {supervisor.name}</p>
            <p>Território: {supervisor.territorio}</p>
            <p>CRAS: {supervisor.cras}</p>
            <Link
              className="links"
              to={`/meus-supervisores/detalhes/${supervisor.id}`}
            >
              Mais Detalhes
            </Link>
            <Link
              className="links"
              to={`/meus-supervisores/editar/${supervisor.id}`}
            >
              Editar Informações
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
