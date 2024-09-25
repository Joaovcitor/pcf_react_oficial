/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Div } from "./styled";
import { get } from "lodash";
import { toast } from "react-toastify";
import axios from "../../../services/axios"

export default function Login({ match }) {
  const { id } = match.params;
  const [dayOfVisit, setDayOfVisit] = useState(null);
  const [period, setPeriod] = useState(null);


  const handleSubmitEdit = async (e) => {
    if (dayOfVisit.value === "Selecione" || period.value === "Selecione") {
      return toast.error("Selecione os campos")
    }
    e.preventDefault()
    try {
      await axios.put(`/tabelas/edit/${id}`, {
        dayOfVisit, period,
      });
      toast.success("Tabela editada com sucesso!")
    } catch (e) {
      const errors = get(e, 'response.data.errors', '');
      if (typeof errors === 'string') {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach(error => {
          toast.error(error);
        });
      } else if (typeof errors === 'object') {
        Object.values(errors).forEach(error => {
          if (typeof error === 'string') {
            toast.error(error);
          }
        });
      }
    }
  }

  const handleSubmitDelete = async (e) => {

    e.preventDefault()
    try {
      await axios.delete(`/tabelas/delete/${id}`);
      toast.success("Tabela deletada com sucesso!")
      history.push("/")
    } catch (e) {
      const errors = get(e, 'response.data.errors', '');
      if (typeof errors === 'string') {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach(error => {
          toast.error(error);
        });
      } else if (typeof errors === 'object') {
        Object.values(errors).forEach(error => {
          if (typeof error === 'string') {
            toast.error(error);
          }
        });
      }
    }
  }

  return (
    <Div>
      <h2>Editar tabela de visita</h2>
      <p>Qual a o dia da semana dessa visita?</p>
      <select name="dayOfVisita" onChange={e => setDayOfVisit(e.target.value)} id="dayOfVisita">
        <option value="Selecione">Selecione</option>
        <option value="Segunda">Segunda</option>
        <option value="Terça">Terça</option>
        <option value="Quarta">Quarta</option>
        <option value="Quinta">Quinta</option>
        <option value="Sexta">Sexta</option>
      </select>
      <p>Qual o período?</p>
      <select name="dayOfVisita" onChange={e => setPeriod(e.target.value)} id="dayOfVisita">
        <option value="Selecione">Selecione</option>
        <option value="Manhã">Manhã</option>
        <option value="Tarde">Tarde</option>
      </select>
      <button onClick={handleSubmitEdit}>Editar</button>
      <button onClick={handleSubmitDelete}>Excluir</button>
    </Div>
  );
}
