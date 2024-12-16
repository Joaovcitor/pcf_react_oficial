import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import { Div } from "./styled";
import { toast } from "react-toastify";
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
    setVisitasFeitas(filteredVisitas);
  };

  const planosVisitadores = () => {
    const visitadores = visitador.map((v) => v.id);
    const planosFiltrados = planos.filter((v) =>
      visitadores.includes(v.visitadorId)
    );
    return planosFiltrados.length;
  };

  const criancasVisitadores = () => {
    const visitadores = visitador.map((v) => v.id);
    const criancasFiltradas = childrens.filter((v) =>
      visitadores.includes(v.visitadorId)
    );
    return criancasFiltradas.length;
  };

  const visitasVisitadores = () => {
    const visitadores = visitador.map((v) => v.id);
    const visitasFeitas = visitas.filter(
      (v) => v.visita_marcada_finalizada && visitadores.includes(v.visitadorId)
    );
    return visitasFeitas.length;
  };

  const visitasQuantidadesRealizadas = () => {
    return {
      visitasFeitas: visitas.filter(
        (v) => v.visita_marcada_finalizada === true
      ),
      visitasNaoFinalizadas: visitas.filter(
        (v) => v.visita_marcada_finalizada !== true
      ),
      visitasInvalidas: visitas.filter((v) => v.visita_mentirosa === true),
    };
  };

  const numerosVisitas = visitasQuantidadesRealizadas();

  const handleSearch = (e) => {
    e.preventDefault();
    filterPlanosByDate();
  };

  return (
    <Div>
      <div>
        <h3>Relatório geral</h3>

        {childrens.length < 600 ? (
          <nav className="naoBateu">
            <p>Município não bateu a meta!</p>
            <p>faltam {600 - childrens.length} beneficiários</p>
          </nav>
        ) : (
          <p>Bateu a meta</p>
        )}
      </div>
      <form onSubmit={handleSearch}>
        <label>
          Início do Mês:{""}{" "}
          <input
            type="date"
            value={inicioMes}
            onChange={(e) => setInicioMes(e.target.value)}
          />
        </label>
        <label>
          Fim do Mês:{""}{" "}
          <input
            type="date"
            value={fimMes}
            onChange={(e) => setFimMes(e.target.value)}
          />
        </label>
        <button type="submit">Gerar Relatório</button>
      </form>
      {/* <nav className="naoBateu">
        <p>Avisos:</p>
        <p>{childrens.length * numerosVisitas.visitasFeitas.length}</p>
      </nav> */}
      <GraficoBarras
        visitador={visitador}
        childrens={childrens}
        visitas={visitas}
        visitasInvalidas={numerosVisitas.visitasInvalidas}
        planos={planos}
      />
      <GraficoBarrasCriancas caregiver={caregivers} childrens={childrens} />
      <div className="dados">
        <h2>Visitadores</h2>
        {visitador.map((visi) => {
          return (
            <nav key={visi.id}>
              <p>Nome: {visi.name}</p>
              <p>Quantidade de planos: {planosVisitadores()}</p>
              <p>Quantidade de criancas: {criancasVisitadores()}</p>
              <p>Quantidade de visitas feitas: {visitasVisitadores()}</p>
              <Link to={`/visitadores/detalhes/${visi.id}`}>Detalhes</Link>
            </nav>
          );
        })}
      </div>
    </Div>
  );
}
