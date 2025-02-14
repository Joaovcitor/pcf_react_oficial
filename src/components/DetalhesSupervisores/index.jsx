/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function DetalhesSupervisores({ match }) {
  const { id } = match.params;
  const [visitadores, setVisitadores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `/detalhes/visitadores-do-supervisor/${id}`
      );
      console.log(response.data);
      setVisitadores(response.data.visitadores);
    }
    getData();
  }, []);

  return (
    <Section>
      {visitadores.length > 0
        ? visitadores.map((visitador) => {
            return (
              <div key={visitador.id}>
                <p>Nome: {visitador.name}</p>
                <p>Território: {visitador.territorio}</p>
                <p>CRAS: {visitador.cras}</p>
                <p>Conta Ativa: {visitador.isActive ? "Sim" : "Não"}</p>
                <p>Pendente: {visitador.isPending ? "Sim" : "Não"}</p>
                <Link
                  className="links"
                  to={`/visitadores/detalhes/${visitador.id}`}
                >
                  Mais Detalhes
                </Link>
                <Link
                  className="links"
                  to={`/visitadores/editar/${visitador.id}`}
                >
                  Editar Informações
                </Link>
              </div>
            );
          })
        : "Não tem visitadores"}
    </Section>
  );
}
