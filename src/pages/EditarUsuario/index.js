import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import history from "../../services/history";

import { toast } from "react-toastify";
import { get } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { isEmail } from "validator";
import { Container } from "../../styles/GlobalStyle";
import { Form } from "./styled";

import * as actions from "../../store/modules/auth/actions";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmepassword, setConfirmarSenha] = useState("");

  const dispatch = useDispatch();

  const emailStored = useSelector((state) => state.auth.user.email);
  const id = useSelector((state) => state.auth.user.id);

  React.useEffect(() => {
    if (!id) return;
    setEmail(emailStored);
  }, [id, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(actions.registerRequest({ email, password, id }));
  }

  return (
    <Container>
      <h2>Editar suas informações</h2>
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
        <button type="submit">Editar</button>
      </Form>
    </Container>
  );
}
