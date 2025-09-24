import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
  Badge,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  People as PeopleIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  PersonOff as PersonOffIcon,
  Assignment as AssignmentIcon,
  AdminPanelSettings as AdminIcon,
  SupervisorAccount as SupervisorIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import searchAllUsers from "../../utils/Adm/searchAllUsers";

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-tabpanel-${index}`}
      aria-labelledby={`admin-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default function AdministrativoCoordenador() {
  const [user, setUser] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [faltas, setFaltas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedFalta, setSelectedFalta] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [faltasResponse, usersResponse] = await Promise.all([
          axios.get("/faltas/"),
          axios.get("/users/")
        ]);
        
        if (faltasResponse.status !== 204) {
          setFaltas(faltasResponse.data);
        }
        setUser(usersResponse.data);
      } catch (e) {
        toast.error("Erro ao carregar dados!");
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const faltasParaInvalidar = faltas.filter(
    (f) => f.invalidationRequest !== null && f.isInvalidated
  );

  const handleInvalidarFalta = async (id) => {
    if (!id) return;

    try {
      await axios.post("/faltas/invalidar-falta", { id });
      toast.success("Falta invalidada com sucesso!");
      
      // Atualizar a lista de faltas
      const response = await axios.get("/faltas/");
      if (response.status !== 204) {
        setFaltas(response.data);
      }
      setOpenDialog(false);
    } catch (e) {
      toast.error("Erro ao invalidar falta!");
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'coordenador':
        return <AdminIcon />;
      case 'supervisor':
        return <SupervisorIcon />;
      case 'visitador':
        return <PersonIcon />;
      default:
        return <PersonIcon />;
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'coordenador':
        return '#d32f2f';
      case 'supervisor':
        return '#1976d2';
      case 'visitador':
        return '#388e3c';
      default:
        return '#757575';
    }
  };

  searchAllUsers(setAllUsers);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando dados administrativos...
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #308C50, #11B4D9)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
          }}
        >
          Painel Administrativo
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie usuários, faltas e solicitações do sistema
        </Typography>
      </Box>

      {/* Tabs Navigation */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '1rem',
              fontWeight: 600,
            },
          }}
        >
          <Tab
            icon={<Badge badgeContent={allUsers.length} color="primary"><PeopleIcon /></Badge>}
            label="Usuários do Sistema"
            iconPosition="start"
          />
          <Tab
            icon={<Badge badgeContent={faltas.length} color="secondary"><AssignmentIcon /></Badge>}
            label="Faltas Registradas"
            iconPosition="start"
          />
          <Tab
            icon={<Badge badgeContent={faltasParaInvalidar.length} color="error"><WarningIcon /></Badge>}
            label="Pedidos de Invalidação"
            iconPosition="start"
          />
        </Tabs>
      </Paper>

      {/* Tab Panels */}
      <TabPanel value={tabValue} index={0}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Todos os Funcionários do Sistema
        </Typography>
        
        {allUsers.length > 0 ? (
          <Grid container spacing={3}>
            {allUsers.map((usuario) => (
              <Grid item xs={12} md={6} lg={4} key={usuario.id}>
                <Card
                  sx={{
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: getRoleColor(usuario.role),
                          mr: 2,
                          width: 56,
                          height: 56,
                        }}
                      >
                        {getRoleIcon(usuario.role)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {usuario.name}
                        </Typography>
                        <Chip
                          label={usuario.role}
                          size="small"
                          sx={{
                            bgcolor: getRoleColor(usuario.role),
                            color: 'white',
                            fontWeight: 600,
                            textTransform: 'capitalize',
                          }}
                        />
                      </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary">
                        Status da Conta:
                      </Typography>
                      <Chip
                        label={usuario.isActive ? "Ativa" : "Desativada"}
                        color={usuario.isActive ? "success" : "error"}
                        size="small"
                        sx={{ mt: 0.5 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {usuario.role === "supervisor" && (
                        <Button
                          component={Link}
                          to={`/meus-supervisores/detalhes/${usuario.id}`}
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          fullWidth
                        >
                          Ver Detalhes
                        </Button>
                      )}
                      
                      {usuario.role === "visitador" && (
                        <Button
                          component={Link}
                          to={`/coordenador/visitadores/detalhes/${usuario.id}`}
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          fullWidth
                        >
                          Ver Detalhes
                        </Button>
                      )}
                      
                      {usuario.role !== "coordenador" && (
                        <>
                          <Button
                            component={Link}
                            to={`/faltas/criar/${usuario.id}`}
                            variant="contained"
                            size="small"
                            startIcon={<WarningIcon />}
                            color="warning"
                            fullWidth
                          >
                            Gerar Falta
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<PersonOffIcon />}
                            color="error"
                            fullWidth
                          >
                            Desativar Conta
                          </Button>
                        </>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Nenhum usuário encontrado no sistema
          </Alert>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Faltas Registradas no Sistema
        </Typography>
        
        {faltas.length > 0 ? (
          <Grid container spacing={3}>
            {faltas.map((falta) => {
              const usuarioQueDeuFalta = user.find(u => u.id === falta.registradorId);
              const usuarioQueLevouFalta = user.find(u => u.id === falta.userId);

              return (
                <Grid item xs={12} md={6} key={falta.id}>
                  <Card sx={{ height: '100%' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ bgcolor: '#f57c00', mr: 2 }}>
                          <WarningIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Falta Registrada
                          </Typography>
                          <Chip
                            label={falta.falta_invalidada ? "Invalidada" : "Ativa"}
                            color={falta.falta_invalidada ? "success" : "warning"}
                            size="small"
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Motivo da Falta:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {falta.motivo_da_falta}
                        </Typography>
                      </Box>

                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Funcionário que recebeu a falta:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {usuarioQueLevouFalta ? usuarioQueLevouFalta.name : "Não informado"}
                        </Typography>
                      </Box>

                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Registrado por:
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {usuarioQueDeuFalta ? usuarioQueDeuFalta.name : "Usuário não encontrado"}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        ) : (
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Nenhuma falta registrada no sistema
          </Alert>
        )}
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Pedidos de Invalidação de Faltas
        </Typography>
        
        {faltasParaInvalidar.length > 0 ? (
          <List>
            {faltasParaInvalidar.map((falta) => {
              const usuarioQueLevouFalta = user.find(u => u.id === falta.userId);

              return (
                <Paper key={falta.id} sx={{ mb: 2 }}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: '#d32f2f' }}>
                        <WarningIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          Solicitação de {usuarioQueLevouFalta ? usuarioQueLevouFalta.name : "Usuário não encontrado"}
                        </Typography>
                      }
                      secondary={
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                            Motivo para invalidar:
                          </Typography>
                          <Typography variant="body1" sx={{ mb: 2 }}>
                            {falta.pedir_para_invalidar_falta}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                          variant="contained"
                          color="success"
                          startIcon={<CheckCircleIcon />}
                          onClick={() => {
                            setSelectedFalta(falta);
                            setOpenDialog(true);
                          }}
                        >
                          Aprovar
                        </Button>
                        <Button
                          variant="outlined"
                          color="error"
                          startIcon={<CancelIcon />}
                        >
                          Rejeitar
                        </Button>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Paper>
              );
            })}
          </List>
        ) : (
          <Alert severity="info" sx={{ textAlign: 'center' }}>
            Não há pedidos para invalidar faltas
          </Alert>
        )}
      </TabPanel>

      {/* Dialog de Confirmação */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmar Invalidação de Falta</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza que deseja invalidar esta falta? Esta ação não pode ser desfeita.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
          <Button
            onClick={() => handleInvalidarFalta(selectedFalta?.id)}
            variant="contained"
            color="success"
          >
            Confirmar Invalidação
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
