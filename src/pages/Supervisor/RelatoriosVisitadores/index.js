/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import { Div } from "./styled";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitador, setVisitador] = useState([]);
  const [child, setChildrens] = useState([]);

  // states de pesquisa
  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");
  const [planos, setPlanos] = useState([]);
  const [allPlanos, setAllPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);
  const [AllVisitasFeitas, setAllVisitasFeitas] = useState([]);


  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(`/detalhes/visitador/${id}`);
        setVisitador(response.data.visitador);
        setChildrens(response.data.child);
        setAllPlanos(response.data.planos);
        setAllVisitasFeitas(response.data.visitasFeitas);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    }

    getData();
  }, [id]);

  // Função para filtrar planos com base nas datas
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
        <h3>Relatórios gerais do <span>{visitador.name}</span></h3>
      </div>
      <div className="dados">
        <nav>
          {child.length < 30 ? (
            <div className="naoBateu">
              <p>Quantidade de beneficiários: {child.length}</p>
              <p>Não bateu a meta</p>
            </div>
          ) : (
            <div className="bateu">
              <p>Quantidade de beneficiários: {child.length}</p>
              <p>Bateu a meta</p>
            </div>
          )}
          <p>Quantidade de planos criados: {planos.length}</p>
          <p>Visitas Feitas: {visitasFeitas.length}</p>
        </nav>
      </div>

      {child.length > 0 ? (
        child.map(crianca => (
          <div className="criancas" key={crianca.id}>
            <p>Nome: {crianca.name}</p>
            <p>Idade: {crianca.idade}</p>
            <Link className="links">Editar informações da criança</Link>
            <Link to={`/visitas/${crianca.id}`} className="links">Ver visitas</Link>
          </div>
        ))
      ) : (
        <p>Não tem criança</p>
      )}

      <div>
        <form onSubmit={handleSearch}>
          <label>Início do Mês:</label>
          <input
            type="date"
            value={inicioMes}
            onChange={(e) => setInicioMes(e.target.value)}
          />

          <label>Fim do Mês:</label>
          <input
            type="date"
            value={fimMes}
            onChange={(e) => setFimMes(e.target.value)}
          />

          <button type="submit">Pesquisar Planos</button>
        </form>
        <div className="dados-pesquisados">
          <h3>Planos</h3>
          {planos.length > 0 ? (
            planos.map((plano) => (
              <div className="criancas" key={plano.id}>
                <p><span>Objetivo:</span> {plano.objetivo}</p>
                <p>Momento 1: {plano.etapa1}</p>
                <p>Momento 2: {plano.etapa2}</p>
                <p>Momento 3: {plano.etapa3}</p>
              </div>
            ))
          ) : (
            <li>Nenhum plano encontrado.</li>
          )}
        </div>
      </div>
    </Div>
  );
}
