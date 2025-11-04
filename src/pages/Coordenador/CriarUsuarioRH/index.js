import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  InputAdornment,
  Divider
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  Business as BusinessIcon,
  LocationOn as LocationIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  AdminPanelSettings as RHIcon
} from "@mui/icons-material";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

export default function CriarUsuarioRH() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmepassword: "",
    territorio: "",
    cras: "",
    cpf: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (field) => (event) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
    
    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação do nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validação do email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validação da senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validação da confirmação de senha
    if (!formData.confirmepassword) {
      newErrors.confirmepassword = "Confirmação de senha é obrigatória";
    } else if (formData.password !== formData.confirmepassword) {
      newErrors.confirmepassword = "Senhas não coincidem";
    }

    // Validação do território
    if (!formData.territorio.trim()) {
      newErrors.territorio = "Território é obrigatório";
    }

    // Validação do CRAS
    if (!formData.cras.trim()) {
      newErrors.cras = "CRAS é obrigatório";
    }

    // Validação do CPF
    if (!formData.cpf.trim()) {
      newErrors.cpf = "CPF é obrigatório";
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário");
      return;
    }

    setLoading(true);

    try {
      const userData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        territorio: formData.territorio.trim(),
        cras: formData.cras.trim(),
        cpf: formData.cpf.replace(/\D/g, '') // Remove caracteres não numéricos
      };

      await axios.post("/rh", userData);
      
      toast.success("Usuário RH criado com sucesso!");
      
      // Resetar formulário
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmepassword: "",
        territorio: "",
        cras: "",
        cpf: ""
      });
      
      // Redirecionar após sucesso (opcional)
      // history.push("/coordenador/usuarios-rh");
      
    } catch (error) {
      console.error("Erro ao criar usuário RH:", error);
      
      const errorMessage = get(error, "response.data.message", "Erro ao criar usuário RH");
      toast.error(errorMessage);
      
      // Se houver erros específicos de campo do backend
      const backendErrors = get(error, "response.data.errors", {});
      if (Object.keys(backendErrors).length > 0) {
        setErrors(backendErrors);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCPF = (value) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const handleCPFChange = (event) => {
    const formatted = formatCPF(event.target.value);
    setFormData(prev => ({
      ...prev,
      cpf: formatted
    }));
    
    if (errors.cpf) {
      setErrors(prev => ({
        ...prev,
        cpf: ""
      }));
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs 
        separator={<NavigateNextIcon fontSize="small" />} 
        sx={{ mb: 3 }}
      >
        <Link 
          color="inherit" 
          href="/coordenador" 
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Coordenador
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <RHIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Criar Usuário RH
        </Typography>
      </Breadcrumbs>

      <Card elevation={3}>
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <RHIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" component="h1" gutterBottom>
              Criar Usuário RH
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Preencha os dados para criar um novo usuário do setor de Recursos Humanos
            </Typography>
          </Box>

          <Divider sx={{ mb: 4 }} />

          {/* Formulário */}
          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Nome */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Nome Completo"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  error={!!errors.name}
                  helperText={errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* CPF */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={formData.cpf}
                  onChange={handleCPFChange}
                  error={!!errors.cpf}
                  helperText={errors.cpf}
                  inputProps={{ maxLength: 14 }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Território */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Território"
                  value={formData.territorio}
                  onChange={handleInputChange('territorio')}
                  error={!!errors.territorio}
                  helperText={errors.territorio}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocationIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* CRAS */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CRAS"
                  value={formData.cras}
                  onChange={handleInputChange('cras')}
                  error={!!errors.cras}
                  helperText={errors.cras}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BusinessIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Senha */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Senha"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>

              {/* Confirmar Senha */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Confirmar Senha"
                  type="password"
                  value={formData.confirmepassword}
                  onChange={handleInputChange('confirmepassword')}
                  error={!!errors.confirmepassword}
                  helperText={errors.confirmepassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon />
                      </InputAdornment>
                    ),
                  }}
                  required
                />
              </Grid>
            </Grid>

            {/* Botões */}
            <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                size="large"
                onClick={() => history.goBack()}
                disabled={loading}
              >
                Cancelar
              </Button>
              
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <RHIcon />}
                sx={{ minWidth: 150 }}
              >
                {loading ? "Criando..." : "Criar Usuário"}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}