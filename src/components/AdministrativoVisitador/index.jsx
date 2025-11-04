import React, { useState, useEffect } from "react";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  Divider,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Badge,
  TextField,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Assignment as AssignmentIcon,
  Email as EmailIcon,
  Edit as EditIcon,
  Close as CloseIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from "@mui/icons-material";

export default function AdministrativoVisitador() {
  const [user, setUser] = useState([]);
  const [visitasInvalidadas, setVisitasInvalidadas] = useState([]);
  const [faltas, setFaltas] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState([]);
  const [visitasDoVisitador, setVisitasDoVisitador] = useState([]);
  const [visitasLoading, setVisitasLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  
  // Estados para o diálogo de senha
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ password: '', confirmPassword: '' });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [faltasResponse, usersResponse, userResponse] = await Promise.all(
          [axios.get("/faltas/"), axios.get("/users/"), axios.get("/")]
        );

        if (faltasResponse.status !== 204) {
          setFaltas(faltasResponse.data);
        }
        setUser(usersResponse.data.users);
        setUsuarioLogado(userResponse.data.user);
      } catch (e) {
        toast.error("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  // Buscar visitas marcadas do visitador logado para acompanhar pedidos de invalidação
  useEffect(() => {
    async function fetchVisitas() {
      if (!usuarioLogado?.id) return;
      try {
        setVisitasLoading(true);
        const response = await axios.get(`/visitasporgeolo/visitas-marcadas/${usuarioLogado.id}`);
        // Alguns endpoints retornam o array diretamente; garantir array
        const data = Array.isArray(response.data) ? response.data : (response.data?.visita || []);
        setVisitasDoVisitador(data);
      } catch (error) {
        console.error("Erro ao carregar visitas do visitador:", error);
        toast.error("Não foi possível carregar suas visitas marcadas.");
      } finally {
        setVisitasLoading(false);
      }
    }
    fetchVisitas();
  }, [usuarioLogado?.id]);

  const minhasFaltas = faltas.filter(
    (f) => f.userId === usuarioLogado.id && !f.falta_invalidada
  );
  const meusPedidosDeInvalidacaoDeFaltas = faltas.filter(
    (f) => f.userId === usuarioLogado.id && f.pedir_para_invalidar_falta
  );

  // Pedidos de invalidação de visitas marcadas (campo pode ser invalidationRequest, invalidationReason ou motivo_da_invalidacao)
  const meusPedidosDeInvalidacaoDeVisitas = visitasDoVisitador.filter(
    (v) => Boolean(v?.invalidationRequest || v?.invalidationReason || v?.motivo_da_invalidacao)
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleOpenEmailDialog = () => {
    setNewEmail(usuarioLogado.email || "");
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setNewEmail("");
  };

  const handleUpdateEmail = async () => {
    if (!newEmail || newEmail === usuarioLogado.email) {
      toast.warning("Digite um novo email válido");
      return;
    }

    try {
      setEmailLoading(true);
      await axios.put("/login/update-email", {
        id: usuarioLogado.id,
        email: newEmail,
      });

      toast.success("Email atualizado com sucesso!");
      setUsuarioLogado({ ...usuarioLogado, email: newEmail });
      handleCloseEmailDialog();
    } catch (error) {
      toast.error("Erro ao atualizar email");
    } finally {
      setEmailLoading(false);
    }
  };

  // Funções para o diálogo de senha
  const handleOpenPasswordDialog = () => {
    setPasswordData({ password: '', confirmPassword: '' });
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordData({ password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.password || passwordData.password.length < 6) {
      toast.warning("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.warning("As senhas não coincidem");
      return;
    }

    try {
      setPasswordLoading(true);
      await axios.patch("/login/update-password", {
        id: usuarioLogado.id,
        password: passwordData.password,
      });

      toast.success("Senha atualizada com sucesso!");
      handleClosePasswordDialog();
    } catch (error) {
      toast.error("Erro ao atualizar senha");
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando dados...
        </Typography>
      </Container>
    );
  }
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #308C50, #11B4D9)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Painel do Visitador
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie suas informações pessoais e acompanhe suas faltas
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            "& .MuiTab-root": {
              minHeight: 64,
              fontSize: "1rem",
              fontWeight: 600,
            },
          }}
        >
          <Tab
            icon={
              <Badge badgeContent={1} color="primary">
                <PersonIcon />
              </Badge>
            }
            label="Minhas Informações"
            iconPosition="start"
          />
          <Tab
            icon={
              <Badge badgeContent={minhasFaltas.length} color="secondary">
                <WarningIcon />
              </Badge>
            }
            label="Minhas Faltas"
            iconPosition="start"
          />
          <Tab
            icon={
              <Badge
                badgeContent={meusPedidosDeInvalidacaoDeFaltas.length + meusPedidosDeInvalidacaoDeVisitas.length}
                color="error"
              >
                <AssignmentIcon />
              </Badge>
            }
            label="Pedidos de Invalidação"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Tab Panel 0 - Informações Pessoais */}
      {tabValue === 0 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Suas Informações Pessoais
          </Typography>

          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <Avatar
                  sx={{
                    bgcolor: "#388e3c",
                    mr: 3,
                    width: 80,
                    height: 80,
                  }}
                >
                  <PersonIcon sx={{ fontSize: 40 }} />
                </Avatar>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                    {usuarioLogado.name}
                  </Typography>
                  <Chip
                    label="Visitador"
                    sx={{
                      bgcolor: "#388e3c",
                      color: "white",
                      fontWeight: 600,
                    }}
                  />
                </Box>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <EmailIcon sx={{ mr: 2, color: "text.secondary" }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Email:
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 500 }}>
                        {usuarioLogado.email}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={handleOpenEmailDialog}
                      color="primary"
                      sx={{ ml: 2 }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Button
                    onClick={handleOpenPasswordDialog}
                    variant="outlined"
                    fullWidth
                    startIcon={<LockIcon />}
                    sx={{ height: 56 }}
                  >
                    Alterar Senha
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Tab Panel 1 - Minhas Faltas */}
      {tabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Faltas Registradas: {minhasFaltas.length}
          </Typography>

          {minhasFaltas.length > 0 ? (
            <Grid container spacing={3}>
              {minhasFaltas.map((falta) => {
                const usuarioQueDeuFalta = user?.find(
                  (user) => user.id === falta.registradorId
                ) || { name: "Usuário não encontrado" };

                return (
                  <Grid item xs={12} md={6} key={falta.id}>
                    <Card sx={{ height: "100%" }}>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 2 }}
                        >
                          <Avatar sx={{ bgcolor: "#f57c00", mr: 2 }}>
                            <WarningIcon />
                          </Avatar>
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              Falta Registrada
                            </Typography>
                            <Chip
                              label={
                                falta.falta_invalidada ? "Invalidada" : "Ativa"
                              }
                              color={
                                falta.falta_invalidada ? "success" : "warning"
                              }
                              size="small"
                            />
                          </Box>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                          >
                            Motivo da Falta:
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {falta.motivo_da_falta}
                          </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mb: 0.5 }}
                          >
                            Registrada por:
                          </Typography>
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {usuarioQueDeuFalta
                              ? usuarioQueDeuFalta.name
                              : "Usuário não encontrado"}
                          </Typography>
                        </Box>

                        {!falta.pedir_para_invalidar_falta && (
                          <Button
                            component={Link}
                            to={`/faltas/pedir-para-invalidar/${falta.id}`}
                            variant="contained"
                            color="warning"
                            fullWidth
                            startIcon={<AssignmentIcon />}
                          >
                            Pedir para Invalidar
                          </Button>
                        )}
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Alert severity="success" sx={{ textAlign: "center" }}>
              <Typography variant="h6">
                Parabéns! Você não possui nenhuma falta registrada 🎉
              </Typography>
            </Alert>
          )}
        </Box>
      )}

      {/* Tab Panel 2 - Pedidos de Invalidação */}
      {tabValue === 2 && (
        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Meus Pedidos de Invalidação
          </Typography>

          {/* Pedidos de invalidação de faltas */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Faltas
          </Typography>
          {meusPedidosDeInvalidacaoDeFaltas.length > 0 ? (
            <Grid container spacing={3}>
              {meusPedidosDeInvalidacaoDeFaltas.map((falta) => (
                <Grid item xs={12} md={6} key={falta.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                          <AssignmentIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Pedido de Invalidação
                          </Typography>
                          <Chip
                            label={
                              falta.falta_invalidada ? "Aceito" : "Pendente"
                            }
                            color={
                              falta.falta_invalidada ? "success" : "warning"
                            }
                            size="small"
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ mb: 2 }}>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          Motivo para Invalidar:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {falta.pedir_para_invalidar_falta}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 0.5 }}
                        >
                          Status:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {falta.falta_invalidada
                            ? "Pedido aceito - Falta invalidada"
                            : "Aguardando análise"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              Você não possui pedidos de invalidação de falta
            </Alert>
          )}

          <Divider sx={{ my: 3 }} />

          {/* Pedidos de invalidação de visitas */}
          <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
            Visitas
          </Typography>
          {visitasLoading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <CircularProgress size={20} />
              <Typography variant="body2">Carregando visitas...</Typography>
            </Box>
          ) : meusPedidosDeInvalidacaoDeVisitas.length > 0 ? (
            <Grid container spacing={3}>
              {meusPedidosDeInvalidacaoDeVisitas.map((visita) => (
                <Grid item xs={12} md={6} key={visita.id}>
                  <Card sx={{ height: "100%" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar sx={{ bgcolor: "#1976d2", mr: 2 }}>
                          <AssignmentIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Pedido de Invalidação de Visita #{visita.id}
                          </Typography>
                          <Chip
                            label={visita?.isFakeVisit || visita?.visita_mentirosa ? "Invalidada" : "Pendente"}
                            color={visita?.isFakeVisit || visita?.visita_mentirosa ? "success" : "warning"}
                            size="small"
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Motivo da solicitação:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {visita?.invalidationRequest || visita?.invalidationReason || visita?.motivo_da_invalidacao || "—"}
                        </Typography>
                      </Box>

                      {visita?.scheduledDate && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Data agendada:
                          </Typography>
                          <Typography variant="body2">
                            {new Date(visita.scheduledDate).toLocaleString("pt-BR")}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              Você não possui pedidos de invalidação de visitas
            </Alert>
          )}
        </Box>
      )}

      {/* Dialog para atualizar email */}
      <Dialog
        open={openEmailDialog}
        onClose={handleCloseEmailDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <EmailIcon sx={{ mr: 1 }} />
            Atualizar Email
          </Box>
          <IconButton onClick={handleCloseEmailDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Novo Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEmailDialog} disabled={emailLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdateEmail}
            variant="contained"
            disabled={emailLoading}
            startIcon={
              emailLoading ? <CircularProgress size={20} /> : <EmailIcon />
            }
          >
            {emailLoading ? "Atualizando..." : "Atualizar Email"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para atualizar senha */}
      <Dialog
        open={openPasswordDialog}
        onClose={handleClosePasswordDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <LockIcon sx={{ mr: 1 }} />
            Alterar Senha
          </Box>
          <IconButton onClick={handleClosePasswordDialog}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nova Senha"
            type={showPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={passwordData.password}
            onChange={(e) => setPasswordData({ ...passwordData, password: e.target.value })}
            sx={{ mt: 2, mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="dense"
            label="Confirmar Nova Senha"
            type={showConfirmPassword ? "text" : "password"}
            fullWidth
            variant="outlined"
            value={passwordData.confirmPassword}
            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClosePasswordDialog} disabled={passwordLoading}>
            Cancelar
          </Button>
          <Button
            onClick={handleUpdatePassword}
            variant="contained"
            disabled={passwordLoading}
            startIcon={
              passwordLoading ? <CircularProgress size={20} /> : <LockIcon />
            }
          >
            {passwordLoading ? "Atualizando..." : "Alterar Senha"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
