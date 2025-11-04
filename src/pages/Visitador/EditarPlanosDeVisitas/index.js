/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { 
  Container, 
  Paper, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  Breadcrumbs, 
  Link, 
  CircularProgress, 
  Alert, 
  Grid, 
  Divider, 
  Card, 
  CardContent, 
  Avatar, 
  Chip,
  Stack,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Assignment as PlanIcon,
  Visibility as VisibilityIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon
} from '@mui/icons-material';
import { get } from "lodash";
import axios from "../../../services/axios";
import { toast } from "react-toastify";

export default function PlanosDeVisita({ match }) {
  const { id } = match.params;
  const [formData, setFormData] = useState({
    objetivo: "",
    etapa1: "",
    etapa2: "",
    etapa3: "",
    observacao: "",
    conseguiu_fazer: "Com ajuda",
  });
  const [visitaFeita, setVisitaFeita] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function getDataPlanos() {
      try {
        setLoading(true);
        const response = await axios.get(`/planos/${id}`);
        // const { plano } = response.data;
        console.log("teste", response.data);
        setFormData({
          objetivo: response.data.objective || "",
          etapa1: response.data.etapa1 || "",
          etapa2: response.data.etapa2 || "",
          etapa3: response.data.etapa3 || "",
          observation: response.data.observation || "",
          conseguiu_fazer: response.data.realizedWithDifficulty ? "Com ajuda" : "Sem ajuda",
        });
        
        // Corrigindo para acessar os dados corretos da API
        if (response.data.geoLocatedVisits && response.data.geoLocatedVisits.length > 0) {
          setVisitaFeita(response.data.geoLocatedVisits[0]);
        } else {
          setVisitaFeita({});
        }
      } catch (error) {
        console.log(error);
        toast.error("Erro ao buscar os dados do plano.");
      } finally {
        setLoading(false);
      }
    }

    getDataPlanos();
  }, [id]);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const dataToSend = {
        objective: formData.objetivo,
        etapa1: formData.etapa1,
        etapa2: formData.etapa2,
        etapa3: formData.etapa3,
        observation: formData.observacao,
        realizedWithDifficulty: formData.conseguiu_fazer === "Com ajuda"
      };

      await axios.patch(`/planos/${id}`, dataToSend);

      toast.success("Plano editado com sucesso!");
      // history.push(`/planos/editar/${id}`);
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      }
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} sx={{ mb: 2 }}>
          <Link color="inherit" href="/" sx={{ display: 'flex', alignItems: 'center' }}>
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Link>
          <Link color="inherit" href="/planos" sx={{ display: 'flex', alignItems: 'center' }}>
            <PlanIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Planos
          </Link>
          <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
            <EditIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Editar Plano
          </Typography>
        </Breadcrumbs>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Avatar sx={{ bgcolor: '#1976d2', width: 56, height: 56 }}>
            <EditIcon />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, color: '#1976d2' }}>
              Editar Plano de Visita
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary' }}>
              Plano #{id}
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Status da Visita */}
        {visitaFeita && Object.keys(visitaFeita).length > 0 && (
          <Grid item xs={12}>
            <Card sx={{ mb: 3, border: visitaFeita.isFinished ? '2px solid #4CAF50' : '2px solid #FF9800' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <Avatar sx={{ 
                    bgcolor: visitaFeita.isFinished ? '#4CAF50' : '#FF9800',
                    width: 48,
                    height: 48
                  }}>
                    {visitaFeita.isFinished ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                  </Avatar>
                  <Box>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Status da Visita
                    </Typography>
                    <Chip
                      label={visitaFeita.isFinished ? 'Visita Concluída' : 'Visita Pendente'}
                      color={visitaFeita.isFinished ? 'success' : 'warning'}
                      sx={{ fontWeight: 500 }}
                    />
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Formulário de Edição */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
              <Avatar sx={{ bgcolor: '#1976d2' }}>
                <PlanIcon />
              </Avatar>
              <Typography variant="h5" sx={{ fontWeight: 600, color: '#1976d2' }}>
                Detalhes do Plano
              </Typography>
            </Box>

            <Divider sx={{ mb: 3 }} />

            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Objetivo"
                    name="objetivo"
                    value={formData.objetivo}
                    onChange={handleInputChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Momento 1"
                    name="etapa1"
                    value={formData.etapa1}
                    onChange={handleInputChange}
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Momento 2"
                    name="etapa2"
                    value={formData.etapa2}
                    onChange={handleInputChange}
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Momento 3"
                    name="etapa3"
                    value={formData.etapa3}
                    onChange={handleInputChange}
                    multiline
                    rows={6}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#1976d2',
                        },
                      },
                    }}
                  />
                </Grid>

                {visitaFeita.isFinished && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                         fullWidth
                         label="Observação"
                         name="observacao"
                         value={formData.observacao}
                         onChange={handleInputChange}
                         multiline
                         rows={4}
                         variant="outlined"
                         sx={{
                           '& .MuiOutlinedInput-root': {
                             '&:hover fieldset': {
                               borderColor: '#1976d2',
                             },
                           },
                         }}
                       />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <FormControl fullWidth>
                        <InputLabel>Conseguiu fazer</InputLabel>
                        <Select
                          name="conseguiu_fazer"
                          value={formData.conseguiu_fazer}
                          onChange={handleInputChange}
                          label="Conseguiu fazer"
                        >
                          <MenuItem value="Com ajuda">Com ajuda</MenuItem>
                          <MenuItem value="Sem ajuda">Sem ajuda</MenuItem>
                          <MenuItem value="Não quis fazer">Não quis fazer</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </>
                )}

                {!visitaFeita.isFinished && Object.keys(visitaFeita).length > 0 && (
                  <Grid item xs={12}>
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Você não terminou essa visita
                    </Alert>
                  </Grid>
                )}

                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      startIcon={saving ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                      disabled={saving}
                      sx={{
                        minWidth: 150,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 600,
                        py: 1.5
                      }}
                    >
                      {saving ? 'Salvando...' : 'Editar Plano'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
