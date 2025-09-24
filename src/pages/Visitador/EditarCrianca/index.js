import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Grid,
  InputAdornment,
} from "@mui/material";
import {
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  Badge as BadgeIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "../../../services/axios";

export default function EditarCrianca({ match }) {
  const { id } = match.params;
  const history = useHistory();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [crianca, setCrianca] = useState({
    name: "",
    nis: "",
    born: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function loadCrianca() {
      try {
        setLoading(true);
        const response = await axios.get(`/crianca/${id}`);
        const { name, nis, born } = response.data;
        
        // Formatando a data para o formato do input date
        const formattedBorn = born ? new Date(born).toISOString().split('T')[0] : "";
        
        setCrianca({
          name: name || "",
          nis: nis || "",
          born: formattedBorn,
        });
      } catch (error) {
        console.error("Erro ao carregar dados da criança:", error);
        toast.error("Erro ao carregar dados da criança");
        history.goBack();
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadCrianca();
    }
  }, [id, history]);

  const validateForm = () => {
    const newErrors = {};

    if (!crianca.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (crianca.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    if (!crianca.nis.trim()) {
      newErrors.nis = "NIS é obrigatório";
    } else if (!/^\d{11}$/.test(crianca.nis.replace(/\D/g, ""))) {
      newErrors.nis = "NIS deve conter exatamente 11 dígitos";
    }

    if (!crianca.born) {
      newErrors.born = "Data de nascimento é obrigatória";
    } else {
      const birthDate = new Date(crianca.born);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      
      if (birthDate > today) {
        newErrors.born = "Data de nascimento não pode ser futura";
      } else if (age > 18) {
        newErrors.born = "Criança deve ter menos de 18 anos";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setCrianca(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleNisChange = (value) => {
    // Permitir apenas números e limitar a 11 dígitos
    const numericValue = value.replace(/\D/g, "").slice(0, 11);
    handleInputChange("nis", numericValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    try {
      setSaving(true);
      
      // Converter a data para formato ISO-8601 DateTime
      const bornDate = new Date(crianca.born);
      const bornISO = bornDate.toISOString();
      
      const updateData = {
        name: crianca.name.trim(),
        nis: crianca.nis,
        born: bornISO,
      };

      await axios.put(`/crianca/${id}`, updateData);
      
      toast.success("Dados da criança atualizados com sucesso!");
      history.goBack();
    } catch (error) {
      console.error("Erro ao atualizar criança:", error);
      
      if (error.response?.data?.errors) {
        toast.error(error.response.data.errors);
      } else {
        toast.error("Erro ao atualizar dados da criança");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress size={60} />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Button
          onClick={() => history.goBack()}
          startIcon={<ArrowBackIcon />}
          variant="text"
          color="primary"
        >
          Voltar
        </Button>
        <Typography color="text.primary">Editar Criança</Typography>
      </Breadcrumbs>

      {/* Título Principal */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)",
          color: "white",
          p: 4,
          mb: 4,
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <EditIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Editar Informações da Criança
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Atualize os dados cadastrais da criança
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Formulário */}
      <Card elevation={2}>
        <CardContent sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Nome */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  value={crianca.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  required
                />
              </Grid>

              {/* NIS */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="NIS (Número de Identificação Social)"
                  value={crianca.nis}
                  onChange={(e) => handleNisChange(e.target.value)}
                  error={!!errors.nis}
                  helperText={errors.nis || "Digite apenas números (11 dígitos)"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  inputProps={{
                    maxLength: 11,
                    pattern: "[0-9]*",
                  }}
                  required
                />
              </Grid>

              {/* Data de Nascimento */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Data de Nascimento"
                  type="date"
                  value={crianca.born}
                  onChange={(e) => handleInputChange("born", e.target.value)}
                  error={!!errors.born}
                  helperText={errors.born}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  variant="outlined"
                  required
                />
              </Grid>
            </Grid>

            {/* Botões */}
            <Box sx={{ mt: 4, display: "flex", gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="outlined"
                onClick={() => history.goBack()}
                disabled={saving}
                size="large"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={saving ? <CircularProgress size={20} /> : <SaveIcon />}
                disabled={saving}
                size="large"
                sx={{
                  background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #43a047, #5cb85c)",
                  },
                }}
              >
                {saving ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

EditarCrianca.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};