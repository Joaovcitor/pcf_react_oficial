import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";

import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash"
import { Form, Section } from "./styled"

export default function Login() {
  const [name, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmepassword, setConfirmarSenha] = useState('');
  const [cpf, setCpf] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    let formsErrors = false;

    if (name.length < 3 || name.length > 255) {
      formsErrors = true;
      toast.error("nome deve ter entre 3 a 255 caracteres")
    }

    if (!isEmail(email)) {
      formsErrors = true;
      toast.error("e-mail inválido")
    }

    if (password.length < 3 || password.length > 255) {
      formsErrors = true;
      toast.error("senha deve ter entre 3 a 255 caracteres")
    }

    if (cpf.length < 11 || cpf.length > 11) {
      formsErrors = true;
      toast.error("CPF deve ter 11 digítos")
    }

    if (password !== confirmepassword) {
      formsErrors = true;
      toast.error("Senhas não são iguais!")
    }

    if (formsErrors) return;

    try {
      await axios.post("/coordenador/cadastro", {
        name, password, email, cpf, confirmepassword
      })

      toast.success("Coordenador cadastrado com sucesso!");
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
    <Section>
      <h2>Cadastrar novo coordenador</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={name} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" />
        </label>
        <label htmlFor="email">
          E-mail:
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Digite seu e-mail" />
        </label>
        <label htmlFor="password">
          Senha:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <label htmlFor="confirmepassword">
          Confirme sua senha:
          <input type="password" value={confirmepassword} onChange={e => setConfirmarSenha(e.target.value)} />
        </label>
        <label htmlFor="cpf">
          CPF:
          <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Section>
  );
}
