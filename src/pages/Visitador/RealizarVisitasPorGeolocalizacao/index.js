import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Div, Section, Sections } from "./styled";
import { Link } from "react-router-dom";

export default function dados({ match }) {
  const { id } = match.params;
  const [visita, setVisita] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `/visitasporgeolo/visitas-marcadas/${id}`
      );
      console.log(response.data.visita);
      setVisita(response.data.visita);
    }
    getData();
  }, []);

  return (
    <Sections>
      <h2>Visitas Marcadas</h2>
      <Div>
        {visita.map((visitas) => {
          return (
            <Section key={visitas.id}>
              <p>
                Data da realização da visita: {visitas.data_que_vai_ser_realizada}
              </p>
              <Link
                className="links"
                to={`/visitas/iniciar/${visitas.id}`}
              >
                Realizar Visita
              </Link>

            </Section>
          );
        })}
      </Div>
      <h2>Visitas pendentes</h2>
    </Sections>
  );
}
