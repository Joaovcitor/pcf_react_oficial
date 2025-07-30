/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../../services/axios";

import { Div, Section, Sections } from "./styled";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default function RealizarVisitasDasGestantes({ match }) {
  const { id } = match.params;
  const [visita, setVisita] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(
        `/visitasporgeolo/visitas-marcadas/${id}`
      );
      console.log(response.data);
      setVisita(response.data);
    }
    getData();
  }, []);

  const mostrarApenasVisitasNaoRealizadas = visita.filter(
    (v) => v.isFinished === false
  );

  return (
    <Sections>
      <h2>Visitas Marcadas</h2>
      <Div>
        {mostrarApenasVisitasNaoRealizadas.map((visitas) => {
          return (
            <Section key={visitas.id}>
              <p>
                Data da realização da visita:{" "}
                {format(new Date(visitas.scheduledDate), "dd/MM/yyyy HH:mm")}
              </p>
              <Link className="links" to={`/visitas/iniciar/${visitas.id}`}>
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
