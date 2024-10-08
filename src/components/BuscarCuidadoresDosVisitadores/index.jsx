import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [cuidadores, setCuidadores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/cuidador/showcuidadores");
      setCuidadores(response.data.cuidadores);
    }
    getData();
  }, []);

  return (
    <Section>
      {cuidadores.map((cuidador) => {
        return (
          <div key={cuidador.id}>
            <p>Nome: {cuidador.name}</p>
            <Link className="links" to={`/cuidadores/editar/${cuidador.id}`}>
              Editar Informações
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
