import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Chip,
  Avatar,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Divider,
  IconButton,
  Tooltip
} from "@mui/material";

import {
  People as PeopleIcon,
  ChildCare as ChildCareIcon,
  Assignment as AssignmentIcon,
  LocationOn as LocationOnIcon,
  Security as SecurityIcon,
  DateRange as DateRangeIcon,
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Home as HomeIcon,
  Refresh as RefreshIcon
} from "@mui/icons-material";

export default function Visitadores() {
  const [visitadores, setVisitadores] = useState([]);
  const [childrens, setChildrens] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(false);

  // states para filtro por data
  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");

  const fetchData = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(`/users/`, { params });
      console.log(response.data);
      if (!Array.isArray(response.data)) {
        toast.error("Formato inesperado de dados recebidos da API.");
        return;
      }

      const data = response.data;
      setVisitadores(data);

      const allChildren = data.flatMap((v) => v.children || []);
      const allPlanos = data.flatMap((v) => v.planosDeVisitas || []);
      const allVisitas = data.flatMap((v) => v.visitasPorGeolocalizacao || []);
      const allCaregivers = data.flatMap((v) => v.visitorCaregivers || []);

      setChildrens(allChildren);
      setPlanos(allPlanos);
      setVisitasFeitas(allVisitas);
      setCaregivers(allCaregivers);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      toast.error("Erro ao carregar os dados.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inicioMes && fimMes) {
      fetchData({ startDate: inicioMes, endDate: fimMes });
    } else {
      toast.warning("Por favor, selecione as duas datas.");
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  const metaAlcancada = childrens.length >= 600;
  const percentualMeta = (childrens.length / 600) * 100;

  const cards = [
    {
      id: 1,
      title: "Total de Usuários no Sistema",
      icon: <PeopleIcon />,
      value: visitadores.length,
      color: "#1976d2",
      bgColor: "#e3f2fd",
    },
    {
      id: 2,
      title: "Total de Crianças",
      icon: <ChildCareIcon />,
      value: childrens.length,
      color: "#388e3c",
      bgColor: "#e8f5e8",
    },
    {
      id: 3,
      title: "Total de Planos",
      icon: <AssignmentIcon />,
      value: planos.length,
      color: "#f57c00",
      bgColor: "#fff3e0",
    },
    {
      id: 4,
      title: "Total de Visitas Feitas",
      icon: <LocationOnIcon />,
      value: visitasFeitas.length,
      color: "#d32f2f",
      bgColor: "#ffebee",
    },
    {
      id: 5,
      title: "Total de Cuidadores",
      icon: <SecurityIcon />,
      value: caregivers.length,
      color: "#7b1fa2",
      bgColor: "#f3e5f5",
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <AssessmentIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Relatórios
          </Typography>
        </Breadcrumbs>
      </Box>

      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Relatório Geral
        </Typography>
        <Tooltip title="Atualizar dados">
          <IconButton onClick={handleRefresh} disabled={loading} color="primary">
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Filtros de Data */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DateRangeIcon sx={{ mr: 1, color: '#1976d2' }} />
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Filtros por Período
          </Typography>
        </Box>
        <form onSubmit={handleSearch}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Data de Início"
                value={inicioMes}
                onChange={(e) => setInicioMes(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                type="date"
                label="Data de Fim"
                value={fimMes}
                onChange={(e) => setFimMes(e.target.value)}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <AssessmentIcon />}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Gerando...' : 'Gerar Relatório'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {/* Indicador de Meta */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {metaAlcancada ? (
              <TrendingUpIcon sx={{ mr: 1, color: '#388e3c', fontSize: 30 }} />
            ) : (
              <TrendingDownIcon sx={{ mr: 1, color: '#d32f2f', fontSize: 30 }} />
            )}
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Meta de Beneficiários
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Meta: 600 beneficiários
              </Typography>
            </Box>
          </Box>
          <Box sx={{ textAlign: 'right' }}>
            <Chip
              label={metaAlcancada ? 'Meta Alcançada!' : `Faltam ${600 - childrens.length} beneficiários`}
              color={metaAlcancada ? 'success' : 'error'}
              variant="filled"
              sx={{ fontSize: '0.9rem', fontWeight: 'bold' }}
            />
            <Typography variant="body2" sx={{ mt: 1, color: 'text.secondary' }}>
              {percentualMeta.toFixed(1)}% da meta
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Cards de Estatísticas */}
      <Grid container spacing={3}>
        {cards.map(({ id, title, icon, value, color, bgColor }) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={id}>
            <Card
              elevation={3}
              sx={{
                height: '100%',
                borderRadius: 2,
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6,
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: bgColor,
                    color: color,
                    width: 60,
                    height: 60,
                    mx: 'auto',
                    mb: 2,
                  }}
                >
                  {React.cloneElement(icon, { fontSize: 'large' })}
                </Avatar>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 'bold',
                    mb: 1,
                    fontSize: '0.9rem',
                    lineHeight: 1.2,
                  }}
                >
                  {title}
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 'bold',
                    color: color,
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
