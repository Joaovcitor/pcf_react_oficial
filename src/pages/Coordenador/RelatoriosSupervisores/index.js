/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import BuscarVisitadores from "../../../components/BuscarVisitadores"

import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import { Form, Div } from "./styled";
import { Section } from "../../Visitador/Criancas/styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function Visitadores({ match }) {
  const { id } = match.params
  const [visitador, setVisitador] = useState([]);
  const [child, setChildrens] = useState([]);
  const [planos, setPlanos] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/detalhes/visitador/${id}`);
      console.log(response.data)
      setVisitador(response.data.visitador);
      setChildrens(response.data.child);
      setPlanos(response.data.planos)
    }

    getData()
  }, [id])

  return (
    <Div>
      <div>
        <h3>Relatórios gerais do <span>{visitador.name}</span></h3>
      </div>
      <div className="dados">
        <nav>
          {child.length < 30 ? <div className="naoBateu">
            <p>Quantidade de beneficiarios: {child.length}</p>
            <p>Não bateu a meta</p>
          </div>
            : <div className="bateu">
              <p>Quantidade de beneficiarios: {child.length}</p>
              <p>Bateu a meta</p>
            </div>}
          <p>Quantidade de planos criados: {planos.length}</p>
        </nav>
      </div>

      {child.length > 0 ?
        child.map(crianca => {
          return (
            <div className="criancas" key={crianca.id}>
              <p>Nome: {crianca.name}</p>
              <p>Idade: {crianca.idade}</p>
              <Link className="links">Editar informações da criança</Link>
              <Link to={`/visitas/${crianca.id}`} className="links">Ver visitas</Link>
            </div>
          )
        })
        : <p>não tem criança</p>}
    </Div>
  );
}
