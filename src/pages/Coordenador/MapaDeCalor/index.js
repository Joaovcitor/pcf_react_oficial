import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  Chip,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  Stack
} from "@mui/material";
import {
  Map as MapIcon,
  LocationOn as LocationOnIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Visibility as VisibilityIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  Analytics as AnalyticsIcon
} from "@mui/icons-material";
import axios from "../../../services/axios";
import Mapa from "../../../components/Mapa";
import VisitasPDFGenerator from "../../../components/VisitasPDFGenerator";
import { toast } from "react-toastify";

export default function MapaDeCalor({ match }) {
  const [visitas, setVisitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState('todas');
  const [filtroData, setFiltroData] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    finalizadas: 0,
    pendentes: 0,
    invalidas: 0
  });

  useEffect(() => {
    fetchVisitas();
  }, []);

  const fetchVisitas = async () => {
    setLoading(true);
    try {
      // Buscar todas as visitas do sistema (coordenador)
      const response = await axios.get('/visitasporgeolo/coordenador/all');
      const visitasData = response.data || [];
      
      setVisitas(visitasData);
      
      // Calcular estatísticas
      const total = visitasData.length;
      const finalizadas = visitasData.filter(v => (v.isFinished === true) || (v.visita_marcada_finalizada === true)).length;
      const pendentes = visitasData.filter(v => (v.isFinished === false) || (v.visita_marcada_finalizada === false) || v.isValidationPending === true).length;
      const invalidas = visitasData.filter(v => (v.visita_mentirosa === true) || (v.isFakeVisit === true)).length;
      
      setStats({ total, finalizadas, pendentes, invalidas });
      
    } catch (error) {
      console.error('Erro ao buscar visitas:', error);
      toast.error('Erro ao carregar dados das visitas');
      setVisitas([]);
    } finally {
      setLoading(false);
    }
  };

  const visitasFiltradas = visitas.filter(visita => {
    // Filtro por status
    const isFinalizada = visita.isFinished === true || visita.visita_marcada_finalizada === true;
    const isPendente = visita.isValidationPending === true || visita.isFinished === false || visita.visita_marcada_finalizada === false;
    const isInvalida = visita.isFakeVisit === true || visita.visita_mentirosa === true;
    if (filtroStatus === 'finalizadas' && !isFinalizada) return false;
    if (filtroStatus === 'pendentes' && !isPendente) return false;
    if (filtroStatus === 'invalidas' && !isInvalida) return false;
    
    // Filtro por data (se especificado)
    if (filtroData) {
      const dataVisita = new Date(visita.scheduledDate || visita.createdAt);
      const dataFiltro = new Date(filtroData);
      if (dataVisita.toDateString() !== dataFiltro.toDateString()) return false;
    }
    
    return true;
  });

  const handleFiltroStatusChange = (event) => {
    setFiltroStatus(event.target.value);
  };

  const handleFiltroDataChange = (event) => {
    setFiltroData(event.target.value);
  };

  const limparFiltros = () => {
    setFiltroStatus('todas');
    setFiltroData('');
  };

  const periodoLabel = (() => {
    if (!filtroData) return 'Período completo (sem filtro)';
    try {
      const d = new Date(filtroData);
      return `Data selecionada: ${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    } catch (e) {
      return `Filtro de data: ${String(filtroData)}`;
    }
  })();

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ ml: 2 }}>
            Carregando mapa de visitas...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link 
          underline="hover" 
          color="inherit" 
          href="/"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Início
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <MapIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Mapa de Visitas
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <MapIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Mapa de Calor - Visitas
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Visualização geográfica de todas as visitas realizadas no sistema
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="primary">
                {stats.total}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Visitas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocationOnIcon sx={{ fontSize: 40, color: 'success.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="success.main">
                {stats.finalizadas}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visitas Finalizadas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocationOnIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="warning.main">
                {stats.pendentes}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visitas Pendentes
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={2}>
            <CardContent sx={{ textAlign: 'center' }}>
              <LocationOnIcon sx={{ fontSize: 40, color: 'error.main', mb: 1 }} />
              <Typography variant="h4" fontWeight="bold" color="error.main">
                {stats.invalidas}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Visitas Inválidas
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Filtros */}
      <Card elevation={2} sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <FilterIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Filtros de Visualização
            </Typography>
          </Box>
          
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel>Status da Visita</InputLabel>
                <Select
                  value={filtroStatus}
                  label="Status da Visita"
                  onChange={handleFiltroStatusChange}
                >
                  <MenuItem value="todas">Todas as Visitas</MenuItem>
                  <MenuItem value="finalizadas">Finalizadas</MenuItem>
                  <MenuItem value="pendentes">Pendentes</MenuItem>
                  <MenuItem value="invalidas">Inválidas</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                size="small"
                type="date"
                label="Filtrar por Data"
                value={filtroData}
                onChange={handleFiltroDataChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  startIcon={<RefreshIcon />}
                  onClick={limparFiltros}
                  size="small"
                >
                  Limpar Filtros
                </Button>
                <Button
                  variant="contained"
                  startIcon={<RefreshIcon />}
                  onClick={fetchVisitas}
                  size="small"
                >
                  Atualizar
                </Button>
                <VisitasPDFGenerator visitas={visitasFiltradas} stats={stats} periodoLabel={periodoLabel} />
              </Stack>
            </Grid>
            
            <Grid item xs={12} sm={6} md={3}>
              <Chip 
                label={`${visitasFiltradas.length} visita${visitasFiltradas.length !== 1 ? 's' : ''} encontrada${visitasFiltradas.length !== 1 ? 's' : ''}`}
                color="primary"
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Mapa */}
      <Card elevation={2}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <MapIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Visualização Geográfica
            </Typography>
          </Box>
          
          {visitasFiltradas.length > 0 ? (
            <Box sx={{ height: '70vh', borderRadius: 2, overflow: 'hidden' }}>
              <Mapa visitas={visitasFiltradas} />
            </Box>
          ) : (
            <Alert severity="info" sx={{ textAlign: 'center' }}>
              <Typography variant="body1">
                Nenhuma visita encontrada com os filtros aplicados.
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Tente ajustar os filtros ou verificar se existem visitas cadastradas no sistema.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Informações adicionais */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Dica:</strong> Use os filtros acima para visualizar diferentes tipos de visitas no mapa. 
          As cores dos marcadores representam o status de cada visita: verde para finalizadas, 
          amarelo para pendentes e vermelho para inválidas.
        </Typography>
      </Alert>
    </Container>
  );
}

MapaDeCalor.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object
  }).isRequired
};
