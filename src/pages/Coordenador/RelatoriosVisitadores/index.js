import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import { Div } from "./styled";
import GraficoBarras from "../../../components/GraficoDeBarra";
import GraficoBarrasCriancas from "../../../components/GraficoDeBarraCriancas";

export default function Visitadores() {
  const [visitador, setVisitador] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  // states de pesquisa
  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");
  const [planos, setPlanos] = useState([]);
  const [allPlanos, setAllPlanos] = useState([]);
  const [visitas, setVisitasFeitas] = useState([]);
  const [AllVisitasFeitas, setAllVisitasFeitas] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/detalhes/relatorio-geral`);
        console.log(response.data)
        setVisitador(response.data.visitador);
        setChildrens(response.data.childrens);
        setCaregivers(response.data.caregivers);
        setAllPlanos(response.data.planos);
        setAllVisitasFeitas(response.data.visitas);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    getData();
  }, []);

  const filterPlanosByDate = () => {
    const filteredPlanos = allPlanos.filter((plano) => {
      const createdAt = new Date(plano.createdAt);
      const startDate = new Date(inicioMes);
      const endDate = new Date(fimMes);

      return createdAt >= startDate && createdAt <= endDate;
    });

    const filteredVisitas = AllVisitasFeitas.filter((visita) => {
      const createdAt = new Date(visita.createdAt);
      const startDate = new Date(inicioMes);
      const endDate = new Date(fimMes);

      return createdAt >= startDate && createdAt <= endDate;
    });

    setPlanos(filteredPlanos);
    setVisitasFeitas(filteredVisitas)
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterPlanosByDate();
  };

  return (
    <Div>
      <div>
        <h3>Relatório geral</h3>
      </div>
      <form onSubmit={handleSearch}>
        <label>Início do Mês:{""} <input
          type="date"
          value={inicioMes}
          onChange={(e) => setInicioMes(e.target.value)}
        /></label>
        <label>Fim do Mês:{""} <input
          type="date"
          value={fimMes}
          onChange={(e) => setFimMes(e.target.value)}
        /></label>
        <button type="submit">Gerar Relatório</button>
      </form>
      <GraficoBarras
        visitador={visitador}
        childrens={childrens}
        visitas={visitas}
        planos={planos}
      />
      <GraficoBarrasCriancas
        caregiver={caregivers}
        childrens={childrens}
      />
    </Div>
  );
}
