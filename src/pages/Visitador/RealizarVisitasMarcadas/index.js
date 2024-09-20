/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Div } from "./styled";
import { toast } from "react-toastify";

export default function Dados({ match }) {
  const { id } = match.params;
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [location_final, setLocationFinal] = useState({ latitude_final: null, longitude_final: null });
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);

  function teste() {
    const data_inicio = new Date().toLocaleString();
    const data_fim = new Date().toLocaleString();
    console.log("Fim: " + data_fim)
    console.log("inicio: " + data_inicio)
  }

  async function iniciarVisita(e) {
    e.preventDefault();

    const data_inicio = new Date().toISOString();
    setDataInicio(data_inicio);

    try {
      const response = await axios.post(`/visitasporgeolo/realizarvisita/${id}`, {
        idVisita: id,
        latitude: location.latitude,
        longitude: location.longitude,
        hora_inicio: data_inicio
      });

      if (response.data.success) {
        toast.success("Visita iniciada com sucesso!");
      } else {
        toast.error("Erro ao iniciar a visita.");
      }
    } catch (error) {
      console.warn("Erro ao iniciar a visita: " + error.message);
    }
  }

  async function finalizarVisita(e) {
    e.preventDefault();

    const data_fim = new Date().toISOString();
    setDataFim(data_fim);

    try {
      const response = await axios.post(`/visitasporgeolo/finalizar-visita/${id}`, {
        id,
        latitude_final: location_final.latitude_final,
        longitude_final: location_final.longitude_final,
        hora_fim: dataFim,
      });

      toast.warn(response.data)
    } catch (error) {
      toast.error("Ocorreu um erro ao finalizar a visita.")
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
      <p>Importante, ao iniciar a visita você sofrerá bloqueio nos seguintes recursos:</p>
      <ul>
        <li>Criar Planos de visitas</li>
        <li>Cadastrar novos usuários</li>
        <li>Iniciar outras visitas</li>
      </ul>
      <button onClick={iniciarVisita} type="submit">
        Iniciar a visita
      </button>
      <button onClick={finalizarVisita} type="submit" >
        Finalizar a visita
      </button>
    </Div>
  );
}
