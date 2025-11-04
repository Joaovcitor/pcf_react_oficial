/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { 
  Container, 
  Header, 
  Div, 
  Section, 
  PaginationContainer, 
  LoadingContainer, 
  ErrorContainer, 
  EmptyContainer 
} from "./styled";
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
        console.log(response.data);
        setPlano(response.data.data);
        setTotalPages(Math.ceil(response.data.meta.total / limit));
      } catch (err) {
        console.error("Erro ao buscar planos:", err);
        setError("Erro ao carregar os planos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, page]);

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <div className="spinner"></div>
          <p>Carregando planos da gestante...</p>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorContainer>
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </ErrorContainer>
      </Container>
    );
  }

  if (!plano || plano.length === 0) {
    return (
      <Container>
        <EmptyContainer>
          <div className="empty-icon">📋</div>
          <p>Nenhum plano de visita encontrado para esta gestante.</p>
        </EmptyContainer>
      </Container>
    );
  }

  return (
    <Container>
      <Header>
        <h1>Planos de Visita da Gestante</h1>
        <p className="subtitle">Acompanhe o desenvolvimento e cuidados especiais</p>
        <div className="count-badge">
          {plano.length} {plano.length === 1 ? 'plano encontrado' : 'planos encontrados'}
        </div>
      </Header>

      <Div>
        {plano.map((planos) => (
          <Section key={planos.id}>
            <div className="plan-header">
              <div className="plan-icon">🤰</div>
              <div className="plan-date">
                {planos.createdAt
                  ? format(new Date(planos.createdAt), "dd/MM/yyyy")
                  : "Data inválida"}
              </div>
            </div>

            <div className="plan-content">
              <div className="objective">
                <div className="label">Objetivo</div>
                <div className="text">{planos.objetivo || planos.objective}</div>
              </div>

              <div className="difficulty">
                <div className="label">Nível de Dificuldade</div>
                <div className="text">{planos.grau_de_dificuldade_objetivo}</div>
              </div>

              <div className="moments">
                <div className="moment">
                  <div className="label">Momento 1</div>
                  <div className="text">{planos.etapa1}</div>
                </div>

                <div className="moment">
                  <div className="label">Momento 2</div>
                  <div className="text">{planos.etapa2}</div>
                </div>

                <div className="moment">
                  <div className="label">Momento 3</div>
                  <div className="text">{planos.etapa3}</div>
                </div>
              </div>
            </div>

            <div className="plan-actions">
              <Link to={`/planos/editar/${planos.id}`}>
                Visualizar Detalhes
              </Link>
            </div>
          </Section>
        ))}
      </Div>

      <PaginationContainer>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          ← Anterior
        </button>
        <div className="page-info">
          Página {page} de {totalPages}
        </div>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
        >
          Próxima →
        </button>
      </PaginationContainer>
    </Container>
  );
}
