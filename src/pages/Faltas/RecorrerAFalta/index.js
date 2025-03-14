/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Div, Nav, RadioGroup } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function RecorrerAFalta({ match }) {
  const { id } = match.params;
  const [pedir_para_invalidar_falta, setMotivo] = useState("");

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/faltas/faltas-que-o-user-levou/${id}`);
      setUser(response.data.falta);
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!pedir_para_invalidar_falta)
      return toast.error("Motivo tem que ter mais de 4 caracteres");

    try {
      const response = await axios.post("/faltas/pedir-para-invalidar", {
        pedir_para_invalidar_falta,
        id,
      });
      console.log();
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
    <Div onSubmit={handleSubmit}>
      <h2>Pedir invalidação</h2>
      <p>Motivo</p>
      <textarea
        name="objetivo"
        onChange={(e) => setMotivo(e.target.value)}
        id="objetivo"
      ></textarea>
      <button type="submit">Enviar</button>
    </Div>
  );
}
