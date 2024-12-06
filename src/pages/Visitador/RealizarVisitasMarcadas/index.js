/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Div } from "./styled";
import { toast } from "react-toastify";
import LocalizacaoReal from "../../../components/LocalizacaoReal";

export default function Dados({ match }) {
  const { id } = match.params;
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [location_final, setLocationFinal] = useState({
    latitude_final: null,
    longitude_final: null,
  });
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);

  async function iniciarVisita(e) {
    e.preventDefault();

    const data_inicio = new Date().toISOString();
    setDataInicio(data_inicio);

    try {
      await axios.post(`/visitasporgeolo/realizarvisita/${id}`, {
        idVisita: id,
        latitude: location.latitude,
        longitude: location.longitude,
        hora_inicio: data_inicio,
      });

      toast.success("Visita iniciada com sucesso!");
    } catch (error) {
      console.warn("Erro ao iniciar a visita: " + error.message);
    }
  }

  async function finalizarVisita(e) {
    e.preventDefault();

    const data_fim = new Date().toISOString();
    setDataFim(data_fim);

    try {
      const verificarVisitaFinalizada = await axios.get(
        `/visitasporgeolo/verificar-visita/${id}`
      );
      console.log(verificarVisitaFinalizada.data.visita.longitude);
      if (
        !verificarVisitaFinalizada.data.visita.latitude &&
        !verificarVisitaFinalizada.data.visita.longitude
      ) {
        return toast.warning("Primeiro inicie a visita!");
      }
      await axios.put(`/visitasporgeolo/finalizar-visita/${id}`, {
        id,
        latitude_final: location_final.latitude_final,
        longitude_final: location_final.longitude_final,
        hora_fim: dataFim,
      });

      toast.success("Visita finalizada");
    } catch (error) {
      toast.error("Ocorreu um erro ao finalizar a visita.");
      console.warn(error);
    }
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (err) => {
          toast.error("Erro ao obter localização: " + err.message);
        }
      );
    } else {
      toast.error("Geolocalização não é suportada pelo seu navegador.");
    }
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocationFinal({
            latitude_final: position.coords.latitude,
            longitude_final: position.coords.longitude,
          });
        },
        (err) => {
          toast.error("Erro ao obter localização: " + err.message);
        }
      );
    } else {
      toast.error("Geolocalização não é suportada pelo seu navegador.");
    }
  }, [id]);

  return (
    <Div>
      <p>
        Importante, ao iniciar a visita você sofrerá bloqueio nos seguintes
        recursos:
      </p>
      <ul>
        <li>Criar Planos de visitas</li>
        <li>Cadastrar novos usuários</li>
        <li>Iniciar outras visitas</li>
      </ul>
      <button onClick={iniciarVisita} type="submit">
        Iniciar a visita
      </button>
      <button onClick={finalizarVisita} type="submit">
        Finalizar a visita
      </button>
      <p>Sua localização:</p>
      <LocalizacaoReal></LocalizacaoReal>
    </Div>
  );
}
