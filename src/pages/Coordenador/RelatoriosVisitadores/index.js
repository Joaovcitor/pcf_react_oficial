import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

import { PainelResumo, CardResumo, Div } from "./styled";

import {
  FaUsers,
  FaChild,
  FaClipboardList,
  FaMapMarkedAlt,
  FaUserShield,
} from "react-icons/fa";

export default function Visitadores() {
  const [visitadores, setVisitadores] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  // states para filtro por data
  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");

  const fetchData = useCallback(async (params = {}) => {
    try {
      const response = await axios.get(`/users/`, { params });

      if (!Array.isArray(response.data)) {
        toast.error("Formato inesperado de dados recebidos da API.");
        return;
      }

      const data = response.data;
      setVisitadores(data);

      const allChildren = data.flatMap((v) => v.children || []);
      const allPlanos = data.flatMap((v) => v.planosDeVisitas || []);
      const allVisitas = data.flatMap((v) => v.visitasPorGeolocalizacao || []);
      const allCaregivers = data.flatMap((v) => v.visitorCaregivers || []);

      setChildrens(allChildren);
      setPlanos(allPlanos);
      setVisitasFeitas(allVisitas);
      setCaregivers(allCaregivers);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar os dados.");
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inicioMes && fimMes) {
      fetchData({ startDate: inicioMes, endDate: fimMes });
    } else {
      toast.warning("Por favor, selecione as duas datas.");
    }
  };

  const cards = [
    {
      id: 1,
      title: "Total de Usuários no Sistema",
      icon: <FaUsers />,
      value: visitadores.length,
      color: "#1e88e5",
    },
    {
      id: 2,
      title: "Total de Crianças",
      icon: <FaChild />,
      value: childrens.length,
      color: "#43a047",
    },
    {
      id: 3,
      title: "Total de Planos",
      icon: <FaClipboardList />,
      value: planos.length,
      color: "#fbc02d",
    },
    {
      id: 4,
      title: "Total de Visitas Feitas",
      icon: <FaMapMarkedAlt />,
      value: visitasFeitas.length,
      color: "#e64a19",
    },
    {
      id: 5,
      title: "Total de Cuidadores",
      icon: <FaUserShield />,
      value: caregivers.length,
      color: "#6a1b9a",
    },
  ];

  return (
    <Div>
      <h3>Relatório Geral</h3>

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

      {childrens.length < 600 ? (
        <nav className="naoBateu">
          <p>Município não bateu a meta!</p>
          <p>Faltam {600 - childrens.length} beneficiários</p>
        </nav>
      ) : (
        <p className="bateu">Bateu a meta</p>
      )}

      <PainelResumo>
        {cards.map(({ id, title, icon, value, color }) => (
          <CardResumo key={id} color={color}>
            {React.cloneElement(icon, { color })}
            <h5>{title}</h5>
            <p>{value}</p>
          </CardResumo>
        ))}
      </PainelResumo>
    </Div>
  );
}
