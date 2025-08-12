import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";

import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import { Form } from "./styled";

export default function Login() {
  const [name, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmepassword, setConfirmarSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [cras, setCras] = useState("");
  const [territorio, setTerritorio] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post("/users/criar-visitador", {
        name,
        password,
        email,
        cpf,
        confirmepassword,
        cras,
        territorio,
      });

      toast.success("Visitador cadastrado com sucesso!");
      history.push("/");
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
      <h2>Cadastrar novo Visitador</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <label htmlFor="confirmepassword">
          Confirme sua senha:
          <input
            type="password"
            value={confirmepassword}
            onChange={(e) => setConfirmarSenha(e.target.value)}
          />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
          />
        </label>
        <label htmlFor="territorio">
          Território:
          <input
            type="text"
            value={territorio}
            onChange={(e) => setTerritorio(e.target.value)}
          />
        </label>
        <label htmlFor="cras">
          CRAS:
          <input
            type="text"
            value={cras}
            onChange={(e) => setCras(e.target.value)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
