import React, { useEffect, useMemo, useState } from "react";
import axios from "../../../services/axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  CircularProgress,
  Alert,
  Breadcrumbs,
  InputAdornment,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Search as SearchIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
} from "@mui/icons-material";

export default function CoordenadorCuidadores() {
  const [caregivers, setCaregivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [expanded, setExpanded] = useState({});
  const [childrenByCaregiver, setChildrenByCaregiver] = useState({});
  const [loadingChildren, setLoadingChildren] = useState({});
  const [confirm, setConfirm] = useState({ open: false, type: null, caregiverId: null, childId: null });

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        // Coordenador: listar todos os cuidadores ativos com children e visitor
        const response = await axios.get("/cuidador/");
        const data = Array.isArray(response.data) ? response.data : [];
        setCaregivers(data);
        const index = {};
        data.forEach((c) => {
          if (Array.isArray(c.children) && c.children.length > 0) {
            index[c.id] = c.children;
          }
        });
        setChildrenByCaregiver(index);
      } catch (error) {
        const mainMessage = error?.response?.data?.message || "Falha ao carregar cuidadores.";
        toast.error(mainMessage);
        const errs = error?.response?.data?.errors;
        if (Array.isArray(errs)) errs.forEach((m) => typeof m === "string" && m && toast.error(m));
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const filteredCaregivers = useMemo(() => {
    if (!searchTerm) return caregivers;
    const term = searchTerm.toLowerCase();
    return caregivers.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(term)) ||
        (c.address && c.address.toLowerCase().includes(term)) ||
        (c.district && c.district.toLowerCase().includes(term))
    );
  }, [caregivers, searchTerm]);

  const toggleExpand = async (caregiverId) => {
    setExpanded((prev) => ({ ...prev, [caregiverId]: !prev[caregiverId] }));
    const isExpanding = !expanded[caregiverId];
    if (isExpanding && !childrenByCaregiver[caregiverId]) {
      try {
        setLoadingChildren((prev) => ({ ...prev, [caregiverId]: true }));
        const caregiver = caregivers.find((c) => c.id === caregiverId);
        const lista = Array.isArray(caregiver?.children) ? caregiver.children : [];
        setChildrenByCaregiver((prev) => ({ ...prev, [caregiverId]: lista }));
      } catch (error) {
        const mainMessage = error?.response?.data?.message || "Falha ao carregar crianças do cuidador.";
        toast.error(mainMessage);
        const errs = error?.response?.data?.errors;
        if (Array.isArray(errs)) errs.forEach((m) => typeof m === "string" && m && toast.error(m));
      } finally {
        setLoadingChildren((prev) => ({ ...prev, [caregiverId]: false }));
      }
    }
  };

  const desligarCaregiver = async (caregiverId) => {
    try {
      await axios.delete(`/cuidador/${caregiverId}`);
      toast.success("Cuidador desligado do programa.");
      setCaregivers((prev) => prev.filter((c) => c.id !== caregiverId));
      setExpanded((prev) => {
        const { [caregiverId]: _, ...rest } = prev;
        return rest;
      });
      setChildrenByCaregiver((prev) => {
        const { [caregiverId]: _, ...rest } = prev;
        return rest;
      });
    } catch (error) {
      const mainMessage = error?.response?.data?.message || "Falha ao desligar cuidador.";
      toast.error(mainMessage);
      const errs = error?.response?.data?.errors;
      if (Array.isArray(errs)) errs.forEach((m) => typeof m === "string" && m && toast.error(m));
    }
  };

  const desligarCrianca = async (childId, caregiverId) => {
    try {
      await axios.delete(`/crianca/${childId}`);
      toast.success("Criança desligada do programa.");
      setChildrenByCaregiver((prev) => {
        const lista = prev[caregiverId] || [];
        return { ...prev, [caregiverId]: lista.filter((c) => c.id !== childId) };
      });
    } catch (error) {
      const mainMessage = error?.response?.data?.message || "Falha ao desligar criança.";
      toast.error(mainMessage);
      const errs = error?.response?.data?.errors;
      if (Array.isArray(errs)) errs.forEach((m) => typeof m === "string" && m && toast.error(m));
    }
  };

  const openConfirmCaregiver = (id) => setConfirm({ open: true, type: "caregiver", caregiverId: id, childId: null });
  const openConfirmChild = (childId, caregiverId) => setConfirm({ open: true, type: "child", caregiverId, childId });
  const handleConfirmClose = () => setConfirm({ open: false, type: null, caregiverId: null, childId: null });
  const handleConfirmProceed = async () => {
    if (confirm.type === "caregiver" && confirm.caregiverId) {
      await desligarCaregiver(confirm.caregiverId);
    }
    if (confirm.type === "child" && confirm.childId && confirm.caregiverId) {
      await desligarCrianca(confirm.childId, confirm.caregiverId);
    }
    handleConfirmClose();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container>
      <Box sx={{ maxWidth: 1280, mx: "auto", p: 2 }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Typography color="text.secondary">Início</Typography>
          <Typography color="text.primary">Cuidadores</Typography>
        </Breadcrumbs>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
            Cuidadores
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Listagem de cuidadores ativos e crianças vinculadas
          </Typography>
        </Box>

        <Card elevation={1} sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <TextField
                label="Buscar cuidadores"
                placeholder="Buscar por nome, endereço ou bairro..."
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="disabled" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          </CardContent>
        </Card>

        {filteredCaregivers.length === 0 ? (
          <Alert severity="info" sx={{ textAlign: "center" }}>
            Nenhum cuidador encontrado.
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {filteredCaregivers.map((c) => {
              const isExp = !!expanded[c.id];
              const children = childrenByCaregiver[c.id] || [];
              const isLoadingChildren = !!loadingChildren[c.id];
              return (
                <Grid item xs={12} md={6} lg={6} key={c.id}>
                  <Card sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: 1 }}>
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ mb: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }} noWrap>
                          {c.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {c.pregnant ? "Gestante" : "Não gestante"}
                          {Array.isArray(c.children) ? ` • ${c.children.length} crianças` : ""}
                          {c.visitor?.name ? ` • Visitador: ${c.visitor.name}` : ""}
                        </Typography>
                        {typeof c.isActive === "boolean" && !c.isActive && (
                          <Typography variant="caption" sx={{ color: 'error.main' }}>
                            Desligado do programa
                          </Typography>
                        )}
                      </Box>

                      <Accordion
                        expanded={isExp}
                        onChange={() => toggleExpand(c.id)}
                        sx={{ mt: 1, '&:before': { display: 'none' } }}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 1 }}>
                          <Typography sx={{ fontWeight: 600 }}>Crianças vinculadas ({Array.isArray(c.children) ? `${c.children.length}` : "0"})</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {isLoadingChildren ? (
                            <Box display="flex" justifyContent="center" alignItems="center" py={2}>
                              <CircularProgress size={24} />
                            </Box>
                          ) : children.length === 0 ? (
                            <Typography variant="body2" color="text.secondary">
                              Nenhuma criança vinculada a este cuidador.
                            </Typography>
                          ) : (
                            <Grid container spacing={1.5}>
                              {children.map((child) => (
                                <Grid item xs={12} key={child.id}>
                                  <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                      <Box sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                          {child.name}
                                        </Typography>
                                        {child.idade && (
                                          <Typography variant="caption" color="text.secondary">
                                            Idade: {child.idade}
                                          </Typography>
                                        )}
                                        {typeof child.isActive === "boolean" && !child.isActive && (
                                          <Typography variant="caption" sx={{ color: 'error.main' }}>
                                            Desligado do programa
                                          </Typography>
                                        )}
                                      </Box>
                                      <Box sx={{ display: "flex", gap: 1.5 }}>
                                        <Button
                                          component={Link}
                                          to={`/crianca/${child.id}`}
                                          variant="outlined"
                                          size="small"
                                        >
                                          Detalhes
                                        </Button>
                                        <Button
                                          variant="contained"
                                          color="error"
                                          size="small"
                                          startIcon={<DeleteIcon />}
                                          onClick={() => openConfirmChild(child.id, c.id)}
                                        >
                                          Desligar
                                        </Button>
                                      </Box>
                                    </Box>
                                  </Card>
                                </Grid>
                              ))}
                            </Grid>
                          )}
                        </AccordionDetails>
                      </Accordion>
                    </CardContent>
                    <CardActions sx={{ p: 2, pt: 0 }}>
                      <Button
                        component={Link}
                        to={`/crianca/cadastrar/${c.id}`}
                        variant="outlined"
                        size="small"
                      >
                        Adicionar Criança
                      </Button>
                      <Button
                        component={Link}
                        to={`/planos/planos-da-gestante/${c.id}`}
                        variant="outlined"
                        size="small"
                        startIcon={<VisibilityIcon />}
                        sx={{ ml: 1 }}
                      >
                        Ver planos da gestante
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={() => openConfirmCaregiver(c.id)}
                        sx={{ ml: "auto" }}
                      >
                        Desligar Cuidador
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        )}
        <Dialog open={confirm.open} onClose={handleConfirmClose}>
          <DialogTitle>Confirmar desligamento</DialogTitle>
          <DialogContent>
            <Typography>
              {confirm.type === "caregiver"
                ? "Tem certeza que deseja desligar este cuidador do programa?"
                : "Tem certeza que deseja desligar esta criança do programa?"}
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleConfirmClose}>Cancelar</Button>
            <Button color="error" variant="contained" onClick={handleConfirmProceed}>Desligar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
}