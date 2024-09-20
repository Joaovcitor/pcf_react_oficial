import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";

import { toast } from "react-toastify";
import { get } from "lodash"
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import { Form } from "./styled"

export default function Login() {
  const [name, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [rg, setRg] = useState('');
  const [cpf, setCpf] = useState('');
  const [bairro, setBairro] = useState('');
  const [contato, setContato] = useState('');
  const [dataDeNascimento, setDataNascimento] = useState('');
  const [gestante, setGestante] = useState('');


  async function handleSubmit(e) {
    e.preventDefault();

    let formsErrors = false;

    if (name.length < 3 || name.length > 255) {
      formsErrors = true;
      toast.error("nome deve ter entre 3 a 255 caracteres")
    }

    if (cpf.length < 11 || cpf.length > 11) {
      formsErrors = true;
      toast.error("CPF deve ter 11 digítos")
    }

    if (formsErrors) return;

    try {
      await axios.post("/coordenador/cadastro", {
        name, endereco, rg, cpf, bairro, contato, gestante, dataDeNascimento
      })

      toast.success("Cuidador criado com sucesso!");
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
    <Container>
      <h2>Cadastrar novo Coordenador</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={name} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" />
        </label>
        <label htmlFor="cpf">
          CPF*:
          <input type="text" value={cpf} onChange={e => setCpf(e.target.value)} placeholder="Digite seu e-mail" />
        </label>
        <label htmlFor="rg">
          RG:
          <input type="tex" value={rg} onChange={e => setRg(e.target.value)} />
        </label>
        <label htmlFor="endereco">
          Endereço*:
          <input type="password" value={endereco} onChange={e => setEndereco(e.target.value)} />
        </label>
        <label htmlFor="bairro">
          Bairro*:
          <input type="text" value={bairro} onChange={e => setBairro(e.target.value)} />
        </label>
        <label htmlFor="contato">
          Contato:
          <input type="text" value={contato} onChange={e => setContato(e.target.value)} />
        </label>
        <label htmlFor="dataDeNascimento">
          Data de Nascimento*:
          <input type="date" value={dataDeNascimento} onChange={e => setDataNascimento(e.target.value)} />
        </label>
        <label htmlFor="gestante">
          Gestante:
          <input type="checkbox" value={gestante} onChange={e => setGestante(e.target.value)} />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
