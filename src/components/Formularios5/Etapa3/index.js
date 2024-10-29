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
          <Label>Começa a se arrastar e/ou engatinhar?</Label>
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
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Senta e mantém o equilíbrio?</Label>
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
          <Area>Sócioafetivo</Area>
        </Question>

        <Question>
          <Label>Agarra pequenos objetos com dois dedos?</Label>
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
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Coloca e tira objetos de diferentes tamanhos em uma caixa ou recipiente de boca larga?</Label>
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
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>
            Procura objetos que lhe chamam a atenção quando alguém os esconde propositadamente?
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
          <Label>Brinca de atirar e buscar objetos?</Label>
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
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>
            Emite sons e imita outros que ouve?
          </Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q7" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q7" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q7" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Presta atenção quando ouve o seu nome?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q8" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q8" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q8" value="Ainda não consegue fazer" />{" "}
              Ainda não consegue fazer
            </AnswerLabel>
          </Answers>
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Segura e transfere objetos de uma mão para outra?</Label>
          <Answers>
            <AnswerLabel>
              <input type="radio" name="q9" value="Consegue fazer sozinho" />{" "}
              Consegue fazer sozinho
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q9" value="Consegue fazer com Ajuda" />{" "}
              Consegue fazer com Ajuda
            </AnswerLabel>
            <AnswerLabel>
              <input type="radio" name="q9" value="Ainda não consegue fazer" />{" "}
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
