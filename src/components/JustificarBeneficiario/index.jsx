/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Div } from "./styled";
import { toast } from "react-toastify";

export default function BeneficiarioNaoEstaEmCasa({ id }) {
  const [location, setLocation] = useState({
    latitude_beneficiario: null,
    longitude_beneficiario: null,
  });
  const [motivo_da_nao_realizacao, setMotivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/visitasporgeolo/realizarjustificativa/${id}`, {
        latitude_beneficiario: location.latitude_beneficiario,
        longitude_beneficiario: location.longitude_beneficiario,
        motivo_da_nao_realizacao,
      });
      toast.info("Justificativa enviada com sucesso!");
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude_beneficiario: position.coords.latitude,
            longitude_beneficiario: position.coords.longitude,
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
    <Div onSubmit={handleSubmit}>
      <textarea
        onChange={(e) => setMotivo(e.target.value)}
        placeholder="digite o motivo"
      ></textarea>
      <button>Enviar Justificativa</button>
    </Div>
  );
}
