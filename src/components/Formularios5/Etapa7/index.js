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
          <Label>Compreende grande parte do que escuta?</Label>
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
          <Label>Fala frases com quatro ou mais palavras?</Label>
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
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Imita atitude simples dos adultos?</Label>
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
          <Label>Corre com segurança?</Label>
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
            Pula com os dois pés juntos e/ou fica em um pé só?
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
          <Label>Seleciona objetos semelhantes por cor e forma?</Label>
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

        <Question>
          <Label>
            Constrói torres ou pontes com mais de três elementos?
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
          <Label>Faz rabisco e risco no papel?</Label>
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
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Reconhece e reage à voz da mãe/cuidador?</Label>
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
