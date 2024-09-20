/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";

import axios from "../../../services/axios";

export default function Login({ match }) {
  const { id } = match.params;

  const [plano, setPlano] = useState([]);
  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/planos/infoallplanos/${id}`);
      console.log(response.data)
      setPlano(response.data.plano);
    }
    getData();
  }, [])

  return (
    <div>
      <h2>Quantidade de planos: {plano.length}</h2>
      <Div>
        {plano.map(planos => (
          <Section key={planos.id}>
            <p>Criado no dia {planos.createdAt}</p>
            <p>Objetivo: {planos.objetivo}</p>
            <p>Dificuldade da atividade: {planos.grau_de_dificuldade_objetivo}</p>
            <p>Momento 1: {planos.etapa1}</p>
            <p>Momento 2: {planos.etapa2}</p>
            <p>Momento 3: {planos.etapa3}</p>

            <Link className="links" to={`/planos/editar/${planos.id}`}>Acessar</Link>
          </Section>
        ))}
      </Div>
    </div>
  );
}
