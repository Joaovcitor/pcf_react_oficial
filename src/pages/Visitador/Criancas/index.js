import React, { useState, useEffect } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";
import { 
  Container, 
  Header, 
  Title, 
  Subtitle,
  ServicesGrid, 
  ServiceCard, 
  ServiceIcon,
  ServiceTitle,
  ServiceDescription,
  AccessButton,
  LoadingContainer,
  LoadingSpinner
} from "./styled";

// eslint-disable-next-line react/prop-types
export default function Criancas({ match }) {
  const [child, setChildren] = useState({});
  const [loading, setLoading] = useState(true);
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(`/crianca/${id}`);
        console.log(response.data);
        setChildren(response.data);
      } catch (error) {
        console.error("Erro ao carregar dados da criança:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  const services = [
    {
      id: 'formularios5',
      title: 'Formulários 5',
      description: 'Formulários de desenvolvimento para crianças de 0 a 5 anos',
      icon: '📋',
      link: `/formularios5/${child.id}`,
      color: '#4CAF50'
    },
    {
      id: 'formularios7',
      title: 'Formulários 7',
      description: 'Formulários de desenvolvimento para crianças de 5 a 7 anos',
      icon: '📝',
      link: `/formularios7/${child.id}`,
      color: '#2196F3'
    },
    {
      id: 'planos',
      title: 'Planos de Visita',
      description: 'Planejamento e acompanhamento das visitas domiciliares',
      icon: '📅',
      link: `/planos/planos-do-beneficiario/${child.id}`,
      color: '#FF9800'
    },
    {
      id: 'tabelas',
      title: 'Tabela de Visita',
      description: 'Registro e controle das visitas realizadas',
      icon: '📊',
      link: `/tabelas/criar/${child.id}`,
      color: '#9C27B0'
    }
  ];

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingSpinner />
        <p>Carregando informações...</p>
      </LoadingContainer>
    );
  }

  return (
    <Container>
      <Header>
        <Title>Formulários e Serviços</Title>
        <Subtitle>
          {child.name ? `Criança: ${child.name}` : 'Carregando informações...'}
        </Subtitle>
      </Header>

      <ServicesGrid>
        {services.map((service) => (
          <ServiceCard key={service.id} color={service.color}>
            <ServiceIcon>{service.icon}</ServiceIcon>
            <ServiceTitle>{service.title}</ServiceTitle>
            <ServiceDescription>{service.description}</ServiceDescription>
            <AccessButton 
              as={Link} 
              to={service.link}
              color={service.color}
            >
              Acessar Serviço
            </AccessButton>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </Container>
  );
}
