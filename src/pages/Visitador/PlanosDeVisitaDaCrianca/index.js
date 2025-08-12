/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { Div, Section } from "./styled";
import { Link } from "react-router-dom";
import axios from "../../../services/axios";

// Renomeando o componente para maior clareza
export default function PlanosDaCrianca({ match }) {
  const { id } = match.params; // ID da criança
  const [planos, setPlanos] = useState([]); // O estado agora guarda o array de planos
  const [totalDePlanos, setTotalDePlanos] = useState(0); // Para o total geral
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10; // O backend deve estar alinhado com esse limite

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        const response = await axios.get(`/planos/planos-da-crianca/${id}`, {
          params: { page, pageSize: limit },
        });

        setPlanos(response.data.data);
        setTotalPages(response.data.meta.totalPages);
        setTotalDePlanos(response.data.meta.total);
      } catch (err) {
        console.error("Erro ao buscar planos:", err);
        setError("Erro ao carregar os planos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, page]); // A dependência 'limit' não é necessária pois é uma constante

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!planos || planos.length === 0)
    return <p>Nenhum plano encontrado para esta criança.</p>;

  return (
    <div>
      {/* Usando o total geral que vem do backend */}
      <h2>Total de planos: {totalDePlanos}</h2>
      <Div>
        {planos.map((plano) => (
          <Section key={plano.id}>
            <p>
              Criado no dia{" "}
              {plano.createdAt
                ? format(new Date(plano.createdAt), "dd/MM/yyyy")
                : "Data inválida"}
            </p>
            <p>Objetivo: {plano.objective}</p>
            <p>
              Dificuldade da atividade: {plano.grau_de_dificuldade_objetivo}
            </p>
            <Link className="links" to={`/planos/editar/${plano.id}`}>
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
    </div>
  );
}
