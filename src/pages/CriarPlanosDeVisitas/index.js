import React, { useEffect, useState } from "react";
import { Div, Nav } from "./styled";
import { get } from "lodash";
import axios from "../../services/axios";
import { Link } from "react-router-dom";

export default function PlanosDeVisita() {

  const [childrens, setChildrens] = useState([]);


  useEffect(() => {
    async function getData() {
      const response = await axios.get("/crianca/info/:id");
      console.log(response.data)
      setChildrens(response.data.children)
    }

    getData()
  }, []);

  return (
    <Div>
      <h2>Criar Plano de visita</h2>

      <h3>Plano de visita do: <span></span></h3>
      <p>Quando você vai realizar a visita?</p>
      <input
        type="datetime-local"
        name="dia_a_ser_realizada_a_visita"
        id="dia_a_ser_realizada_a_visita"
      />
      <p>Objetivo:</p>
      <textarea name="objetivo" id="objetivo"></textarea>
      <p>Qual a dificuldade dessa atividade?</p>
      <select name="grau_de_dificuldade_objetivo" id="grau_de_dificuldade_objetivo">
        <option value="Fácil">Fácil</option>
        <option value="Média">Média</option>
        <option value="Dificil">Dificil</option>
      </select>
      <p>Momento 1:</p>
      <textarea name="etapa1" id="etapa1"></textarea>
      <p>Momento 2:</p>
      <textarea name="etapa2" id="etapa2"></textarea>
      <p>Momento 3:</p>
      <textarea name="etapa3" id="etapa3"></textarea>
      <button type="submit">Criar Plano</button>
    </Div>
  );
}
