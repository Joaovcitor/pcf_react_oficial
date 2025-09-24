import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import BadgeIcon from '@mui/icons-material/Badge';
import axios from '../../../services/axios';
import { Container, InfoCard, InfoItem, InfoLabel, InfoValue, LoadingContainer } from './styled';

export default function DetalhesCrianca() {
  const { id } = useParams();
  const history = useHistory();
  const [crianca, setCrianca] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const carregarDadosCrianca = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/crianca/${id}`);
        setCrianca(response.data);
        setError('');
      } catch (err) {
        console.error('Erro ao carregar dados da criança:', err);
        setError('Erro ao carregar os dados da criança. Tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      carregarDadosCrianca();
    }
  }, [id]);

  const formatarData = (data) => {
    if (!data) return 'Não informado';
    try {
      const date = new Date(data);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return data;
    }
  };

  const formatarNIS = (nis) => {
    if (!nis) return 'Não informado';
    // Remove caracteres não numéricos
    const apenasNumeros = nis.replace(/\D/g, '');
    // Aplica a máscara XXX.XXXXX.XX-X
    if (apenasNumeros.length === 11) {
      return apenasNumeros.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3-$4');
    }
    return nis;
  };

  const handleEditar = () => {
    history.push(`/crianca/editar/${id}`);
  };

  const handleVoltar = () => {
    history.goBack();
  };

  if (loading) {
    return (
      <Container>
        <LoadingContainer>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Carregando dados da criança...
          </Typography>
        </LoadingContainer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
        >
          Voltar
        </Button>
      </Container>
    );
  }

  if (!crianca) {
    return (
      <Container>
        <Alert severity="warning" sx={{ mb: 2 }}>
          Criança não encontrada.
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
        >
          Voltar
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleVoltar}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Detalhes da Criança
        </Typography>
      </Box>

      <InfoCard>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <PersonIcon sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography variant="h5" component="h2">
              {crianca.name || 'Nome não informado'}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <InfoItem>
              <InfoLabel>
                <PersonIcon sx={{ mr: 1, fontSize: 20 }} />
                Nome:
              </InfoLabel>
              <InfoValue>{crianca.name || 'Não informado'}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>
                <BadgeIcon sx={{ mr: 1, fontSize: 20 }} />
                NIS:
              </InfoLabel>
              <InfoValue>{formatarNIS(crianca.nis)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>
                <CalendarTodayIcon sx={{ mr: 1, fontSize: 20 }} />
                Data de Nascimento:
              </InfoLabel>
              <InfoValue>{formatarData(crianca.born)}</InfoValue>
            </InfoItem>
          </Box>
        </CardContent>

        <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={handleEditar}
            color="primary"
          >
            Editar
          </Button>
        </CardActions>
      </InfoCard>
    </Container>
  );
}