import React from "react";
import { Container } from "../../styles/GlobalStyle";
import { Form } from './styled';

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash"

import * as actions from "../../store/modules/auth/actions"

export default function Login(props) {
  const dispatch = useDispatch()
  const prevPath = get(props, 'location.state.prevPath', '/')
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let formsErrors = false;

    if (!isEmail(email)) {
      formsErrors = true;
      toast.error("e-mail inválido")
    }

    if (password.length < 3 || password.length > 255) {
      formsErrors = true;
      toast.error("Senha invalida!")
    }

    if (formsErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <p>Login</p>
      <label htmlFor="email">E-mail: <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="Seu e-mail" /></label>
      <label htmlFor="password">Senha: <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Sua senha" /></label>
      <button type="submit">Acessar</button>
    </Form>

  );
}
