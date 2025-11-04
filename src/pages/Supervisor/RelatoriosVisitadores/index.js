/* eslint-disable react/prop-types */
import React, { useCallback, useEffect, useState } from "react";
import axios from "../../../services/axios";
import { Link } from "react-router-dom";

// Material-UI imports
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Avatar,
  Chip,
  Stack,
  Breadcrumbs,
  CircularProgress,
  Alert,
  TextField,
  IconButton,
  Divider,
} from "@mui/material";

// Material-UI icons
import {
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Face as ChildIcon,
  Assignment as AssignmentIcon,
  LocationOn as LocationOnIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Search as SearchIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";

import VisitadorDetalhesPDFGenerator from "../../../components/VisitadorDetalhesPDFGenerator";

export default function RelatoriosVisitadores({ match }) {
  const { id } = match.params;

  const [visitador, setVisitador] = useState(null);
  const [childrens, setChildrens] = useState([]);
  const [planos, setPlanos] = useState([]);
  const [visitasFeitas, setVisitasFeitas] = useState([]);
  const [loading, setLoading] = useState(true);

  const [inicioMes, setInicioMes] = useState("");
  const [fimMes, setFimMes] = useState("");

  const fetchData = useCallback(
    async (params = {}) => {
      try {
        setLoading(true);
        const response = await axios.get(`/users/${id}`, { params });
        console.log(response.data);
        setVisitador(response.data);
        setChildrens(response.data.children || []);
        setPlanos(response.data.planosDeVisitas || []);
        setVisitasFeitas(response.data.visitasPorGeolocalizacaos || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchData();
  }, [id, fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inicioMes && fimMes) {
      fetchData({ startDate: inicioMes, endDate: fimMes });
    } else {
      alert("Por favor, selecione as duas datas.");
    }
  };

  const visitasFinalizadas = visitasFeitas.filter(
    (visita) => visita.isFinished === true
  );

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (!visitador) {
    return (
      <Box p={3}>
        <Alert severity="error">Visitador não encontrado</Alert>
      </Box>
    );
  }

  const cards = [
    {
      id: 2,
      title: "Crianças",
      icon: <ChildIcon />,
      value: childrens.length,
      color: "success",
    },
    {
      id: 3,
      title: "Planos",
      icon: <AssignmentIcon />,
      value: planos.length,
      color: "warning",
    },
    {
      id: 4,
      title: "Visitas Feitas",
      icon: <LocationOnIcon />,
      value: visitasFinalizadas.length,
      color: "error",
    },
  ];

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: "auto" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/meus-visitadores"
          startIcon={<ArrowBackIcon />}
          variant="text"
          color="primary"
        >
          Voltar
        </Button>
        <Typography color="text.primary">Detalhes do Visitador</Typography>
      </Breadcrumbs>

      {/* Título Principal */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
          background: "linear-gradient(45deg, #11B4D9, #308C50)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        }}
      >
        Relatórios de {visitador.name}
      </Typography>

      {/* Informações do Visitador */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: "rgba(255,255,255,0.2)",
              fontSize: "2rem",
            }}
          >
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              {visitador.name}
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap">
              <Chip
                label={`Território: ${visitador.territorio || "N/A"}`}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                label={`CRAS: ${visitador.cras || "N/A"}`}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
              <Chip
                icon={visitador.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                label={visitador.isActive ? "Ativo" : "Inativo"}
                color={visitador.isActive ? "success" : "error"}
              />
              <Chip
                label={visitador.isPending ? "Pendente" : "Aprovado"}
                color={visitador.isPending ? "warning" : "success"}
              />
            </Stack>
          </Box>
        </Box>
      </Paper>

      {/* Filtro por Data */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarIcon color="primary" />
          Filtrar por Período
        </Typography>
        <Box component="form" onSubmit={handleSearch} sx={{ display: "flex", gap: 2, alignItems: "end", flexWrap: "wrap" }}>
          <TextField
            label="Data Início"
            type="date"
            value={inicioMes}
            onChange={(e) => setInicioMes(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <TextField
            label="Data Fim"
            type="date"
            value={fimMes}
            onChange={(e) => setFimMes(e.target.value)}
            InputLabelProps={{ shrink: true }}
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{ minWidth: 140 }}
          >
            Gerar Relatório
          </Button>
          <VisitadorDetalhesPDFGenerator
            visitador={visitador}
            childrens={childrens}
            planos={planos}
            visitasFeitas={visitasFeitas}
            inicioMes={inicioMes}
            fimMes={fimMes}
          />
        </Box>
      </Paper>

      {/* Cards de Resumo */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cards.map(({ id, title, icon, value, color }) => (
          <Grid item xs={12} sm={6} md={4} key={id}>
            <Card
              elevation={3}
              sx={{
                height: "100%",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.15)",
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Avatar
                  sx={{
                    width: 60,
                    height: 60,
                    mx: "auto",
                    mb: 2,
                    bgcolor: `${color}.main`,
                  }}
                >
                  {React.cloneElement(icon, { fontSize: "large" })}
                </Avatar>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {title}
                </Typography>
                <Typography variant="h4" fontWeight="bold" color={`${color}.main`}>
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Lista de Crianças */}
      <Box sx={{ mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
          <ChildIcon color="primary" />
          <Typography variant="h5" fontWeight="bold">
            Crianças Cadastradas
          </Typography>
          <Chip
            label={`${childrens.length} criança${childrens.length !== 1 ? "s" : ""}`}
            color="primary"
            variant="outlined"
          />
        </Box>

        {childrens.length > 0 ? (
          <Grid container spacing={3}>
            {childrens.map((crianca) => (
              <Grid item xs={12} sm={6} md={4} key={crianca.id}>
                <Card
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "all 0.3s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main" }}>
                        <ChildIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {crianca.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {crianca.idade} anos
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>

                  <Divider />

                  <CardActions sx={{ p: 2, justifyContent: "space-between" }}>
                    <Button
                      component={Link}
                      to={`/visitas/${crianca.id}`}
                      variant="outlined"
                      startIcon={<VisibilityIcon />}
                      size="small"
                    >
                      Ver Visitas
                    </Button>
                    <Button
                      component={Link}
                      to={`/crianca/${crianca.id}`}
                      variant="contained"
                      startIcon={<VisibilityIcon />}
                      size="small"
                    >
                      Ver Detalhes
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            Nenhuma criança cadastrada para este visitador.
          </Alert>
        )}
      </Box>
    </Box>
  );
}
