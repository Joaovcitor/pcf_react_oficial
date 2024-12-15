/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Div } from "./styled";
import { toast } from "react-toastify";
import LocalizacaoReal from "../../../components/LocalizacaoReal";
import BeneficiarioNaoEstaEmCasa from "../../../components/JustificarBeneficiario";

export default function Dados({ match }) {
  const { id } = match.params;
  const [visita, setVisita] = useState([]);
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [location_final, setLocationFinal] = useState({
    latitude_final: null,
    longitude_final: null,
  });
  const [dataInicio, setDataInicio] = useState(null);
  const [dataFim, setDataFim] = useState(null);

  useEffect(() => {
    async function getDados() {
      const verificarVisitaFinalizada = await axios.get(
        `/visitasporgeolo/verificar-visita/${id}`
      );
      setVisita(verificarVisitaFinalizada.data.visita);
    }
    getDados();
  }, [id]);

  async function iniciarVisita(e) {
    e.preventDefault();

    const data_inicio = new Date().toISOString();
    console.log(data_inicio);
    setDataInicio(data_inicio);

    if (!visita.beneficiario_em_casa) {
      return toast.warn("Você disse que esse beneficiário não está em casa!");
    }
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
    console.log(data_fim);
    setDataFim(data_fim);

    try {
      const verificarVisitaFinalizada = await axios.get(
        `/visitasporgeolo/verificar-visita/${id}`
      );

      if (!visita.beneficiario_em_casa) {
        return toast.warn("Você disse que esse beneficiário não está em casa!");
      }

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
        hora_fim: data_fim,
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
      <button onClick={iniciarVisita} type="submit">
        Iniciar a visita
      </button>
      <button onClick={finalizarVisita} type="submit">
        Finalizar a visita
      </button>
      <p>Sua localização:</p>
      <LocalizacaoReal></LocalizacaoReal>
      <br />

      {visita.latitude && visita.longitude ? (
        ""
      ) : (
        <>
          <p>PREENCHA APENAS SE O BENEFICIÁRIO NÃO ESTIVER EM CASA!</p>
          <BeneficiarioNaoEstaEmCasa id={visita.id}></BeneficiarioNaoEstaEmCasa>
        </>
      )}
    </Div>
  );
}
