/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Div, Nav, RadioGroup } from "./styled";
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function CriarFalta({ match }) {
  const { id } = match.params;
  const [motivo_da_falta, setMotivo] = useState(null);
  const [quando_ocorreu_a_falta, setData] = useState(null);

  const [user, setUser] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get("/");
      console.log(response.data);
      setUser(response.data.user);
    }

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const registradorId = user.id;
    const userId = id;
    console.log(quando_ocorreu_a_falta);

    if (!motivo_da_falta)
      return toast.error("Motivo da falta tem que ter mais de 4 caracteres");

    try {
      const response = await axios.post("/faltas/", {
        motivo_da_falta: motivo_da_falta,
        userId: userId,
        registradorId: registradorId,
        quando_ocorreu_a_falta: quando_ocorreu_a_falta,
      });
      toast.success("Falta gerada com sucesso!");
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
      <h2>Gerar falta para</h2>
      <p>Motivo da falta</p>
      <textarea
        name="objetivo"
        onChange={(e) => setMotivo(e.target.value)}
        id="objetivo"
      ></textarea>
      <p>Quando ocorreu essa falta (se não souber, não precisa colocar):</p>
      <input
        type="date"
        name=""
        id=""
        onChange={(e) => setData(e.target.value)}
      />
      <button type="submit">Gerar falta</button>
    </Div>
  );
}
