import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Avatar,
  Divider,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Tooltip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Warning as WarningIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Block as BlockIcon,
  CheckCircleOutline as ValidateIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import axios from "../../services/axios";
import { toast } from "react-toastify";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ListaFaltas() {
  const [faltas, setFaltas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todas");
  const [dateFilter, setDateFilter] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [faltasResponse, usuariosResponse] = await Promise.all([
        axios.get("/faltas/"),
        axios.get("/users/")
      ]);

      if (faltasResponse.status !== 204) {
        setFaltas(faltasResponse.data);
      }
      setUsuarios(usuariosResponse.data.users || []);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados das faltas!");
    } finally {
      setLoading(false);
    }
  };

  const getUsuarioById = (id) => {
    return usuarios.find(user => user.id === id) || { name: "Usuário não encontrado" };
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Data não informada";
    try {
      return format(parseISO(dateString), "dd/MM/yyyy", { locale: ptBR });
    } catch {
      return "Data inválida";
    }
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    action: null,
    faltaId: null,
    title: "",
    message: ""
  });

  const filteredFaltas = faltas.filter((falta) => {
    // Usar os dados aninhados se disponíveis, senão usar a função getUsuarioById
    const usuarioQueLevouFalta = falta.user || getUsuarioById(falta.userId);
    const usuarioQueRegistrou = falta.recorder || getUsuarioById(falta.recorderId);
    
    const matchesSearch = 
      usuarioQueLevouFalta.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuarioQueRegistrou.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      falta.reason.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = 
      statusFilter === "todas" ||
      (statusFilter === "ativas" && !falta.isInvalidated && !falta.isJustified) ||
      (statusFilter === "invalidadas" && falta.isInvalidated) ||
      (statusFilter === "justificadas" && falta.isJustified) ||
      (statusFilter === "pendentes" && falta.invalidationRequest && !falta.invalidationRequestAccepted);

    const matchesDate = 
      !dateFilter || 
      (falta.occurrenceDate && falta.occurrenceDate.includes(dateFilter));

    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusChip = (falta) => {
    if (falta.isInvalidated) {
      return <Chip label="Invalidada" color="error" size="small" icon={<BlockIcon />} />;
    }
    if (falta.isJustified) {
      return <Chip label="Justificada" color="success" size="small" icon={<CheckCircleIcon />} />;
    }
    if (falta.invalidationRequest && !falta.invalidationRequestAccepted) {
      return <Chip label="Pendente Invalidação" color="warning" size="small" icon={<WarningIcon />} />;
    }
    return <Chip label="Ativa" color="default" size="small" icon={<CancelIcon />} />;
  };

  const getStatsCards = () => {
    const total = faltas.length;
    const ativas = faltas.filter(f => !f.isInvalidated && !f.isJustified && !f.invalidationRequest).length;
    const invalidadas = faltas.filter(f => f.isInvalidated).length;
    const justificadas = faltas.filter(f => f.isJustified).length;
    const pendentes = faltas.filter(f => f.invalidationRequest && !f.invalidationRequestAccepted).length;

    return [
      { label: "Total", value: total, color: "#2196f3", icon: <WarningIcon /> },
      { label: "Ativas", value: ativas, color: "#9e9e9e", icon: <CancelIcon /> },
      { label: "Invalidadas", value: invalidadas, color: "#f44336", icon: <BlockIcon /> },
      { label: "Justificadas", value: justificadas, color: "#4caf50", icon: <CheckCircleIcon /> },
      { label: "Pendentes", value: pendentes, color: "#ff9800", icon: <WarningIcon /> },
    ];
  };

  const handleValidarFalta = async (id, isJustified) => {
    try {
      const data = {
        isJustified: isJustified,
        isInvalidated: !isJustified,
        justificationReason: isJustified ? "Falta justificada pelo sistema" : undefined
      };

      await axios.post("/faltas/invalidar-ou-validar", { id, data });
      
      if (isJustified) {
        toast.success("Falta validada e justificada com sucesso!");
      } else {
        toast.success("Falta invalidada com sucesso!");
      }
      
      // Atualizar a lista de faltas
      const response = await axios.get("/faltas/");
      if (response.status !== 204) {
        setFaltas(response.data);
      }
      setConfirmDialog({ ...confirmDialog, open: false });
    } catch (e) {
      toast.error("Erro ao processar falta!");
      console.error("Erro ao processar falta:", e);
    }
  };

  const openConfirmDialog = (action, faltaId, title, message) => {
    setConfirmDialog({
      open: true,
      action,
      faltaId,
      title,
      message
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Estatísticas */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {getStatsCards().map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card sx={{ height: "100%", background: `linear-gradient(135deg, ${stat.color}20, ${stat.color}10)` }}>
              <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 700, color: stat.color }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: stat.color, width: 56, height: 56 }}>
                  {stat.icon}
                </Avatar>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Filtros */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FilterIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Filtros
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              placeholder="Buscar por usuário ou motivo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={statusFilter}
                label="Status"
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <MenuItem value="todas">Todas</MenuItem>
                <MenuItem value="ativas">Ativas</MenuItem>
                <MenuItem value="invalidadas">Invalidadas</MenuItem>
                <MenuItem value="justificadas">Justificadas</MenuItem>
                <MenuItem value="pendentes">Pendente Invalidação</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              type="date"
              label="Filtrar por data"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Faltas */}
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Faltas Registradas ({filteredFaltas.length})
      </Typography>

      {filteredFaltas.length > 0 ? (
        <Grid container spacing={3}>
          {filteredFaltas.map((falta) => {
            // Usar os dados aninhados se disponíveis, senão usar a função getUsuarioById
            const usuarioQueLevouFalta = falta.user || getUsuarioById(falta.userId);
            const usuarioQueRegistrou = falta.recorder || getUsuarioById(falta.recorderId);

            return (
              <Grid item xs={12} md={6} lg={4} key={falta.id}>
                <Card sx={{ height: "100%", transition: "transform 0.2s", "&:hover": { transform: "translateY(-4px)" } }}>
                  <CardContent>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Avatar sx={{ bgcolor: "#f57c00", mr: 2, width: 40, height: 40 }}>
                          <WarningIcon />
                        </Avatar>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: "1rem" }}>
                            Falta #{falta.id}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {formatDate(falta.createdAt)}
                          </Typography>
                        </Box>
                      </Box>
                      {getStatusChip(falta)}
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Funcionário:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <PersonIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          {usuarioQueLevouFalta.name}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Motivo:
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          fontWeight: 400,
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis"
                        }}
                      >
                        {falta.reason}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Data da Ocorrência:
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CalendarIcon sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }} />
                        <Typography variant="body2">
                          {formatDate(falta.occurrenceDate)}
                        </Typography>
                      </Box>
                    </Box>

                    {falta.invalidationRequest && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Solicitação de Invalidação:
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                          {falta.invalidationRequest}
                        </Typography>
                      </Box>
                    )}

                    {falta.justificationReason && (
                      <Box sx={{ mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          Motivo da Justificativa:
                        </Typography>
                        <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
                          {falta.justificationReason}
                        </Typography>
                      </Box>
                    )}

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        Registrado por:
                      </Typography>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {usuarioQueRegistrou.name}
                      </Typography>
                    </Box>

                    {/* Botão de Ação */}
                    {!falta.isInvalidated && !falta.isJustified && (
                      <Box sx={{ mt: 2 }}>
                        <Tooltip title="Validar ou Invalidar Falta">
                          <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            startIcon={<ValidateIcon />}
                            onClick={() => openConfirmDialog(
                              'validar',
                              falta.id,
                              'Validar Falta',
                              `Escolha uma ação para a falta #${falta.id}:`
                            )}
                            fullWidth
                          >
                            Validar Falta
                          </Button>
                        </Tooltip>
                      </Box>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          {searchTerm || statusFilter !== "todas" || dateFilter
            ? "Nenhuma falta encontrada com os filtros aplicados"
            : "Nenhuma falta registrada no sistema"}
        </Alert>
      )}

      {/* Dialog de Confirmação */}
      <Dialog
        open={confirmDialog.open}
        onClose={() => setConfirmDialog({ ...confirmDialog, open: false })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {confirmDialog.title}
          <IconButton
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>{confirmDialog.message}</Typography>
          
          {confirmDialog.action === 'validar' && (
            <Box sx={{ display: 'flex', gap: 2, flexDirection: 'column' }}>
              <Button
                variant="outlined"
                color="success"
                startIcon={<ValidateIcon />}
                onClick={() => handleValidarFalta(confirmDialog.faltaId, true)}
                fullWidth
              >
                Validar Falta (Justificada)
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<BlockIcon />}
                onClick={() => handleValidarFalta(confirmDialog.faltaId, false)}
                fullWidth
              >
                Invalidar Falta
              </Button>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setConfirmDialog({ ...confirmDialog, open: false })}
            color="inherit"
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}