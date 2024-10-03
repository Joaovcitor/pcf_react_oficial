import React from "react";
import { Container } from "../../../styles/GlobalStyle";

export default function Etapa1() {
  return (
    <Container>
      <div className="questionnaire">
        <div className="question">
          <label>Dá mostras de prazer e desconforto?</label>
          <div className="answers">
            <label><input type="radio" name="q1" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q1" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q1" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Comunicação e linguagem</div>
        </div>
        <div className="question">
          <label>Sorri frente ao rosto de uma pessoa?</label>
          <div className="answers">
            <label><input type="radio" name="q2" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q2" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q2" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Sócioafetivo</div>
        </div>
        <div className="question">
          <label>Emite sons como forma de comunicação?</label>
          <div className="answers">
            <label><input type="radio" name="q3" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q3" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q3" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Comunicação e linguagem</div>
        </div>
        <div className="question">
          <label>Mantém firme a cabeça, quando levantada</label>
          <div className="answers">
            <label><input type="radio" name="q4" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q4" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q4" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Motora</div>
        </div>
        <div className="question">
          <label>Colocado de bruços, levanta a cabeça e parte do tronco momentaneamente?</label>
          <div className="answers">
            <label><input type="radio" name="q5" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q5" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q5" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Motora</div>
        </div>
        <div className="question">
          <label>Agarra casualmente objetos colocados ao seu alcance?</label>
          <div className="answers">
            <label><input type="radio" name="q6" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q6" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q6" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Motora</div>
        </div>
        <div className="question">
          <label>Fixa seu olhar durante alguns segundos no rosto das pessoas ou nos objetos?</label>
          <div className="answers">
            <label><input type="radio" name="q7" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q7" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q7" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Cognitiva</div>
        </div>
        <div className="question">
          <label> Segue com seu olhar pessoas ou objetos em movimento?</label>
          <div className="answers">
            <label><input type="radio" name="q8" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q8" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q8" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Cognitiva</div>
        </div>
        <div className="question">
          <label>Reconhece e reage à voz da mãe/cuidador?</label>
          <div className="answers">
            <label><input type="radio" name="q9" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q9" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q9" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Cognitiva</div>
        </div>
        <div className="question">
          <label>Segura e transfere objetos de uma mão para outra?</label>
          <div className="answers">
            <label><input type="radio" name="q10" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q10" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q10" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Socioafetiva</div>
        </div>
        <div className="question">
          <label>Segura e transfere objetos de uma mão para outra?</label>
          <div className="answers">
            <label><input type="radio" name="q11" value="Consegue fazer sozinho" /> Consegue fazer sozinho</label>
            <label><input type="radio" name="q11" value="Consegue fazer com Ajuda" /> Consegue fazer com Ajuda</label>
            <label><input type="radio" name="q11" value="Ainda não consegue fazer" /> Ainda não consegue fazer</label>
          </div>
          <div className="area">Socioafetiva</div>
        </div>
      </div>
      <button type="submit">Enviar</button>
    </Container>
  );
}
