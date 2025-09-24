import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { get } from "lodash";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
  Paper,
  Breadcrumbs,
  Avatar,
  Alert,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  Chip
} from "@mui/material";
import {
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Badge as BadgeIcon,
  LocationOn as LocationOnIcon,
  Business as BusinessIcon,
  Home as HomeIcon,
  Save as SaveIcon,
  CheckCircle as CheckCircleIcon
} from "@mui/icons-material";

export default function RegistrarVisitador() {
  const [visitadorData, setVisitadorData] = useState({
    name: "",
    email: "",
    password: "",
    cpf: "",
    cras: "",
    territory: "",
  });

  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitadorData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post("/users/criar-visitador", visitadorData);
      toast.success("Visitador cadastrado com sucesso!");
      
      // Limpar formulário
      setVisitadorData({
        name: "",
        email: "",
        password: "",
        cpf: "",
        cras: "",
        territory: "",
      });
      setActiveStep(0);
      
      // Redirecionar após sucesso
      setTimeout(() => {
        history.push("/meus-visitadores");
      }, 2000);
    } catch (e) {
      const errors = get(e, "response.data.errors", [
        "Ocorreu um erro desconhecido.",
      ]);
      if (Array.isArray(errors)) {
        errors.forEach((error) => toast.error(error));
      } else {
        toast.error(errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return visitadorData.name && visitadorData.email && visitadorData.password;
      case 1:
        return visitadorData.cpf;
      case 2:
        return visitadorData.cras && visitadorData.territory;
      default:
        return false;
    }
  };

  const steps = [
    {
      label: 'Dados Pessoais',
      description: 'Nome, email e senha do visitador',
    },
    {
      label: 'Documentação',
      description: 'CPF do visitador',
    },
    {
      label: 'Localização',
      description: 'CRAS e território de atuação',
    },
  ];

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Button
          component="a"
          href="/"
          startIcon={<HomeIcon />}
          variant="text"
          color="primary"
        >
          Início
        </Button>
        <Button
          component="a"
          href="/meus-visitadores"
          variant="text"
          color="primary"
        >
          Meus Visitadores
        </Button>
        <Typography color="text.primary">Cadastrar Visitador</Typography>
      </Breadcrumbs>

      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar
            sx={{
              bgcolor: "rgba(255,255,255,0.2)",
              width: 56,
              height: 56,
            }}
          >
            <PersonAddIcon sx={{ fontSize: 30 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Cadastrar Visitador
            </Typography>
            <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
              Registre um novo visitador no sistema
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Formulário com Stepper */}
      <Card elevation={2} sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  <Typography variant="h6" fontWeight="bold">
                    {step.label}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Box sx={{ mt: 2, mb: 1 }}>
                    {/* Etapa 1: Dados Pessoais */}
                    {index === 0 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Nome Completo"
                            name="name"
                            value={visitadorData.name}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            value={visitadorData.email}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <EmailIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="Senha"
                            name="password"
                            type="password"
                            value={visitadorData.password}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LockIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            helperText="Mínimo 6 caracteres"
                          />
                        </Grid>
                      </Grid>
                    )}

                    {/* Etapa 2: Documentação */}
                    {index === 1 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            label="CPF"
                            name="cpf"
                            value={visitadorData.cpf}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BadgeIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            helperText="Digite apenas os números"
                          />
                        </Grid>
                      </Grid>
                    )}

                    {/* Etapa 3: Localização */}
                    {index === 2 && (
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <FormControl fullWidth required>
                            <InputLabel>CRAS</InputLabel>
                            <Select
                              name="cras"
                              value={visitadorData.cras}
                              onChange={handleInputChange}
                              label="CRAS"
                              startAdornment={
                                <InputAdornment position="start">
                                  <BusinessIcon color="action" />
                                </InputAdornment>
                              }
                            >
                              <MenuItem value="CRAS Norte">CRAS Norte</MenuItem>
                              <MenuItem value="CRAS Sul">CRAS Sul</MenuItem>
                              <MenuItem value="CRAS Leste">CRAS Leste</MenuItem>
                              <MenuItem value="CRAS Oeste">CRAS Oeste</MenuItem>
                              <MenuItem value="CRAS Centro">CRAS Centro</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            fullWidth
                            label="Território"
                            name="territory"
                            value={visitadorData.territory}
                            onChange={handleInputChange}
                            required
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOnIcon color="action" />
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                          />
                        </Grid>
                      </Grid>
                    )}
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <div>
                      {index === steps.length - 1 ? (
                        <Button
                          variant="contained"
                          onClick={handleSubmit}
                          disabled={loading || !isStepValid(index)}
                          startIcon={loading ? <CheckCircleIcon /> : <SaveIcon />}
                          sx={{
                            mr: 1,
                            background: "linear-gradient(45deg, #4CAF50, #45a049)",
                            "&:hover": {
                              background: "linear-gradient(45deg, #45a049, #3d8b40)",
                            },
                          }}
                        >
                          {loading ? "Cadastrando..." : "Cadastrar Visitador"}
                        </Button>
                      ) : (
                        <Button
                          variant="contained"
                          onClick={handleNext}
                          disabled={!isStepValid(index)}
                          sx={{ mr: 1 }}
                        >
                          Continuar
                        </Button>
                      )}
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Voltar
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>

          {/* Resumo dos dados preenchidos */}
          {activeStep > 0 && (
            <Box sx={{ mt: 4 }}>
              <Divider sx={{ mb: 3 }} />
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Resumo dos Dados
              </Typography>
              <Grid container spacing={2}>
                {visitadorData.name && (
                  <Grid item xs={12} sm={6}>
                    <Chip
                      icon={<PersonIcon />}
                      label={`Nome: ${visitadorData.name}`}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {visitadorData.email && (
                  <Grid item xs={12} sm={6}>
                    <Chip
                      icon={<EmailIcon />}
                      label={`Email: ${visitadorData.email}`}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {visitadorData.cpf && (
                  <Grid item xs={12} sm={6}>
                    <Chip
                      icon={<BadgeIcon />}
                      label={`CPF: ${visitadorData.cpf}`}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {visitadorData.cras && (
                  <Grid item xs={12} sm={6}>
                    <Chip
                      icon={<BusinessIcon />}
                      label={`CRAS: ${visitadorData.cras}`}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
                {visitadorData.territory && (
                  <Grid item xs={12} sm={6}>
                    <Chip
                      icon={<LocationOnIcon />}
                      label={`Território: ${visitadorData.territory}`}
                      variant="outlined"
                      sx={{ width: "100%" }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Informações adicionais */}
      <Alert severity="info" sx={{ mt: 3 }}>
        <Typography variant="body2">
          <strong>Importante:</strong> Após o cadastro, o visitador receberá as credenciais de acesso por email e poderá começar a utilizar o sistema imediatamente.
        </Typography>
      </Alert>
    </Container>
  );
}
