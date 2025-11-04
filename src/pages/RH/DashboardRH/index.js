import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Button,
  TextField,
  InputAdornment,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Breadcrumbs,
  Link,
  Tabs,
  Tab,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  List as ListIcon,
  Dashboard as DashboardIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import ListaFaltas from "../../../components/ListaFaltas";

export default function DashboardRH() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get("/users/");
        
        if (response.data && Array.isArray(response.data)) {
          setUsuarios(response.data);
          setUsuariosFiltrados(response.data);
        }
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
        toast.error("Erro ao carregar lista de usuários");
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setUsuariosFiltrados(usuarios);
    } else {
      const filtered = usuarios.filter(
        (usuario) =>
          usuario.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          usuario.role?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUsuariosFiltrados(filtered);
    }
  }, [searchTerm, usuarios]);

  const handleRegistrarFalta = (usuario) => {
    setSelectedUser(usuario);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRoleColor = (role) => {
    switch (role?.toLowerCase()) {
      case "coordenador":
        return "error";
      case "supervisor":
        return "warning";
      case "visitador":
        return "info";
      case "rh":
        return "success";
      default:
        return "default";
    }
  };

  const getRoleLabel = (role) => {
    switch (role?.toLowerCase()) {
      case "coordenador":
        return "Coordenador";
      case "supervisor":
        return "Supervisor";
      case "visitador":
        return "Visitador";
      case "rh":
        return "RH";
      default:
        return role || "Não definido";
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header com Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link
            component={RouterLink}
            to="/"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "primary.main",
              "&:hover": { textDecoration: "underline" },
            }}
          >
            <ArrowBackIcon sx={{ mr: 0.5 }} fontSize="small" />
            Início
          </Link>
          <Typography color="text.primary">Dashboard RH</Typography>
        </Breadcrumbs>

        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: "linear-gradient(45deg, #2196f3, #21cbf3)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          Dashboard de Recursos Humanos
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie usuários e visualize faltas do sistema
        </Typography>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab
            icon={<DashboardIcon />}
            label="Dashboard de Usuários"
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
          <Tab
            icon={<ListIcon />}
            label="Lista de Faltas"
            iconPosition="start"
            sx={{ textTransform: "none", fontWeight: 600 }}
          />
        </Tabs>
      </Paper>

      {/* Conteúdo das Tabs */}
      {tabValue === 0 && (
        <>
          {/* Barra de Pesquisa */}
          <Box sx={{ mb: 4 }}>
            <TextField
              fullWidth
              placeholder="Pesquisar por nome, email ou cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
          </Box>

          {/* Estatísticas */}
          <Box sx={{ mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", py: 2 }}>
                  <CardContent>
                    <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }}>
                      {usuariosFiltrados.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total de Usuários
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", py: 2 }}>
                  <CardContent>
                    <Typography variant="h4" color="success.main" sx={{ fontWeight: 700 }}>
                      {usuariosFiltrados.filter(u => u.isActive).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuários Ativos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", py: 2 }}>
                  <CardContent>
                    <Typography variant="h4" color="warning.main" sx={{ fontWeight: 700 }}>
                      {usuariosFiltrados.filter(u => !u.isActive).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Usuários Inativos
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Card sx={{ textAlign: "center", py: 2 }}>
                  <CardContent>
                    <Typography variant="h4" color="info.main" sx={{ fontWeight: 700 }}>
                      {usuariosFiltrados.filter(u => u.role === "visitador").length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visitadores
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          {/* Lista de Usuários */}
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Lista de Funcionários
          </Typography>

          {usuariosFiltrados.length > 0 ? (
            <Grid container spacing={3}>
              {usuariosFiltrados.map((usuario) => (
                <Grid item xs={12} md={6} lg={4} key={usuario.id}>
                  <Card sx={{ height: "100%", position: "relative" }}>
                    <CardContent>
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Avatar
                          sx={{
                            bgcolor: getRoleColor(usuario.role) + ".main",
                            mr: 2,
                            width: 56,
                            height: 56,
                          }}
                        >
                          <PersonIcon />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                            {usuario.name || "Nome não informado"}
                          </Typography>
                          <Chip
                            label={getRoleLabel(usuario.role)}
                            color={getRoleColor(usuario.role)}
                            size="small"
                            sx={{ mb: 1 }}
                          />
                          <Box>
                            <Chip
                              label={usuario.isActive ? "Ativo" : "Inativo"}
                              color={usuario.isActive ? "success" : "default"}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Email:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500, mb: 1 }}>
                          {usuario.email || "Não informado"}
                        </Typography>
                        
                        {usuario.telefone && (
                          <>
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                              Telefone:
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 500 }}>
                              {usuario.telefone}
                            </Typography>
                          </>
                        )}
                      </Box>

                      <Button
                        variant="contained"
                        color="warning"
                        fullWidth
                        startIcon={<WarningIcon />}
                        onClick={() => handleRegistrarFalta(usuario)}
                        disabled={!usuario.isActive}
                        sx={{
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                        }}
                      >
                        Registrar Falta
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Alert severity="info" sx={{ textAlign: "center" }}>
              {searchTerm ? "Nenhum usuário encontrado com os critérios de busca" : "Nenhum usuário encontrado no sistema"}
            </Alert>
          )}
        </>
      )}

      {/* Tab de Lista de Faltas */}
      {tabValue === 1 && <ListaFaltas />}

      {/* Dialog de Confirmação */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <WarningIcon sx={{ mr: 1, color: "warning.main" }} />
            Registrar Falta
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedUser && (
            <Box>
              <Typography variant="body1" sx={{ mb: 2 }}>
                Você será redirecionado para a página de registro de falta para:
              </Typography>
              <Box sx={{ p: 2, bgcolor: "grey.50", borderRadius: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {selectedUser.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedUser.email}
                </Typography>
                <Chip
                  label={getRoleLabel(selectedUser.role)}
                  color={getRoleColor(selectedUser.role)}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancelar
          </Button>
          <Button
            component={RouterLink}
            to={`/faltas/criar/${selectedUser?.id}`}
            variant="contained"
            color="warning"
            startIcon={<AddIcon />}
            onClick={handleCloseDialog}
          >
            Prosseguir
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}