import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";

import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import {
  Form,
  StyledCheckbox,
  Div,
  Label,
  RadioInput,
  RadioGroup,
} from "./styled";

// eslint-disable-next-line react/prop-types
export default function Login({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const [name, setNome] = useState("");
  const [nis, setNis] = useState("");
  const [isBpc, setBpc] = useState(false);
  const [sexo, setSexo] = useState("");
  const [born, setDataNascimento] = useState("");
  const [cuidador, setCaregiver] = useState("");

  const handleCheckboxChange = (e) => {
    setBpc(e.target.checked);
  };

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`/cuidador/${id}`);
      setCaregiver(response.data);
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(sexo);

    let formsErrors = false;

    if (name.length < 3 || name.length > 255) {
      formsErrors = true;
      toast.error("nome deve ter entre 3 a 255 caracteres");
    }

    if (formsErrors) return;

    const dataFormatada = new Date(born).toISOString();

    try {
      await axios.post(`/crianca/${id}`, {
        name,
        sexo,
        isBpc,
        born: dataFormatada,
        nis,
        caregiverId: id,
      });

      toast.success("criança criada com sucesso!");
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
    <Div>
      <h2>
        Cadastrar criança do(a) <span>{cuidador.name}</span>
      </h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite o nome do beneficiário"
          />
        </label>
        <label htmlFor="nis">
          NIS:
          <input
            type="text"
            value={nis}
            onChange={(e) => setNis(e.target.value)}
            placeholder="Digite o NIS"
          />
        </label>
        <label htmlFor="">Sexo:</label>
        <RadioGroup>
          <Label>
            <RadioInput
              type="radio"
              name="sexo"
              value="Masculino"
              checked={sexo === "Masculino"}
              onChange={(e) => setSexo(e.target.value)}
            />
            Masculino
          </Label>

          <Label>
            <RadioInput
              type="radio"
              name="sexo"
              value="Feminino"
              checked={sexo === "Feminino"}
              onChange={(e) => setSexo(e.target.value)}
            />
            Feminino
          </Label>
        </RadioGroup>
        <label htmlFor="bpc">
          Criança com BPC:
          <StyledCheckbox
            type="checkbox"
            checked={isBpc}
            onChange={handleCheckboxChange}
          />
        </label>
        <label htmlFor="dataDeNascimento">
          Data de Nascimento*:
          <input
            type="date"
            value={born}
            onChange={(e) => setDataNascimento(e.target.value)}
          />
        </label>
        <button type="submit">Cadastrar</button>
      </Form>
    </Div>
  );
}
