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
          <Label>Sobe e desce degraus baixos?</Label>
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
          <Label>Monta uma torre com no mínimo três elementos?</Label>
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
          <Area>Cognitiva</Area>
        </Question>

        <Question>
          <Label>Tampa e destampa frasco com rosca?</Label>
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
          <Label>Fala frases com três palavras?</Label>
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
            Nomeia alguns objetos cotidianos?
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
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>Começa a utilizar pronomes (ex: meu, teu)</Label>
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
          <Area>Comunicação e linguagem</Area>
        </Question>

        <Question>
          <Label>
            Segura um brinquedo enquanto caminha?
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
          <Area>Motora</Area>
        </Question>

        <Question>
          <Label>Come, segurando o talher com a própria mão?</Label>
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
          <Area>Sociafetiva</Area>
        </Question>

        <Question>
          <Label>Cumpre simultaneamente até três ordens simples?</Label>
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
