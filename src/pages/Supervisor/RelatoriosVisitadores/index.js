/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import { Div } from "./styled";
import GraficoBarrasVisitadores from "../../../components/GraficoDeBarraVisitadores";
import RelatoriosDeVisitadoresIndividuais from "../../../utils/relatoriosVisitadores";
import { toast } from "react-toastify";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitador, setVisitador] = useState([]);
  const [child, setChildrens] = useState([]);

  const [user, setUser] = useState([]);

  // states de pesquisa
  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");
  const [planos, setPlanos] = useState([]);
  const [allPlanos, setAllPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);
  const [AllVisitasFeitas, setAllVisitasFeitas] = useState([]);

  async function carregarRelatorios(endPoint) {
    try {
      const dados = await RelatoriosDeVisitadoresIndividuais(`${endPoint}`);
      setVisitador(dados.visitador);
      setChildrens(dados.childrens);
      setAllPlanos(dados.planos);
      setAllVisitasFeitas(dados.visitasFeitas);
    } catch (e) {
      console.log(e);
    }
  }

  switch (user.role) {
    case "coordenador":
      carregarRelatorios(`coordenador/visitador/${id}`);
      break;
    case "supervisor":
      carregarRelatorios(`visitador/${id}`);
      break;
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(``);
        console.log(response.data);
        setUser(response.data.user);
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
    setVisitasFeitas(filteredVisitas);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    filterPlanosByDate();
  };

  return (
    <Div>
      <div>
        <h3>
          Relatórios gerais do <span>{visitador.name}</span>
        </h3>
      </div>
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

        <button type="submit">Gerar relatório</button>
      </form>
      <GraficoBarrasVisitadores
        childrens={child}
        visitas={visitasFeitas}
        planos={planos}
      ></GraficoBarrasVisitadores>
      {child.length > 0 ? (
        child.map((crianca) => (
          <div className="criancas" key={crianca.id}>
            <p>Nome: {crianca.name}</p>
            <p>Idade: {crianca.idade}</p>
            <Link className="links">Editar informações da criança</Link>
            <Link to={`/visitas/${crianca.id}`} className="links">
              Ver visitas
            </Link>
          </div>
        ))
      ) : (
        <p>Não tem criança</p>
      )}

      <div>
        <div className="dados-pesquisados">
          <h3>Planos {planos.length}</h3>
          {planos.length > 0 ? (
            planos.map((plano) => (
              <div className="criancas" key={plano.id}>
                <p>
                  <span>Objetivo:</span> {plano.objetivo}
                </p>
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
