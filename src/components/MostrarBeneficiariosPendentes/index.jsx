import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import { get } from "lodash";
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
  Stack,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import {
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
  PregnantWoman as PregnantWomanIcon,
  CheckCircle as CheckCircleIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Assignment as AssignmentIcon,
  Visibility as VisibilityIcon,
  AccountCircle as AccountCircleIcon,
} from "@mui/icons-material";

export default function MostrarBeneficiariosPendentes() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/cuidador/");
      const lista = Array.isArray(response.data) ? response.data : [];
      const pendentes = lista.filter((c) => c.isPending === true);
      setCaregivers(pendentes);
      setError(null);
    } catch (err) {
      setError("Falha ao buscar os dados. Tente novamente mais tarde.");
      const errors = get(err, "response.data.errors", []);
      errors.forEach((errorMsg) => toast.error(errorMsg));
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

  const handleSubmitValidar = async (idCaregiver) => {
    try {
      await axios.patch(`/cuidador/validar/${idCaregiver}`);
      toast.success("Dados validados com sucesso!");

      // Atualizar a lista após validação
      setCaregivers((prev) => prev.filter((c) => c.id !== idCaregiver));
    } catch (e) {
      const errors = get(e, "response.data.errors", [
        "Ocorreu um erro desconhecido.",
      ]);
      if (Array.isArray(errors)) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error(errors);
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      </Container>
    );
  }

  const nonPregnantCaregivers = caregivers.filter(
    (c) => !c.pregnant && c.children.length > 0
  );
  const pregnantBeneficiaries = caregivers.filter((c) => c.pregnant);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Button
          component="a"
          href="/"
          startIcon={<HomeIcon />}
          variant="text"
          color="primary"
        >
          Início
        </Button>
        <Typography color="text.primary">Beneficiários Pendentes</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)",
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
              <AssignmentIcon sx={{ fontSize: 30 }} />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Beneficiários Pendentes
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
                Validação de cuidadores e gestantes
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
            Resumo de Pendências
          </Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                {caregivers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Pendentes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {nonPregnantCaregivers.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Cuidadores
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="warning.main" fontWeight="bold">
                {pregnantBeneficiaries.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestantes
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Seção de Cuidadores */}
      {nonPregnantCaregivers.length > 0 && (
        <Box mb={4}>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <ChildCareIcon color="primary" />
            <Typography variant="h5" fontWeight="bold">
              Cuidadores Pendentes
            </Typography>
            <Chip
              label={`${nonPregnantCaregivers.length} pendente${nonPregnantCaregivers.length !== 1 ? "s" : ""}`}
              color="info"
              variant="outlined"
            />
          </Box>

          <Grid container spacing={3}>
            {nonPregnantCaregivers.map((caregiver) => (
              <Grid item xs={12} md={6} key={caregiver.id}>
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
                          bgcolor: "info.main",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <PersonIcon />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {caregiver.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          CPF: {caregiver.cpf}
                        </Typography>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box mb={2}>
                      <Typography
                        variant="subtitle2"
                        fontWeight="bold"
                        gutterBottom
                      >
                        Crianças ({caregiver.children.length}):
                      </Typography>
                      <List dense>
                        {caregiver.children.map((child) => (
                          <ListItem key={child.id} sx={{ py: 0.5 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <ChildCareIcon fontSize="small" color="action" />
                            </ListItemIcon>
                            <ListItemText primary={child.name} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>

                    {caregiver.visitor?.name && (
                      <Box>
                        <Typography
                          variant="subtitle2"
                          fontWeight="bold"
                          gutterBottom
                        >
                          Visitador:
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccountCircleIcon fontSize="small" color="action" />
                          <Typography variant="body2">
                            {caregiver.visitor.name}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          Entrada em:{" "}
                          {new Date(caregiver.visitor.createdAt).toLocaleString(
                            "pt-BR"
                          )}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      onClick={() => handleSubmitValidar(caregiver.id)}
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                      sx={{
                        background: "linear-gradient(45deg, #4CAF50, #45a049)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #45a049, #3d8b40)",
                        },
                      }}
                    >
                      Validar Dados
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Seção de Gestantes */}
      {pregnantBeneficiaries.length > 0 && (
        <Box>
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <PregnantWomanIcon color="warning" />
            <Typography variant="h5" fontWeight="bold">
              Gestantes Pendentes
            </Typography>
            <Chip
              label={`${pregnantBeneficiaries.length} pendente${pregnantBeneficiaries.length !== 1 ? "s" : ""}`}
              color="warning"
              variant="outlined"
            />
          </Box>

          <Grid container spacing={3}>
            {pregnantBeneficiaries.map((beneficiario) => (
              <Grid item xs={12} md={6} key={beneficiario.id}>
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
                          bgcolor: "warning.main",
                          width: 48,
                          height: 48,
                        }}
                      >
                        <PregnantWomanIcon />
                      </Avatar>
                      <Box flex={1}>
                        <Typography variant="h6" fontWeight="bold">
                          {beneficiario.name}
                        </Typography>
                        <Chip label="Gestante" color="warning" size="small" />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Stack spacing={1.5}>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>CPF:</strong> {beneficiario.cpf}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          <strong>RG:</strong> {beneficiario.rg}
                        </Typography>
                      </Box>
                      {beneficiario.visitor?.name && (
                        <Box>
                          <Typography
                            variant="subtitle2"
                            fontWeight="bold"
                            gutterBottom
                          >
                            Visitador:
                          </Typography>
                          <Box display="flex" alignItems="center" gap={1}>
                            <AccountCircleIcon
                              fontSize="small"
                              color="action"
                            />
                            <Typography variant="body2">
                              {beneficiario.visitor.name}
                            </Typography>
                          </Box>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      onClick={() => handleSubmitValidar(beneficiario.id)}
                      variant="contained"
                      startIcon={<CheckCircleIcon />}
                      fullWidth
                      sx={{
                        background: "linear-gradient(45deg, #FF9800, #F57C00)",
                        "&:hover": {
                          background:
                            "linear-gradient(45deg, #F57C00, #E65100)",
                        },
                      }}
                    >
                      Validar Dados
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}

      {/* Mensagem quando não há pendências */}
      {caregivers.length === 0 && (
        <Alert severity="success" sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Parabéns! 🎉
          </Typography>
          <Typography>
            Não há beneficiários pendentes de validação no momento.
          </Typography>
        </Alert>
      )}
    </Container>
  );
}
