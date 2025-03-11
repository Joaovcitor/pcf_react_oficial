/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Visitador from "../../../components/BuscarVisitador";
import { toast } from "react-toastify";
import { Section } from "./styled";
import axios from "../../../services/axios";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitador, setVisitadores] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`/visitadores/${id}`);
      setVisitadores(response.data.visitador);
      console.log(response.data);
    }
    getData();
  }, [id]);

  const validarVisitador = async (e) => {
    e.preventDefault();
    try {
      toast.success("Visitador validado!");
      await axios.post(`/coordenador/validar-visitador-do-supervisor/${id}`);
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro ao validar seu visitador!");
    }
  };

  const inativarVisitador = async (e) => {
    e.preventDefault();
    try {
      toast.warning("Visitador desativado!");
      await axios.post(`/coordenador/inativar-visitador/${id}`);
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro ao validar seu visitador!");
    }
  };

  const ativarVisitador = async (e) => {
    e.preventDefault();
    try {
      toast.warning("Visitador ativado!");
      await axios.post(`/coordenador/ativar-visitador/${id}`);
    } catch (e) {
      console.log(e);
      toast.error("Ocorreu um erro ao validar seu visitador!");
    }
  };
  return (
    <Section>
      <div key={visitador.id}>
        <p>Nome: {visitador.name}</p>
        <p>Território: {visitador.territorio}</p>
        <p>CRAS: {visitador.cras}</p>
        {visitador.isPending ? (
          <form onSubmit={validarVisitador} action="POST">
            <button type="submit">Validar visitador</button>
          </form>
        ) : (
          ""
        )}
        {visitador.isActive ? (
          <form onSubmit={inativarVisitador} action="POST">
            <button type="submit">Desativar conta visitador</button>
          </form>
        ) : (
          <form onSubmit={ativarVisitador} action="POST">
            <button type="submit">Ativar conta visitador</button>
          </form>
        )}

        {/* <Link className="links" to={`/visitadores/editar/${visitador.id}`}>
             Editar Informações
           </Link> // vou aguardar o que a prefeitura tem a dizer sobre o que pode ou não ser permitido editar dos visitadores!*/}
      </div>
    </Section>
  );
}
