/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";
import axios from "../../../services/axios";

export default function PlanosDeVisitasDaGestante({ match }) {
  const { id } = match.params;
  const [plano, setPlano] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(`/planos/planos-da-gestante/${id}`, {
          params: { page, limit },
        });

        setPlano(response.data.plano.rows);
        setTotalPages(Math.ceil(response.data.plano.count / limit));
      } catch (err) {
        console.error("Erro ao buscar planos:", err);
        setError("Erro ao carregar os planos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, page]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!plano || plano.length === 0) return <p>Nenhum plano encontrado.</p>;

  return (
    <div>
      <h2>Quantidade de planos: {plano.length}</h2>
      <Div>
        {plano.map((planos) => (
          <Section key={planos.id}>
            <p>
              Criado no dia{" "}
              {planos.createdAt
                ? format(new Date(planos.createdAt), "dd/MM/yyyy")
                : "Data inválida"}
            </p>
            <p>Objetivo: {planos.objetivo}</p>
            <p>
              Dificuldade da atividade: {planos.grau_de_dificuldade_objetivo}
            </p>
            <p>Momento 1: {planos.etapa1}</p>
            <p>Momento 2: {planos.etapa2}</p>
            <p>Momento 3: {planos.etapa3}</p>

            <Link className="links" to={`/planos/editar/${planos.id}`}>
              Acessar
            </Link>
          </Section>
        ))}
      </Div>
      <div className="bottoms">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima
        </button>
      </div>

      {/* Controles de Paginação */}
    </div>
  );
}
