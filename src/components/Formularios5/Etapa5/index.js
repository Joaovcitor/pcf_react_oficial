import React from "react";
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

export default function Etapa1() {
  return (
    <Container>
      <Questionnaire>
        <Question>
          <Label>Caminha com equilíbrio?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q1" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q1" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q1" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Chuta uma bola?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q2" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q2" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q2" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Tampa e destampa caixas?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q3" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q3" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q3" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Combina pelo menos duas palavras?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q4" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q4" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q4" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>
            Bebe segurando o copo com a própria mão?
          </Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q5" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q5" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q5" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Monta uma torre com dois elementos?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q6" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q6" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q6" value="Ainda não consegue fazer" />{" "}
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
