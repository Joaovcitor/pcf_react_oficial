import React, { useEffect, useState } from "react";
import { Div, Nav, StyledDateInput } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
export default function PlanosDeVisita({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const [child, setChildrens] = useState([]);
  const [scheduledDay, setDia] = useState("");
  const [objective, setObjetivo] = useState("");
  const [objectiveDifficulty, setGrau] = useState("");
  const [etapa1, setEtapa1] = useState("");
  const [etapa2, setEtapa2] = useState("");
  const [etapa3, setEtapa3] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/crianca/${id}`);
      setChildrens(response.data);
    }

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !scheduledDay ||
      objective.length < 3 ||
      !objectiveDifficulty ||
      objectiveDifficulty === "Selecione" ||
      etapa1.length < 3 ||
      etapa2.length < 3 ||
      etapa3.length < 3
    ) {
      if (!scheduledDay) {
        return toast.error("Por favor, selecione a data da visita.");
      }
      return toast.error("Preencha todos os campos obrigatórios.");
    }

    try {
      const dateObject = new Date(scheduledDay);
      if (isNaN(dateObject.getTime())) {
        toast.error(
          "Erro interno: A data selecionada é inválida. Tente selecionar novamente."
        );
        console.error(
          "Tentativa de formatar um objeto 'Invalid Date'. Valor do input era:",
          scheduledDay
        );
        return;
      }

      const dataFormatada = dateObject.toISOString();
      console.log("3. Data formatada (ISO String) para envio:", dataFormatada);

      const response = await axios.post(`/planos/${id}`, {
        scheduledDay: dataFormatada,
        objective,
        objectiveDifficulty,
        etapa1,
        etapa2,
        etapa3,
        childId: id,
      });

      // Segunda chamada: criação da visita
      const visitaResponse = await axios.post(`/visitasporgeolo/`, {
        childId: parseInt(id),
        planId: response.data.id,
        scheduledDate: dataFormatada,
      });

      toast.success("Plano criado com sucesso e visita agendada");
    } catch (e) {
      console.error("ERRO CAPTURADO NA CHAMADA DA API:", e);
      if (e.response) {
        // Erro vindo da resposta da API (Axios)
        console.error("Dados da resposta do erro:", e.response.data);
        console.error("Status do erro:", e.response.status);
        const errors =
          e.response.data.errors ||
          e.response.data.message ||
          "Erro desconhecido no servidor.";
        toast.error(Array.isArray(errors) ? errors.join(", ") : errors);
      } else {
        // Erro no próprio JavaScript (como o de data inválida)
        toast.error(`Erro no cliente: ${e.message}`);
      }
    }
  }
  return (
    <Div onSubmit={handleSubmit}>
      <h2>Criar Plano de visita</h2>

      <p>Quando você vai realizar a visita?</p>
      <StyledDateInput
        name="dia_a_ser_realizada_a_visita"
        onChange={(e) => setDia(e.target.value)}
        id="dia_a_ser_realizada_a_visita"
      />
      <p>Objetivo:</p>
      <textarea
        name="objetivo"
        onChange={(e) => setObjetivo(e.target.value)}
        id="objetivo"
      ></textarea>
      <p>Qual a dificuldade dessa atividade?</p>
      <select
        name="grau_de_dificuldade_objetivo"
        onChange={(e) => setGrau(e.target.value)}
        id="grau_de_dificuldade_objetivo"
      >
        <option value="Selecione">Selecione</option>
        <option value="Facil">Facil</option>
        <option value="Media">Media</option>
        <option value="Dificil">Dificil</option>
      </select>
      <p>Momento 1:</p>
      <textarea
        name="etapa1"
        onChange={(e) => setEtapa1(e.target.value)}
        id="etapa1"
      ></textarea>
      <p>Momento 2:</p>
      <textarea
        name="etapa2"
        onChange={(e) => setEtapa2(e.target.value)}
        id="etapa2"
      ></textarea>
      <p>Momento 3:</p>
      <textarea
        name="etapa3"
        onChange={(e) => setEtapa3(e.target.value)}
        id="etapa3"
      ></textarea>
      <button type="submit">Criar Plano</button>
    </Div>
  );
}
