/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Div, Nav, RadioGroup } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function RecorrerAFalta({ match }) {
  const { id } = match.params;
  const [pedir_para_invalidar_falta, setMotivo] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/faltas/${id}`);
      console.log(response.data);
      setUser(response.data);
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pedir_para_invalidar_falta)
      return toast.error("Motivo tem que ter mais de 4 caracteres");

    try {
      const response = await axios.patch(
        `/faltas/pedir-para-invalidar-falta/${id}`,
        {
          invalidationRequest: pedir_para_invalidar_falta,
        }
      );
      toast.success(response.data.message);
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
    <Container>
      <Div onSubmit={handleSubmit}>
        <div className="header">
          <span className="icon">🛡️</span>
          <h2>Pedido de Invalidação de Falta</h2>
        </div>
        <p className="subtitle">
          Explique, com clareza, o motivo para solicitar a invalidação desta
          falta.
        </p>

        <Nav>
          <span>Resumo da falta</span>
          <p>Motivo: {user?.reason || "Motivo não informado"}</p>
        </Nav>

        <label htmlFor="objetivo">Motivo da solicitação</label>
        <textarea
          name="objetivo"
          onChange={(e) => setMotivo(e.target.value)}
          id="objetivo"
          placeholder="Descreva o motivo com detalhes (ex.: justificativa, contexto, evidências)..."
        ></textarea>

        <div className="actions">
          <button type="submit">Enviar pedido</button>
        </div>
      </Div>
    </Container>
  );
}
