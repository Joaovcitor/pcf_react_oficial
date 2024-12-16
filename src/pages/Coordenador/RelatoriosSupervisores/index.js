/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import BuscarVisitadores from "../../../components/BuscarVisitadores";

import { toast } from "react-toastify";
import { get } from "lodash";
import { isEmail } from "validator";
import { Container } from "../../../styles/GlobalStyle";
import { Form, Div } from "./styled";
import { Section } from "../../Visitador/Criancas/styled";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function RelatoriosSupervisores({ match }) {
  const { id } = match.params;
  const [contador, setContador] = useState(0);
  const [visitador, setVisitador] = useState([]);
  const [supervisor, setSupervisor] = useState([]);
  const [child, setChildrens] = useState([]);
  const [caregivers, setCaregivers] = useState([]);

  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");
  const [planos, setPlanos] = useState([]);
  const [allPlanos, setAllPlanos] = useState([]);
  const [visitas, setVisitasFeitas] = useState([]);
  const [AllVisitasFeitas, setAllVisitasFeitas] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/supervisor/info/${id}`);
      setSupervisor(response.data.supervisores);
      setChildrens(response.data.child);
      setPlanos(response.data.planos);
    }

    getData();
  }, [id]);

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

  const visitadoresComIdDoSupervisor = Array.isArray(visitador)
    ? visitador.filter((v) => v.supervisorId === Number(id))
    : [];

  const quantidadeGeralDeCriancasDoSupervisor = Array.isArray(child)
    ? child.filter((c) =>
        visitadoresComIdDoSupervisor.some((v) => c.visitadorId === v.id)
      )
    : [];

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
          Relatórios gerais do <span>{supervisor.name}</span>
        </h3>
      </div>
      <div className="dados">
        <nav>
          {quantidadeGeralDeCriancasDoSupervisor.length < 30 ? (
            <div className="naoBateu">
              <p>
                Quantidade de beneficiários:{" "}
                {quantidadeGeralDeCriancasDoSupervisor.length}
              </p>
              <p>Não bateu a meta</p>
            </div>
          ) : (
            <div className="bateu">
              <p>
                Quantidade de beneficiarios:{" "}
                {quantidadeGeralDeCriancasDoSupervisor.length}
              </p>
              <p>Bateu a meta</p>
            </div>
          )}
          {/* <p className="naoBateu">
            Quantidade de planos criados desde o começo: {allPlanos.length}
          </p> */}
        </nav>
      </div>

      {visitadoresComIdDoSupervisor.length > 0 ? (
        visitadoresComIdDoSupervisor.map((visitador) => {
          return (
            <div className="criancas" key={visitador.id}>
              <p>Nome: {visitador.name}</p>
              <p>CRAS: {visitador.cras}</p>
              <p>Situação: {visitador.isActive ? "Ativo" : "Inativo"}</p>
              {/* <Link className="links">Editar</Link> */}
              <Link
                className="links"
                to={`/visitadores/detalhes/${visitador.id}`}
              >
                Detalhes
              </Link>
            </div>
          );
        })
      ) : (
        <p>não tem visitadores</p>
      )}
    </Div>
  );
}
