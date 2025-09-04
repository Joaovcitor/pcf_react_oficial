import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [visitador, setVisitadores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/supervisor/visitadores");
      setVisitadores(response.data);
    }
    getData();
  }, []);

  return (
    <Section>
      {visitador.map((visitador) => {
        return (
          <div key={visitador.id}>
            <p>Nome: {visitador.name}</p>
            <p>Território: {visitador.territorio}</p>
            <p>CRAS: {visitador.cras}</p>
            <Link
              className="links"
              to={`/visitadores/detalhes/${visitador.id}`}
            >
              Mais Detalhes
            </Link>
            {/* <Link className="links" to={`/visitadores/editar/${visitador.id}`}>
              Editar Informações
            </Link> // vou aguardar o que a prefeitura tem a dizer sobre o que pode ou não ser permitido editar dos visitadores!*/}
          </div>
        );
      })}
    </Section>
  );
}
