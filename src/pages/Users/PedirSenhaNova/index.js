import React, { useEffect, useState } from "react";
import { Form, Div } from "./styled";
import { toast } from "react-toastify";
import axios from "../../../services/axios";
import { get } from "lodash";

export default function PedirSenhaNova() {
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/email/resetar", {
        email,
      });
      toast.success("Email enviado com sucesso!");
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
    <Div>
      <h2>Pedir nova senha</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>

        <button type="submit">Solicitar</button>
      </Form>
    </Div>
  );
}
