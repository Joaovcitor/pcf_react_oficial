/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import Mapa from "../../../components/Mapa";
import { Div } from "./styled";
import { toast } from "react-toastify";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitaFinalizadas, setVisitas] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/visitasporgeolo/visitas/${id}`);
        console.log(response.data);
        setVisitas(response.data.visitaFinalizadas);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erro ao carregar visitas.");
      }
    }

    getData();
  }, [id]);

  const handleSubmitValidarVisita = async (idVisita) => {
    try {
      const response = await axios.post(`/visitasporgeolo/validar-visita/${idVisita}`);
      toast.success("Visita validada com sucesso!");
      console.log(response.data); // Para ver a resposta da API
    } catch (error) {
      console.error("Erro ao validar visita:", error);
      toast.error("Ocorreu um erro ao validar a visita.");
    }
  };

  const handleSubmitInvalidarVisita = async (idVisita) => {
    try {
      const response = await axios.post(`/visitasporgeolo/invalidar-visita/${idVisita}`);
      toast.success("Visita invalidada com sucesso!");
      console.log(response.data); // Para ver a resposta da API
    } catch (error) {
      console.error("Erro ao invalidar visita:", error);
      toast.error("Ocorreu um erro ao invalidar a visita.");
    }
  };

  return (
    <Div>
      {visitaFinalizadas.length > 0 ? (
        <div>
          <p>Visitas feitas pelo visitador:</p>
          {visitaFinalizadas.map((visita) => (
            <div key={visita.id} style={{ marginBottom: "20px" }}>
              <h3>Visita ID: {visita.id}</h3>
              <Mapa visita={visita} />
              <button onClick={() => handleSubmitValidarVisita(visita.id)} type="button">
                Validar Visita
              </button>
              <button onClick={() => handleSubmitInvalidarVisita(visita.id)} type="button">
                Invalidar Visita
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Não realizou visitas.</p>
      )}
    </Div>
  );
}
