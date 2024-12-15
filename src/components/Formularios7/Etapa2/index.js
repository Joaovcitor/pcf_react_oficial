/* eslint-disable react/prop-types */

import React, { useEffect, useState } from "react";
import { get } from "lodash";

import { Container } from "../../../styles/GlobalStyle";
import {
  Questionnaire,
  Question,
  Label,
  Answers,
  AnswerLabel,
  Area,
  SubmitButton,
} from "./styled";

import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function Etapa1({ id }) {
  const [q1, setQ1] = useState("");
  const [q2, setQ2] = useState("");
  const [q3, setQ3] = useState("");
  const [q4, setQ4] = useState("");
  const [q5, setQ5] = useState("");
  const [q6, setQ6] = useState("");
  const [q7, setQ7] = useState("");
  const [q8, setQ8] = useState("");
  const [q9, setQ9] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case "q1":
        setQ1(value);
        break;
      case "q2":
        setQ2(value);
        break;
      case "q3":
        setQ3(value);
        break;
      case "q4":
        setQ4(value);
        break;
      case "q5":
        setQ5(value);
        break;
      case "q6":
        setQ6(value);
        break;
      case "q7":
        setQ7(value);
        break;
      case "q8":
        setQ8(value);
        break;
      case "q9":
        setQ9(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/form7-etapa2/create", {
        q1,
        q2,
        q3,
        q4,
        q5,
        q6,
        q7,
        q8,
        q9,
        id: id,
      });
      toast.success("Formulário criado com sucesso!");
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
  };
  return (
    <Container>
      <Questionnaire onSubmit={handleSubmit}>
        <Question>
          <Label>
            Reconhece pessoas próximas e chora na frente de estranhos?
          </Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q1"
                value="Consegue fazer sozinho"
                checked={q1 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q1"
                value="Consegue fazer com Ajuda"
                checked={q1 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q1"
                value="Ainda não consegue fazer"
                checked={q1 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Balbucia e sorri na interação com o outro?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q2"
                value="Consegue fazer sozinho"
                checked={q2 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q2"
                value="Consegue fazer com Ajuda"
                checked={q2 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q2"
                value="Ainda não consegue fazer"
                checked={q2 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Sócioafetivo</Area>
        </Question>

        <Question>
          <Label>
            Muda de posição de barriga para baixo para a posição de costas e
            vice-versa?
          </Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q3"
                value="Consegue fazer sozinho"
                checked={q3 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q3"
                value="Consegue fazer com Ajuda"
                checked={q3 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q3"
                value="Ainda não consegue fazer"
                checked={q3 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Agarra brinquedos e os mantém por algum tempo?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q4"
                value="Consegue fazer sozinho"
                checked={q4 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q4"
                value="Consegue fazer com Ajuda"
                checked={q4 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q4"
                value="Ainda não consegue fazer"
                checked={q4 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Senta sem apoio por algum tempo?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q5"
                value="Consegue fazer sozinho"
                checked={q5 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q5"
                value="Consegue fazer com Ajuda"
                checked={q5 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q5"
                value="Ainda não consegue fazer"
                checked={q5 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Reconhece a voz de algumas pessoas?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q6"
                value="Consegue fazer sozinho"
                checked={q6 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q6"
                value="Consegue fazer com Ajuda"
                checked={q6 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q6"
                value="Ainda não consegue fazer"
                checked={q6 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Procura com os olhos objetos à sua frente?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q7"
                value="Consegue fazer sozinho"
                checked={q7 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q7"
                value="Consegue fazer com Ajuda"
                checked={q7 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q7"
                value="Ainda não consegue fazer"
                checked={q7 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Varia o volume de suas vocalizações?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q8"
                value="Consegue fazer sozinho"
                checked={q8 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q8"
                value="Consegue fazer com Ajuda"
                checked={q8 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q8"
                value="Ainda não consegue fazer"
                checked={q8 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Segura e transfere objetos de uma mão para outra?</Label>
          <Answers>
            <AnswerLabel>
              <input
                type="radio"
                name="q9"
                value="Consegue fazer sozinho"
                checked={q9 === "Consegue fazer sozinho"}
                onChange={handleChange}
              />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q9"
                value="Consegue fazer com Ajuda"
                checked={q9 === "Consegue fazer com Ajuda"}
                onChange={handleChange}
              />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input
                type="radio"
                name="q9"
                value="Ainda não consegue fazer"
                checked={q9 === "Ainda não consegue fazer"}
                onChange={handleChange}
              />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>
        <SubmitButton type="submit">Enviar</SubmitButton>
      </Questionnaire>
    </Container>
  );
}
