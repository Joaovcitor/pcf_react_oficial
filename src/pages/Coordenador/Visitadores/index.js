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
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  SupervisorAccount as SupervisorIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  AccountCircle as AccountIcon,
  Security as SecurityIcon,
} from "@mui/icons-material";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import { Link as RouterLink } from "react-router-dom";

export default function EditarVisitador({ match }) {
  const { id } = match.params;
  const [visitador, setVisitador] = useState(null);
  const [supervisores, setSupervisores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);

        // Buscar dados do visitador
        const visitadorResponse = await axios.get(`/visitadores/${id}`);
        const visitadorData = visitadorResponse.data;
        setVisitador(visitadorData);
        setSelectedSupervisor(visitadorData.supervisorId || "");
        setIsActive(visitadorData.isActive || false);

        // Buscar lista de supervisores
        const supervisoresResponse = await axios.get(
          "/coordenador/supervisores"
        );
        setSupervisores(supervisoresResponse.data || []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar dados do visitador");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  const handleSupervisorChange = (event) => {
    setSelectedSupervisor(event.target.value);
  };

  const handleActiveChange = (event) => {
    setIsActive(event.target.checked);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      // Atualizar supervisor se mudou
      if (selectedSupervisor !== visitador.supervisorId) {
        await axios.patch(`/visitadores/mudar-supervisor/${id}`, {
          supervisorId: selectedSupervisor,
        });
        toast.success("Supervisor alterado com sucesso!");
      }

      // Ativar/desativar conta se mudou
      if (isActive !== visitador.isActive) {
        if (isActive) {
          await axios.post(`/coordenador/ativar-visitador/${id}`);
          toast.success("Conta ativada com sucesso!");
        } else {
          await axios.patch(`/visitadores/desativar/${id}`);
          toast.success("Conta desativada com sucesso!");
        }
      }

      // Atualizar dados locais
      setVisitador((prev) => ({
        ...prev,
        supervisorId: selectedSupervisor,
        isActive: isActive,
      }));
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar alterações");
    } finally {
      setSaving(false);
    }
  };

  const validarVisitador = async () => {
    try {
      await axios.patch(`/visitadores/validar/${id}`);
      toast.success("Visitador validado com sucesso!");
      setVisitador((prev) => ({ ...prev, isPending: false }));
    } catch (error) {
      console.error("Erro ao validar visitador:", error);
      toast.error("Erro ao validar visitador");
    }
  };

  const desativarConta = async () => {
    try {
      setSaving(true);
      await axios.patch(`/visitadores/desativar/${id}`);
      toast.success("Conta desativada com sucesso!");
      setVisitador((prev) => ({ ...prev, isActive: false }));
      setIsActive(false);
    } catch (error) {
      console.error("Erro ao desativar conta:", error);
      toast.error("Erro ao desativar conta");
    } finally {
      setSaving(false);
    }
  };

  const mudarSupervisor = async () => {
    if (!selectedSupervisor || selectedSupervisor === visitador.supervisorId) {
      toast.warning("Selecione um supervisor diferente do atual");
      return;
    }

    try {
      setSaving(true);
      await axios.patch(`/visitadores/mudar-supervisor/${id}`, {
        supervisorId: selectedSupervisor,
      });
      toast.success("Supervisor alterado com sucesso!");
      setVisitador((prev) => ({ ...prev, supervisorId: selectedSupervisor }));
    } catch (error) {
      console.error("Erro ao mudar supervisor:", error);
      toast.error("Erro ao alterar supervisor");
    } finally {
      setSaving(false);
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

  if (!visitador) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Visitador não encontrado</Alert>
      </Container>
    );
  }

  const hasChanges =
    selectedSupervisor !== visitador.supervisorId ||
    isActive !== visitador.isActive;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          component={RouterLink}
          to="/"
          underline="hover"
          color="inherit"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Início
        </Link>
        <Link
          component={RouterLink}
          to="/meus-supervisores"
          underline="hover"
          color="inherit"
        >
          Supervisores
        </Link>
        <Typography
          color="text.primary"
          sx={{ display: "flex", alignItems: "center" }}
        >
          <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Editar Visitador
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton
            component={RouterLink}
            to="/meus-supervisores"
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              color: "white",
              "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Avatar
            sx={{ bgcolor: "rgba(255,255,255,0.2)", width: 56, height: 56 }}
          >
            <PersonIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box flex={1}>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Editar Visitador
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              {visitador.name}
            </Typography>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={3}>
        {/* Informações do Visitador */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: "fit-content" }}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <AccountIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Informações do Visitador
                </Typography>
              </Box>

              <Stack spacing={2}>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Nome Completo
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {visitador.name}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {visitador.email || "Não informado"}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Território
                  </Typography>
                  <Chip
                    icon={<LocationIcon />}
                    label={visitador.territorio || "Não informado"}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    CRAS
                  </Typography>
                  <Chip
                    icon={<BusinessIcon />}
                    label={visitador.cras || "Não informado"}
                    variant="outlined"
                    size="small"
                  />
                </Box>

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    Status Atual
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Chip
                      icon={
                        visitador.isActive ? (
                          <CheckCircleIcon />
                        ) : (
                          <CancelIcon />
                        )
                      }
                      label={visitador.isActive ? "Ativo" : "Inativo"}
                      size="small"
                      color={visitador.isActive ? "success" : "error"}
                    />
                    <Chip
                      label={visitador.isPending ? "Pendente" : "Aprovado"}
                      size="small"
                      color={visitador.isPending ? "warning" : "success"}
                    />
                  </Stack>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Formulário de Edição */}
        <Grid item xs={12} md={6}>
          <Card elevation={2}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}
              >
                <SecurityIcon color="primary" />
                <Typography variant="h6" fontWeight="bold">
                  Configurações
                </Typography>
              </Box>

              <Stack spacing={3}>
                {/* Seleção de Supervisor */}
                <FormControl fullWidth>
                  <InputLabel>Supervisor Responsável</InputLabel>
                  <Select
                    value={selectedSupervisor}
                    onChange={handleSupervisorChange}
                    label="Supervisor Responsável"
                    startAdornment={
                      <SupervisorIcon sx={{ mr: 1, color: "action.active" }} />
                    }
                  >
                    <MenuItem value="">
                      <em>Selecione um supervisor</em>
                    </MenuItem>
                    {supervisores.map((supervisor) => (
                      <MenuItem key={supervisor.id} value={supervisor.id}>
                        {supervisor.name} - {supervisor.cras}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Divider />

                {/* Status da Conta */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Status da Conta
                  </Typography>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActive}
                        onChange={handleActiveChange}
                        color="success"
                      />
                    }
                    label={isActive ? "Conta Ativa" : "Conta Inativa"}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {isActive
                      ? "O visitador pode acessar o sistema normalmente"
                      : "O visitador não pode acessar o sistema"}
                  </Typography>
                </Box>

                <Divider />

                {/* Validação de Visitador */}
                {visitador.isPending && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom>
                      Validação Pendente
                    </Typography>
                    <Alert severity="warning" sx={{ mb: 2 }}>
                      Este visitador ainda não foi validado no sistema
                    </Alert>
                    <Button
                      variant="outlined"
                      color="warning"
                      onClick={validarVisitador}
                      fullWidth
                      disabled={saving}
                    >
                      Validar Visitador
                    </Button>
                  </Box>
                )}

                {/* Ações Específicas */}
                <Box>
                  <Typography variant="subtitle2" gutterBottom>
                    Ações Específicas
                  </Typography>
                  <Stack spacing={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={desativarConta}
                      disabled={saving || !visitador.isActive}
                      fullWidth
                    >
                      {saving ? "Processando..." : "Desativar Conta"}
                    </Button>
                    
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={mudarSupervisor}
                      disabled={saving || selectedSupervisor === visitador.supervisorId}
                      fullWidth
                    >
                      {saving ? "Processando..." : "Alterar Supervisor"}
                    </Button>
                  </Stack>
                </Box>

                <Divider />

                {/* Botão Salvar */}
                <Button
                  variant="contained"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={!hasChanges || saving}
                  fullWidth
                  size="large"
                  sx={{ mt: 2 }}
                >
                  {saving ? (
                    <>
                      <CircularProgress size={20} sx={{ mr: 1 }} />
                      Salvando...
                    </>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>

                {hasChanges && (
                  <Alert severity="info" sx={{ mt: 2 }}>
                    Você tem alterações não salvas
                  </Alert>
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

EditarVisitador.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
