import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function dados() {
  const [cuidadores, setCuidadores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/cuidador/showcuidadores");
      console.log(response.data);
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
            <p>Gravida: {cuidador.pregnant ? "Sim" : "Não"}</p>
            {cuidador.pregnant ? <p>Semanas: {cuidador.week_pregnant}</p> : ""}
            <Link className="links" to={`/cuidadores/editar/${cuidador.id}`}>
              Ver Informações
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
