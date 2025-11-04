import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  InputAdornment,
  Box,
  Chip,
  Avatar,
  Alert,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  FormHelperText,
} from "@mui/material";
import {
  Search as SearchIcon,
  PersonAdd as PersonAddIcon,
  PregnantWoman as PregnantWomanIcon,
  Person as PersonIcon,
  LocationOn as LocationOnIcon,
  Home as HomeIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

export default function BuscarCuidadoresDosVisitadores() {
  const [cuidadores, setCuidadores] = useState([]);
  const [filteredCuidadores, setFilteredCuidadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPregnant, setFilterPregnant] = useState("all");
  const [dialogOpenId, setDialogOpenId] = useState(null);
  const [pregnantInput, setPregnantInput] = useState(false);
  const [weeksInput, setWeeksInput] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get("/cuidador/meus-cuidadores");
        setCuidadores(response.data);
        setFilteredCuidadores(response.data);
      } catch (error) {
        console.error("Erro ao buscar cuidadores:", error);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  useEffect(() => {
    let filtered = cuidadores;

    // Filtro por termo de busca
    if (searchTerm) {
      filtered = filtered.filter((cuidador) =>
        cuidador.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (cuidador.address && cuidador.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (cuidador.district && cuidador.district.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filtro por gravidez
    if (filterPregnant !== "all") {
      filtered = filtered.filter((cuidador) =>
        filterPregnant === "pregnant" ? cuidador.pregnant : !cuidador.pregnant
      );
    }

    setFilteredCuidadores(filtered);
  }, [searchTerm, filterPregnant, cuidadores]);

  const handleClearFilters = () => {
    setSearchTerm("");
    setFilterPregnant("all");
  };

  const getPregnancyWeeksText = (weeks) => {
    if (!weeks) return "";
    return weeks === 1 ? "1 semana" : `${weeks} semanas`;
  };

  const openUpdateDialog = (cuidador) => {
    setDialogOpenId(cuidador.id);
    setPregnantInput(!!cuidador.pregnant);
    setWeeksInput(Number(cuidador.week_pregnant || 0));
  };

  const closeDialog = () => {
    setDialogOpenId(null);
    setPregnantInput(false);
    setWeeksInput(0);
    setSubmitting(false);
  };

  const handleSubmitPregnant = async () => {
    if (!dialogOpenId) return;
    try {
      setSubmitting(true);
      const payload = {
        pregnant: pregnantInput,
        weekPregnant: pregnantInput ? Number(weeksInput || 0) : null,
      };
      const { data } = await axios.patch(`/cuidador/${dialogOpenId}/pregnant`, payload);
      // Atualiza estado local
      setCuidadores((prev) => prev.map((c) => (
        c.id === dialogOpenId
          ? { ...c, pregnant: data.pregnant ?? pregnantInput, week_pregnant: data.week_pregnant ?? payload.weekPregnant }
          : c
      )));
      setFilteredCuidadores((prev) => prev.map((c) => (
        c.id === dialogOpenId
          ? { ...c, pregnant: data.pregnant ?? pregnantInput, week_pregnant: data.week_pregnant ?? payload.weekPregnant }
          : c
      )));
      closeDialog();
    } catch (error) {
      console.error("Erro ao atualizar gravidez:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
          <Typography variant="h6" color="text.secondary">
            Carregando cuidadores...
          </Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Cabeçalho */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" color="primary">
          Meus Cuidadores
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Gerencie e visualize informações dos cuidadores sob sua responsabilidade
        </Typography>
      </Box>

      {/* Filtros e Busca */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Box display="flex" alignItems="center" gap={2} mb={2}>
          <FilterListIcon color="primary" />
          <Typography variant="h6" fontWeight="bold">
            Filtros e Busca
          </Typography>
          {(searchTerm || filterPregnant !== "all") && (
            <Tooltip title="Limpar filtros">
              <IconButton onClick={handleClearFilters} size="small">
                <ClearIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Buscar por nome, endereço ou bairro..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Status de Gravidez</InputLabel>
              <Select
                value={filterPregnant}
                label="Status de Gravidez"
                onChange={(e) => setFilterPregnant(e.target.value)}
              >
                <MenuItem value="all">Todos</MenuItem>
                <MenuItem value="pregnant">Gestantes</MenuItem>
                <MenuItem value="not_pregnant">Não Gestantes</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Estatísticas */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="primary" fontWeight="bold">
                {filteredCuidadores.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total de Cuidadores
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="success.main" fontWeight="bold">
                {filteredCuidadores.filter(c => c.pregnant).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gestantes
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box textAlign="center">
              <Typography variant="h3" color="info.main" fontWeight="bold">
                {filteredCuidadores.filter(c => !c.pregnant).length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Não Gestantes
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Lista de Cuidadores */}
      {filteredCuidadores.length > 0 ? (
        <Grid container spacing={3}>
          {filteredCuidadores.map((cuidador) => (
            <Grid item xs={12} sm={6} md={4} key={cuidador.id}>
              <Card 
                elevation={3} 
                sx={{ 
                  height: "100%", 
                  display: "flex", 
                  flexDirection: "column",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                  },
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  {/* Cabeçalho do Card */}
                  <Box display="flex" alignItems="center" gap={2} mb={2}>
                    <Avatar 
                      sx={{ 
                        bgcolor: cuidador.pregnant ? "success.main" : "primary.main",
                        width: 48,
                        height: 48,
                      }}
                    >
                      {cuidador.pregnant ? <PregnantWomanIcon /> : <PersonIcon />}
                    </Avatar>
                    <Box flexGrow={1}>
                      <Typography variant="h6" fontWeight="bold" noWrap>
                        {cuidador.name}
                      </Typography>
                      <Chip
                        label={cuidador.pregnant ? "Gestante" : "Cuidador(a)"}
                        color={cuidador.pregnant ? "success" : "primary"}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  {/* Informações do Cuidador */}
                  <Box mb={2}>
                    {cuidador.pregnant && cuidador.week_pregnant && (
                      <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <PregnantWomanIcon fontSize="small" color="success" />
                        <Typography variant="body2" color="success.main" fontWeight="bold">
                          {getPregnancyWeeksText(cuidador.week_pregnant)} de gestação
                        </Typography>
                      </Box>
                    )}
                    
                    <Box display="flex" alignItems="center" gap={1} mb={1}>
                      <HomeIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {cuidador.address || "Endereço não informado"}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {cuidador.district || "Bairro não informado"}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>

                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={`/crianca/cadastrar/${cuidador.id}`}
                    variant="contained"
                    startIcon={<PersonAddIcon />}
                    fullWidth
                    sx={{
                      background: "linear-gradient(45deg, #11B4D9, #308C50)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #0ea5c7, #2a7a45)",
                      },
                    }}
                  >
                    Adicionar Criança
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<PregnantWomanIcon />}
                    fullWidth
                    onClick={() => openUpdateDialog(cuidador)}
                    sx={{
                      mt: 1,
                      background: "linear-gradient(45deg, #F06292, #9C27B0)",
                      "&:hover": {
                        background: "linear-gradient(45deg, #ec407a, #7b1fa2)",
                      },
                    }}
                  >
                    Atualizar Gravidez
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert severity="info" sx={{ textAlign: "center" }}>
          {searchTerm || filterPregnant !== "all" 
            ? "Nenhum cuidador encontrado com os filtros aplicados." 
            : "Nenhum cuidador encontrado."}
        </Alert>
      )}

      {/* Diálogo de Atualização de Gravidez */}
      <Dialog open={!!dialogOpenId} onClose={closeDialog} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            background: "linear-gradient(90deg, #F06292, #9C27B0)",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Atualizar Gravidez do Cuidador
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Está gestante?
              </Typography>
              <FormHelperText>
                Ative para marcar como gestante
              </FormHelperText>
            </Box>
            <Switch
              checked={pregnantInput}
              onChange={(e) => setPregnantInput(e.target.checked)}
              color="secondary"
            />
          </Box>

          {pregnantInput && (
            <TextField
              type="number"
              label="Semanas de Gestação"
              value={weeksInput}
              onChange={(e) => setWeeksInput(e.target.value)}
              fullWidth
              inputProps={{ min: 0, max: 42 }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={closeDialog} variant="outlined">
            Cancelar
          </Button>
          <Button
            onClick={handleSubmitPregnant}
            disabled={submitting}
            variant="contained"
            startIcon={<PregnantWomanIcon />}
            sx={{
              background: "linear-gradient(45deg, #F06292, #9C27B0)",
              "&:hover": {
                background: "linear-gradient(45deg, #ec407a, #7b1fa2)",
              },
            }}
          >
            {submitting ? "Salvando..." : "Salvar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
