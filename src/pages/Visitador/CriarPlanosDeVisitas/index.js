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
      objective.length < 3 ||
      !objectiveDifficulty ||
      etapa1.length < 3 ||
      etapa2.length < 3 ||
      etapa3.length < 3
    ) {
      return toast.error("Preencha todos os campos");
    }

    const dataFormatada = new Date(scheduledDay).toISOString();

    try {
      console.log(objectiveDifficulty);
      // Primeira chamada: criação do plano
      const response = await axios.post(`/planos/${id}`, {
        scheduledDay: dataFormatada,
        objective,
        objectiveDifficulty,
        etapa1,
        etapa2,
        etapa3,
        childId: id,
      });

      // Segunda chamada: agendar a visita com base no plano criado (parado, por questões de servidor!)
      // await axios.post(`/visitasporgeolo/agendar-visita/${id}`, {
      //   idChild: id,
      //   planoId: response.data.plano.id,
      //   data_que_vai_ser_realizada: dia_a_ser_realizada_a_visita,
      // });

      toast.success("Plano criado com sucesso e visita agendada");
      // history.push(`/planos/criarplano/${id}`);
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof errors === "object") {
        Object.values(errors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
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
