/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../../services/axios";
import Mapa from "../../../components/Mapa";
import { toast } from "react-toastify";
import InvalidarVisita from "../../../components/InvalidarVisita";
import { format } from "date-fns";
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardActions,
  Breadcrumbs,
  Link,
  Button,
  Chip,
  Grid,
  Alert,
  Divider,
  CircularProgress,
  Stack
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  LocationOn as LocationOnIcon,
  Schedule as ScheduleIcon,
  Person as PersonIcon,
  Warning as WarningIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";

export default function Visitadores({ match }) {
  const { id } = match.params;
  const [visitaFinalizadas, setVisitas] = useState([]);
  const [invalidarHabilitado, setHabilitar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(
          `/visitasporgeolo/visitas-marcadas/${id}`
        );
        console.log("data", response.data);
        setVisitas(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Erro ao carregar visitas.");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, [id]);

  const handleSubmitValidarVisita = async (idVisita) => {
    try {
      await axios.patch(`/visitasporgeolo/atualizar-visita/${idVisita}`, {
        isFakeVisit: false,
        isValidationPending: false,
      });
      toast.success("Visita validada com sucesso!");
      // Recarregar dados após validação
      const response = await axios.get(
        `/visitasporgeolo/visitas-marcadas/${id}`
      );
      setVisitas(response.data);
    } catch (error) {
      console.error("Erro ao validar visita:", error);
      toast.error("Ocorreu um erro ao validar a visita.");
    }
  };

  const handleSubmitInvalidarVisita = () => {
    setHabilitar(true);
  };

  const visitasSemBeneficiarios = visitaFinalizadas.filter(
    (visita) => !visita.isBeneficiaryHome
  );

  const visitasFinalizadasPeloVVisitador = visitaFinalizadas.filter(
    (visita) => visita.isValidationPending === true
  );

  console.log("Filter", visitasFinalizadasPeloVVisitador);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Início
        </Link>
        <Typography color="text.primary" sx={{ display: "flex", alignItems: "center" }}>
          <PersonIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Visitas do Visitador
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={3}
        sx={{
          background: "linear-gradient(135deg, #11B4D9 0%, #308C50 100%)",
          color: "white",
          p: 4,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Box textAlign="center">
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            <LocationOnIcon sx={{ mr: 2, fontSize: "inherit" }} />
            Visitas Realizadas
          </Typography>
          <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
            Acompanhe e valide as visitas realizadas pelo visitador
          </Typography>
        </Box>
      </Paper>

      {/* Visitas Finalizadas */}
      <Card elevation={2} sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <CheckCircleIcon sx={{ mr: 1, color: "success.main" }} />
            Visitas Pendentes de Validação
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {visitasFinalizadasPeloVVisitador.length > 0 ? (
            <Grid container spacing={3}>
              {visitasFinalizadasPeloVVisitador.map((visita) => (
                <Grid item xs={12} key={visita.id}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                          Visita #{visita.id}
                        </Typography>
                        <Chip
                          label="Pendente de Validação"
                          color="warning"
                          icon={<ScheduleIcon />}
                          variant="outlined"
                        />
                      </Box>
                      
                      {/* Mapa */}
                      <Box sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
                        <Mapa visita={visita} />
                      </Box>
                      
                      {/* Ações */}
                      <Stack direction="row" spacing={2} justifyContent="center">
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => handleSubmitValidarVisita(visita.id)}
                          sx={{
                            background: "linear-gradient(45deg, #4CAF50, #45a049)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #45a049, #3d8b40)",
                            },
                          }}
                        >
                          Validar Visita
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                          onClick={() => handleSubmitInvalidarVisita()}
                        >
                          Invalidar Visita
                        </Button>
                      </Stack>
                      
                      {invalidarHabilitado && (
                        <Box sx={{ mt: 3 }}>
                          <InvalidarVisita id={visita.id} />
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              <Typography variant="body1">
                Não há visitas pendentes de validação.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Visitas sem Beneficiários */}
      <Card elevation={2}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ display: "flex", alignItems: "center" }}>
            <WarningIcon sx={{ mr: 1, color: "warning.main" }} />
            Beneficiário Não Estava em Casa
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          {visitasSemBeneficiarios.length > 0 ? (
            <Grid container spacing={3}>
              {visitasSemBeneficiarios.map((visita) => (
                <Grid item xs={12} key={visita.id}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <CardContent>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                        <Typography variant="h6" fontWeight="bold">
                          Visita #{visita.id}
                        </Typography>
                        <Chip
                          label="Beneficiário Ausente"
                          color="warning"
                          icon={<WarningIcon />}
                          variant="outlined"
                        />
                      </Box>
                      
                      {/* Mapa */}
                      <Box sx={{ mb: 3, borderRadius: 2, overflow: "hidden" }}>
                        <Mapa visita={visita} id={id} />
                      </Box>
                      
                      {/* Motivo */}
                      <Alert severity="warning" sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Motivo da não realização:
                        </Typography>
                        <Typography variant="body2">
                          {visita.motivo_da_nao_realizacao}
                        </Typography>
                      </Alert>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              <Typography variant="body1">
                Não há registros de visitas onde o beneficiário não estava em casa.
              </Typography>
            </Alert>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}
