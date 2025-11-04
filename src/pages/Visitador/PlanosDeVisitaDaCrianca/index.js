/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Breadcrumbs,
  Link as MuiLink,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Assignment as PlanIcon,
  Edit as EditIcon,
  CalendarToday as CalendarIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
  PictureAsPdf as PdfIcon,
} from "@mui/icons-material";
import axios from "../../../services/axios";
import PlanoVisitasPDFGenerator from "../../../components/PlanoVisitasPDFGenerator";

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
        console.log(response.data);

        // Com o interceptor do axios, os dados já vêm extraídos
        setPlanos(response.data.data || []);

        // Verificação de segurança para meta
        if (response.data.meta) {
          setTotalPages(response.data.meta.totalPages || 1);
          setTotalDePlanos(response.data.meta.total || 0);
        } else {
          // Fallback caso meta não exista
          setTotalPages(1);
          setTotalDePlanos(response.data.data ? response.data.data.length : 0);
        }
      } catch (err) {
        console.error("Erro ao buscar planos:", err);
        setError("Erro ao carregar os planos. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id, page]); // A dependência 'limit' não é necessária pois é uma constante

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "fácil":
      case "facil":
        return "#4CAF50";
      case "média":
      case "media":
        return "#FF9800";
      case "difícil":
      case "dificil":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "400px",
          }}
        >
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  if (!planos || !Array.isArray(planos) || planos.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ mb: 2 }}
          >
            <MuiLink
              color="inherit"
              href="/"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Início
            </MuiLink>
            <Typography
              color="text.primary"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <PlanIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Planos do Beneficiário
            </Typography>
          </Breadcrumbs>
        </Box>

        <Paper sx={{ p: 4, textAlign: "center" }}>
          <PlanIcon sx={{ fontSize: 64, color: "text.disabled", mb: 2 }} />
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
            Nenhum plano encontrado
          </Typography>
          <Typography variant="body2" sx={{ color: "text.disabled" }}>
            Não há planos cadastrados para este beneficiário.
          </Typography>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 2 }}
        >
          <MuiLink
            color="inherit"
            href="/"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </MuiLink>
          <Typography
            color="text.primary"
            sx={{ display: "flex", alignItems: "center" }}
          >
            <PlanIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Planos do Beneficiário
          </Typography>
        </Breadcrumbs>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 3,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Avatar sx={{ bgcolor: "#1976d2", width: 56, height: 56 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h4"
                sx={{ fontWeight: 600, color: "#1976d2" }}
              >
                Planos de Visita
              </Typography>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                Total de {totalDePlanos} plano{totalDePlanos !== 1 ? "s" : ""}{" "}
                encontrado{totalDePlanos !== 1 ? "s" : ""}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {planos.map((plano) => (
          <Grid item xs={12} md={6} lg={4} key={plano.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                    <PlanIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      Plano #{plano.id}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {plano.createdAt
                          ? format(new Date(plano.createdAt), "dd/MM/yyyy")
                          : "Data inválida"}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 2 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1, color: "#1976d2" }}
                  >
                    Objetivo:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      lineHeight: 1.4,
                    }}
                  >
                    {plano.objective || "Não informado"}
                  </Typography>
                </Box>

                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
                >
                  <FlagIcon
                    sx={{
                      fontSize: 16,
                      color: getDifficultyColor(
                        plano.grau_de_dificuldade_objetivo
                      ),
                    }}
                  />
                  <Chip
                    label={
                      plano.grau_de_dificuldade_objetivo || "Não informado"
                    }
                    size="small"
                    sx={{
                      backgroundColor: getDifficultyColor(
                        plano.grau_de_dificuldade_objetivo
                      ),
                      color: "white",
                      fontWeight: 500,
                    }}
                  />
                </Box>

                <Button
                  component={Link}
                  to={`/planos/editar/${plano.id}`}
                  variant="contained"
                  startIcon={<EditIcon />}
                  fullWidth
                  sx={{
                    mt: "auto",
                    borderRadius: 2,
                    textTransform: "none",
                    fontWeight: 600,
                    py: 1.5,
                    mb: 1,
                  }}
                >
                  Acessar Plano
                </Button>

                {(() => {
                  const months = ['janeiro','fevereiro','março','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro'];
                  const parseDateSafe = (value) => {
                    const d = new Date(value);
                    return Number.isNaN(d.getTime()) ? null : d;
                  };
                  const scheduledRaw = plano?.scheduledDay || plano?.data || plano?.createdAt;
                  const scheduled = (() => {
                    const d = parseDateSafe(scheduledRaw);
                    if (!d) return null;
                    return { dia: d.getDate(), mes: months[d.getMonth()], ano: d.getFullYear(), date: d };
                  })();
                  const born = parseDateSafe(plano?.child?.born);
                  const calcAgeYears = (b, ref) => {
                    if (!b) return undefined;
                    const r = ref || new Date();
                    let age = r.getFullYear() - b.getFullYear();
                    const m = r.getMonth() - b.getMonth();
                    if (m < 0 || (m === 0 && r.getDate() < b.getDate())) age--;
                    return age < 0 ? 0 : age;
                  };
                  let idadeAnos = calcAgeYears(born, scheduled?.date);
                  if (idadeAnos == null) {
                    // fallback: tentar campo direto de idade, se existir
                    idadeAnos = plano?.child?.idade ?? plano?.child?.age ?? undefined;
                  }
                  const visitData = {
                    scheduledDay: plano?.scheduledDay || plano?.createdAt,
                    periodo: undefined,
                    faixaEtaria: idadeAnos != null ? (idadeAnos < 1 ? '00 a 01 ano' : idadeAnos < 2 ? '01 a 02 anos' : idadeAnos < 3 ? '02 a 03 anos' : idadeAnos < 4 ? '03 a 04 anos' : idadeAnos < 5 ? '04 a 05 anos' : `${idadeAnos} anos`) : undefined,
                    nis: plano?.child?.nis,
                    nomeBeneficiario: plano?.child?.name,
                    idade: idadeAnos,
                    visitador: plano?.visitor?.name,
                    supervisor: plano?.visitor?.supervisor?.name || undefined,
                  };
                  return <PlanoVisitasPDFGenerator visitData={visitData} planoData={plano} />;
                })()}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Paginação */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            sx={{ minWidth: 100 }}
          >
            Anterior
          </Button>
          <Typography variant="body2" sx={{ mx: 2 }}>
            Página {page} de {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            sx={{ minWidth: 100 }}
          >
            Próxima
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
