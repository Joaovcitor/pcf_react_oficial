/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Div } from "./styled";
import { get } from "lodash";
import BuscarCriancasPorId from "../../../utils/BuscarCriancasPorId";
import { toast } from "react-toastify";
import axios from "../../../services/axios";

export default function Login({ match }) {
  const { id } = match.params;
  const [child, setChild] = useState(null);
  const [dayOfVisit, setDayOfVisit] = useState(null);
  const [period, setPeriod] = useState(null);

  useEffect(() => {
    async function fetchChildData() {
      const childData = await BuscarCriancasPorId(id);
      setChild(childData);
    }

    fetchChildData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/tabelas/create/${id}`, {
        dayOfVisit,
        period,
        childVisited: child.name,
      });
      toast.success("Tabela criada com sucesso!");
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
  };

  if (!child) {
    return <p>Carregando...</p>;
  }

  return (
    <Div onSubmit={handleSubmit}>
      <h2>Criar tabela de visita do {child.name}</h2>
      <p>Qual a o dia da semana dessa visita?</p>
      <select
        name="dayOfVisita"
        onChange={(e) => setDayOfVisit(e.target.value)}
        id="dayOfVisita"
      >
        <option value="Selecione">Selecione</option>
        <option value="Segunda">Segunda</option>
        <option value="Terça">Terça</option>
        <option value="Quarta">Quarta</option>
        <option value="Quinta">Quinta</option>
        <option value="Sexta">Sexta</option>
      </select>
      <p>Qual o período?</p>
      <select
        name="dayOfVisita"
        onChange={(e) => setPeriod(e.target.value)}
        id="dayOfVisita"
      >
        <option value="Selecione">Selecione</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
      </select>
      <button className="link" type="submit">
        Criar
      </button>
    </Div>
  );
}
