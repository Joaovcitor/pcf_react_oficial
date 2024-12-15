/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Div } from "./styled";
import { toast } from "react-toastify";

export default function InvalidarVisita({ id }) {
  const [motivo_da_invalidacao, setMotivo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/visitasporgeolo/invalidar-visita/${id}`, {
        motivo_da_invalidacao,
      });
      toast.info("Justificativa enviada com sucesso e visita invalidada!");
    } catch (e) {
      console.log(e);
    }
  };

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
