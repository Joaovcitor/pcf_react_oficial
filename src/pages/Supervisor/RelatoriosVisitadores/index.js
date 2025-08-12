/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

import {
  Div,
  PainelResumo,
  CardResumo,
  CriancasContainer,
  CriancaCard,
} from "./styled";

import { FaChild, FaClipboardList, FaMapMarkedAlt } from "react-icons/fa";

export default function Visitadores({ match }) {
  const { id } = match.params;

  const [visitador, setVisitador] = useState(null);
  const [childrens, setChildrens] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);

  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");

  const fetchData = useCallback(
    async (params = {}) => {
      try {
        const response = await axios.get(`/users/${id}`, { params });
        setVisitador(response.data);
        setChildrens(response.data.children || []);
        setPlanos(response.data.planosDeVisitas || []);
        setVisitasFeitas(response.data.visitasFeitas || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inicioMes && fimMes) {
      fetchData({ startDate: inicioMes, endDate: fimMes });
    } else {
      alert("Por favor, selecione as duas datas.");
    }
  };

  if (!visitador) return <p>Carregando...</p>;

  const cards = [
    {
      id: 2,
      title: "Crianças",
      icon: <FaChild />,
      value: childrens.length,
      color: "#43a047",
    },
    {
      id: 3,
      title: "Planos",
      icon: <FaClipboardList />,
      value: planos.length,
      color: "#fbc02d",
    },
    {
      id: 4,
      title: "Visitas Feitas",
      icon: <FaMapMarkedAlt />,
      value: visitasFeitas.length,
      color: "#e64a19",
    },
  ];

  return (
    <Div>
      <h3>
        Relatórios gerais do <span>{visitador.name}</span>
      </h3>

      <form onSubmit={handleSearch}>
        <label>
          Início do Mês:{" "}
          <input
            type="date"
            value={inicioMes}
            onChange={(e) => setInicioMes(e.target.value)}
          />
        </label>
        <label>
          Fim do Mês:{" "}
          <input
            type="date"
            value={fimMes}
            onChange={(e) => setFimMes(e.target.value)}
          />
        </label>
        <button type="submit">Gerar Relatório</button>
      </form>

      <PainelResumo>
        {cards.map(({ id, title, icon, value, color }) => (
          <CardResumo key={id} color={color}>
            {React.cloneElement(icon, { color })}
            <h5>{title}</h5>
            <p>{value}</p>
          </CardResumo>
        ))}
      </PainelResumo>

      <CriancasContainer>
        <h3>Crianças ({childrens.length})</h3>
        {childrens.length > 0 ? (
          childrens.map((crianca) => (
            <CriancaCard key={crianca.id}>
              <p>
                <strong>Nome:</strong> {crianca.name}
              </p>
              <p>
                <strong>Idade:</strong> {crianca.idade}
              </p>
              <div className="links">
                <Link to={`/crianca/editar/${crianca.id}`}>
                  Editar informações
                </Link>
                <Link to={`/visitas/${crianca.id}`}>Ver visitas</Link>
              </div>
            </CriancaCard>
          ))
        ) : (
          <p>Não tem criança cadastrada.</p>
        )}
      </CriancasContainer>

      {/* <PlanosContainer>
        <h3>Planos ({planos.length})</h3>
        {planos.length > 0 ? (
          planos.map((plano) => (
            <PlanoItem key={plano.id}>
              <p>
                <strong>Objetivo:</strong> {plano.objetivo}
              </p>
              <p>Momento 1: {plano.etapa1}</p>
              <p>Momento 2: {plano.etapa2}</p>
              <p>Momento 3: {plano.etapa3}</p>
            </PlanoItem>
          ))
        ) : (
          <p>Nenhum plano encontrado.</p>
        )}
      </PlanosContainer> */}
    </Div>
  );
}
