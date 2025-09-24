import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Chip,
  Button,
  Paper,
  Breadcrumbs,
  CircularProgress,
  Alert,
  IconButton,
  Tooltip,
  Stack
} from "@mui/material";
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Visibility as VisibilityIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  People as PeopleIcon
} from "@mui/icons-material";
import { toast } from "react-toastify";

export default function BuscarVisitadores() {
  const [visitadores, setVisitadores] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/supervisor/visitadores");
      setVisitadores(response.data);
    } catch (error) {
      console.error("Erro ao buscar visitadores:", error);
      toast.error("Erro ao carregar os visitadores.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Button
          component={Link}
          to="/"
          startIcon={<HomeIcon />}
          variant="text"
          color="primary"
        >
          Início
        </Button>
        <Typography color="text.primary">Meus Visitadores</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                width: 56,
                height: 56,
              }}
            >
              <PeopleIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Meus Visitadores
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Gerencie e acompanhe seus visitadores
              </Typography>
            </Box>
          </Box>
          <Tooltip title="Atualizar lista">
            <IconButton
              onClick={handleRefresh}
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                color: "white",
                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
              }}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>

      {/* Estatísticas */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <PeopleIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Resumo
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                {visitadores.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Visitadores
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {visitadores.filter(v => v.isActive).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Ativos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {visitadores.filter(v => !v.isActive).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Inativos
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box textAlign="center">
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {new Set(visitadores.map(v => v.territorio)).size}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Territórios
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Visitadores */}
      {visitadores.length > 0 ? (
        <Grid container spacing={3}>
          {visitadores.map((visitador) => (
            <Grid item xs={12} sm={6} md={4} key={visitador.id}>
              <Card
                elevation={2}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <CardContent sx={{ flex: 1, p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar
                      sx={{
                        bgcolor: visitador.isActive ? "success.main" : "grey.400",
                        width: 48,
                        height: 48,
                      }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {visitador.name}
                      </Typography>
                      <Chip
                        label={visitador.isActive ? "Ativo" : "Inativo"}
                        color={visitador.isActive ? "success" : "default"}
                        size="small"
                      />
                    </Box>
                  </Box>

                  <Stack spacing={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Território:</strong> {visitador.territorio || "Não informado"}
                      </Typography>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <BusinessIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>CRAS:</strong> {visitador.cras || "Não informado"}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={`/visitadores/detalhes/${visitador.id}`}
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    fullWidth
                    sx={{
                      background: "linear-gradient(45deg, #11B4D9, #308C50)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0ea5c7, #2a7a45)",
                      },
                    }}
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
          Nenhum visitador encontrado.
        </Alert>
      )}
    </Container>
  );
}
