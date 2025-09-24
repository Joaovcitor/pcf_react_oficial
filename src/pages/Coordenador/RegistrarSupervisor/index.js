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
  AdminPanelSettings as AdminIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon
} from "@mui/icons-material";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

export default function RegistrarSupervisor() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmepassword: "",
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

    if (formData.name.length < 3 || formData.name.length > 255) {
      newErrors.name = "Nome deve ter entre 3 a 255 caracteres";
    }

    if (!isEmail(formData.email)) {
      newErrors.email = "E-mail inválido";
    }

    if (formData.password.length < 3 || formData.password.length > 255) {
      newErrors.password = "Senha deve ter entre 3 a 255 caracteres";
    }

    if (formData.cpf.length !== 11) {
      newErrors.cpf = "CPF deve ter 11 dígitos";
    }

    if (formData.password !== formData.confirmepassword) {
      newErrors.confirmepassword = "Senhas não são iguais";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await axios.post("/users/criar-supervisor", {
        name: formData.name,
        password: formData.password,
        email: formData.email,
        cpf: formData.cpf,
        confirmepassword: formData.confirmepassword,
        territorio: "quixada",
      });

      toast.success("Supervisor cadastrado com sucesso!");
      history.push("/");
    } catch (e) {
      const serverErrors = get(e, "response.data.errors", "");
      if (typeof serverErrors === "string") {
        toast.error(serverErrors);
      } else if (Array.isArray(serverErrors)) {
        serverErrors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof serverErrors === "object") {
        Object.values(serverErrors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
      }
    } finally {
      setLoading(false);
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
          underline="hover" 
          color="inherit" 
          href="/"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Início
        </Link>
        <Typography color="text.primary" sx={{ display: 'flex', alignItems: 'center' }}>
          <AdminIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Cadastrar Supervisor
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 3, 
          mb: 3, 
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <AdminIcon sx={{ fontSize: 40 }} />
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Cadastrar Novo Supervisor
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Preencha os dados para criar uma nova conta de supervisor
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Formulário */}
      <Card elevation={2} sx={{ borderRadius: 2 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Nome */}
              <Grid item xs={12}>
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
                        <PersonIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Digite o nome completo do supervisor"
                />
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="email"
                  label="E-mail"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  error={!!errors.email}
                  helperText={errors.email}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Digite o e-mail do supervisor"
                />
              </Grid>

              {/* CPF */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="CPF"
                  value={formData.cpf}
                  onChange={handleInputChange('cpf')}
                  error={!!errors.cpf}
                  helperText={errors.cpf}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BadgeIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Digite o CPF (apenas números)"
                  inputProps={{ maxLength: 11 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Dados de Acesso
                  </Typography>
                </Divider>
              </Grid>

              {/* Senha */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Senha"
                  value={formData.password}
                  onChange={handleInputChange('password')}
                  error={!!errors.password}
                  helperText={errors.password}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Digite a senha"
                />
              </Grid>

              {/* Confirmar Senha */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="password"
                  label="Confirmar Senha"
                  value={formData.confirmepassword}
                  onChange={handleInputChange('confirmepassword')}
                  error={!!errors.confirmepassword}
                  helperText={errors.confirmepassword}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                  placeholder="Confirme a senha"
                />
              </Grid>

              {/* Botões */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={() => history.push("/")}
                    disabled={loading}
                    size="large"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    size="large"
                    startIcon={loading ? <CircularProgress size={20} /> : <AdminIcon />}
                    sx={{ minWidth: 150 }}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar Supervisor"}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>

      {/* Informações adicionais */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Importante:</strong> O supervisor terá acesso ao sistema para gerenciar visitadores 
          e acompanhar as atividades do território de Quixadá.
        </Typography>
      </Alert>
    </Container>
  );
}
