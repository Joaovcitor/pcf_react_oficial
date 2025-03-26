/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import Mapa from "../../../components/MapaDeCalor";
import { Div } from "./styled";
import { toast } from "react-toastify";
import InvalidarVisita from "../../../components/InvalidarVisita";

export default function TodasAsVisitas({ match }) {
  const { id } = match.params;
  const [allVisitas, setAllVisitas] = useState([]);

  const [visitaFinalizadas, setVisitas] = useState([]);
  const [invalidarHabilitado, setHabilitar] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/detalhes/relatorio-geral`);
        console.log(response.data);
        setAllVisitas(response.data.visitas);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erro ao carregar visitas.");
      }
    }

    getData();
  }, []);

  const handleSubmitValidarVisita = async (idVisita) => {
    try {
      const response = await axios.post(
        `/visitasporgeolo/validar-visita/${idVisita}`
      );
      toast.success("Visita validada com sucesso!");
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao validar visita:", error);
      toast.error("Ocorreu um erro ao validar a visita.");
    }
  };

  const visitasFinalizadas = allVisitas.filter(
    (visita) =>
      visita.latitude &&
      visita.longitude &&
      visita.latitude_final &&
      visita.longitude_final
  );

  const visitasInvalidas = allVisitas.filter(
    (visita) => visita.visita_mentirosa
  );

  const handleSubmitInvalidarVisita = () => {
    setHabilitar(true);
  };

  return (
    <>
      <Div>
        {visitasFinalizadas.length > 0 ? (
          <div>
            <p>Todas as visitas que foram finalizadas:</p>
            {visitasFinalizadas.map((visita) => (
              <div key={visita.id} style={{ marginBottom: "20px" }}>
                <h3>Visita ID: {visita.id}</h3>
                {visita.beneficiario_em_casa &&
                visita.latitude &&
                visita.longitude ? (
                  <>
                    <Mapa visita={visita} />
                    {/* <button
                      onClick={() => handleSubmitValidarVisita(visita.id)}
                      type="button"
                    >
                      Validar Visita
                    </button> */}
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
                  </>
                ) : (
                  "Visita não iniciada ou Beneficiário não estava em casa"
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>Não realizou visitas.</p>
        )}
      </Div>
      <Div>
        {visitasInvalidas.length > 0 ? (
          <div>
            <h3>Todas as visitas que foram invalidadas:</h3>
            {visitasInvalidas.map((visita) => (
              <div key={visita.id} style={{ marginBottom: "20px" }}>
                <h3>Visita ID: {visita.id}</h3>
                <h3>Motivo da invalidação: {visita.motivo_da_invalidacao}</h3>
                <Mapa visita={visita} />
                <button
                  onClick={() => handleSubmitValidarVisita(visita.id)}
                  type="button"
                >
                  Validar Visita
                </button>
                {/* <button
                  onClick={() => handleSubmitInvalidarVisita()}
                  type="button"
                >
                  Invalidar Visita
                </button> */}
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
    </>
  );
}
