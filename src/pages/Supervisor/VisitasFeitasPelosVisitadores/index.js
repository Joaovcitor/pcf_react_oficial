/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import Mapa from "../../../components/Mapa";
import { Div } from "./styled";
import { toast } from "react-toastify";
import InvalidarVisita from "../../../components/InvalidarVisita";
import { format } from "date-fns";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitaFinalizadas, setVisitas] = useState([]);
  const [visitasSemBeneficiarios, setVisitasSemBeneficiarios] = useState([]);
  const [invalidarHabilitado, setHabilitar] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/visitasporgeolo/visitas/${id}`);
        console.log(response.data);
        setVisitas(response.data.visitaFinalizadas);
        setVisitasSemBeneficiarios(response.data.visitasSemBeneficiarios);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erro ao carregar visitas.");
      }
    }

    getData();
  }, [id]);

  const handleSubmitValidarVisita = async (idVisita) => {
    try {
      await axios.post(`/visitasporgeolo/validar-visita/${idVisita}`);
      toast.success("Visita validada com sucesso!");
    } catch (error) {
      console.error("Erro ao validar visita:", error);
      toast.error("Ocorreu um erro ao validar a visita.");
    }
  };

  const handleSubmitInvalidarVisita = () => {
    setHabilitar(true);
  };

  return (
    <>
      <Div>
        {visitaFinalizadas.length > 0 && !visitaFinalizadas.visita_mentirosa ? (
          <div>
            <p>Visitas feitas pelo visitador:</p>
            {visitaFinalizadas.map((visita) => (
              <div key={visita.id} style={{ marginBottom: "20px" }}>
                <h3>Visita ID: {visita.id}</h3>
                <p>
                  Horário que iniciou:{" "}
                  {format(visita.hora_inicio, "dd/MM/yyyy HH:mm:ss")}
                </p>
                <p>
                  Horário que finalizou:{" "}
                  {format(visita.hora_fim, "dd/MM/yyyy HH:mm:ss")}
                </p>
                <Mapa visita={visita} />
                <button
                  onClick={() => handleSubmitValidarVisita(visita.id)}
                  type="button"
                >
                  Validar Visita
                </button>
                <button
                  onClick={() => handleSubmitInvalidarVisita()}
                  type="button"
                >
                  Invalidar Visita
                </button>
                {invalidarHabilitado ? (
                  <InvalidarVisita id={visita.id}></InvalidarVisita>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Não realizou visitas.</p>
        )}
      </Div>
      <Div>
        {visitasSemBeneficiarios.length > 0 ? (
          <div>
            <p>Beneficiário não estava em casa:</p>
            {visitasSemBeneficiarios.map((visita) => (
              <div key={visita.id} style={{ marginBottom: "20px" }}>
                <h3>Visita ID: {visita.id}</h3>
                <Mapa visita={visita} />
                <h3>Motivo da não realização:</h3>
                <p>{visita.motivo_da_nao_realizacao}</p>
                {/* <button
                  onClick={() => handleSubmitInvalidarVisita()}
                  type="button"
                >
                  Invalidar Justificativa
                </button>
                {invalidarHabilitado ? (
                  <InvalidarVisita id={visita.id}></InvalidarVisita>
                ) : (
                  ""
                )} */}
                {/* <button
                  onClick={() => handleSubmitValidarVisita(visita.id)}
                  type="button"
                >
                  Validar Visita
                </button>

                 */}
              </div>
            ))}
          </div>
        ) : (
          ""
        )}
      </Div>
    </>
  );
}
