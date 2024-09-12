import React, { useState } from "react";
import axios from "../../services/axios";
import history from "../../services/history";

import { toast } from "react-toastify";
import { get } from "lodash"
import { isEmail } from "validator";
import { Container } from "../../styles/GlobalStyle";
import { Form, StyledCheckbox } from "./styled"

// eslint-disable-next-line react/prop-types
export default function Login({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const [name, setNome] = useState('');
  const [nis, setNis] = useState('');
  const [bpc, setBpc] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataDeNascimento, setDataNascimento] = useState('');
  const [cuidador, setCaregiver] = useState('');


  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`/cuidador/showinfos/${id}`);
      setCaregiver(response.data.cuidador);
    }

    getData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    let formsErrors = false;

    if (name.length < 3 || name.length > 255) {
      formsErrors = true;
      toast.error("nome deve ter entre 3 a 255 caracteres")
    }

    if (formsErrors) return;

    try {
      await axios.post(`/crianca/adicionar/${id}`, {
        name, sexo, bpc, dataDeNascimento, nis, caregiverId: id
      })

      toast.success("criança criada com sucesso!");
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
      <h2>Cadastrar criança do(a) {cuidador.name}</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input type="text" value={name} onChange={e => setNome(e.target.value)} placeholder="Digite seu nome" />
        </label>
        <label htmlFor="nis">
          NIS:
          <input type="text" value={nis} onChange={e => setNis(e.target.value)} placeholder="Digite seu e-mail" />
        </label>
        <label htmlFor="">Sexo:</label>
        <select name="grau_de_dificuldade_objetivo" onChange={e => setSexo(e.target.value)} id="grau_de_dificuldade_objetivo">
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
        </select>
        <label htmlFor="bairro">
          Criança com BPC:
          <input type="checkbox" checked={bpc} onChange={e => setBpc(e.target.checked)} />
        </label>
        <label htmlFor="dataDeNascimento">
          Data de Nascimento*:
          <input type="date" value={dataDeNascimento} onChange={e => setDataNascimento(e.target.value)} />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Container>
  );
}
