import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Section } from "./styled";
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
    <Section>
      {visita.map((visitas) => {
        return (
          <div key={visitas.id}>
            <p>
              Data da realização da visita: {visitas.data_que_vai_ser_realizada}
            </p>
            <Link
              className="links"
              to={`/geolocalizacao/realizar/${visita.id}`}
            >
              Realizar Visitas
            </Link>
          </div>
        );
      })}
    </Section>
  );
}
