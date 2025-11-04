import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { get } from "lodash";

// Material-UI imports
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";

// Material-UI icons
import {
  PersonAdd as PersonAddIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Person as PersonIcon,
  Badge as BadgeIcon,
  Wc as GenderIcon,
  CalendarToday as CalendarIcon,
  ChildCare as ChildCareIcon,
  NavigateNext as NextIcon,
  NavigateBefore as BackIcon,
} from "@mui/icons-material";

// eslint-disable-next-line react/prop-types
export default function CadastrarCrianca({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  
  // Estados do formulário
  const [name, setNome] = useState("");
  const [nis, setNis] = useState("");
  const [isBpc, setBpc] = useState(false);
  const [sexo, setSexo] = useState("");
  const [born, setDataNascimento] = useState("");
  const [cuidador, setCaregiver] = useState("");
  
  // Estados de controle
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  
  // Definição das etapas
  const steps = [
    {
      label: "Dados Pessoais",
      description: "Nome e informações básicas da criança",
    },
    {
      label: "Informações Específicas", 
      description: "Sexo, NIS e benefícios",
    },
    {
      label: "Data de Nascimento",
      description: "Confirme a data de nascimento",
    },
  ];

  const handleCheckboxChange = (e) => {
    setBpc(e.target.checked);
  };

  const handleNext = () => {
    if (isStepValid(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return name.length >= 3 && name.length <= 255;
      case 1:
        return sexo !== "" && nis !== "";
      case 2:
        return born !== "";
      default:
        return false;
    }
  };

  React.useEffect(() => {
    async function getData() {
      const response = await axios.get(`/cuidador/${id}`);
      setCaregiver(response.data);
    }

    getData();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    // Validações mais robustas
    const errors = [];
    
    if (!name || name.length < 3 || name.length > 255) {
      errors.push("Nome deve ter entre 3 a 255 caracteres");
    }
    
    if (!sexo) {
      errors.push("Selecione o sexo da criança");
    }
    
    if (!born) {
      errors.push("Data de nascimento é obrigatória");
    }
    
    if (!nis) {
      errors.push("NIS é obrigatório");
    }

    if (errors.length > 0) {
      errors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);

    const dataFormatada = new Date(born).toISOString();

    try {
      await axios.post(`/crianca/${id}`, {
        name: name.trim(),
        sexo,
        isBpc,
        born: dataFormatada,
        nis: nis.trim(),
        caregiverId: id,
      });

      toast.success("Criança cadastrada com sucesso!");
      history.push("/");
    } catch (e) {
      const errors = get(e, "response.data.errors", "");
      if (typeof errors === "string") {
        toast.error(errors);
      } else if (Array.isArray(errors)) {
        errors.forEach((error) => {
          toast.error(error);
        });
      } else if (typeof errors === "object") {
        Object.values(errors).forEach((error) => {
          if (typeof error === "string") {
            toast.error(error);
          }
        });
      } else {
        toast.error("Erro ao cadastrar criança");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => history.goBack()}
          sx={{ mb: 2 }}
        >
          Voltar
        </Button>
        
        <Card elevation={3}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "primary.main" }}>
                <ChildCareIcon />
              </Avatar>
            }
            title={
              <Typography variant="h5" component="h1">
                Cadastrar Criança
              </Typography>
            }
            subheader={
              cuidador.name && (
                <Typography variant="subtitle1" color="text.secondary">
                  Cuidador(a): <strong>{cuidador.name}</strong>
                </Typography>
              )
            }
          />
          
          <Divider />
          
          <CardContent>
            <form onSubmit={handleSubmit} noValidate>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel>
                      <Typography variant="h6">{step.label}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {step.description}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Box sx={{ mb: 2 }}>
                        {index === 0 && (
                          <Grid container spacing={3}>
                            <Grid item xs={12}>
                              <TextField
                                fullWidth
                                label="Nome da Criança"
                                value={name}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Digite o nome completo da criança"
                                error={name !== "" && (name.length < 3 || name.length > 255)}
                                helperText={
                                  name !== "" && (name.length < 3 || name.length > 255)
                                    ? "Nome deve ter entre 3 a 255 caracteres"
                                    : ""
                                }
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
                          </Grid>
                        )}

                        {index === 1 && (
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="NIS"
                                value={nis}
                                onChange={(e) => setNis(e.target.value)}
                                placeholder="Digite o NIS"
                                InputProps={{
                                  startAdornment: (
                                    <InputAdornment position="start">
                                      <BadgeIcon color="action" />
                                    </InputAdornment>
                                  ),
                                }}
                                variant="outlined"
                              />
                            </Grid>
                            
                            <Grid item xs={12} md={6}>
                              <FormControl component="fieldset">
                                <FormLabel component="legend">
                                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <GenderIcon color="action" />
                                    Sexo
                                  </Box>
                                </FormLabel>
                                <RadioGroup
                                  value={sexo}
                                  onChange={(e) => setSexo(e.target.value)}
                                  row
                                >
                                  <FormControlLabel
                                    value="Masculino"
                                    control={<Radio />}
                                    label="Masculino"
                                  />
                                  <FormControlLabel
                                    value="Feminino"
                                    control={<Radio />}
                                    label="Feminino"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </Grid>
                            
                            <Grid item xs={12}>
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={isBpc}
                                    onChange={handleCheckboxChange}
                                    color="primary"
                                  />
                                }
                                label="Criança com BPC (Benefício de Prestação Continuada)"
                              />
                            </Grid>
                          </Grid>
                        )}

                        {index === 2 && (
                          <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                              <TextField
                                fullWidth
                                label="Data de Nascimento"
                                type="date"
                                value={born}
                                onChange={(e) => setDataNascimento(e.target.value)}
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
                              />
                            </Grid>
                            
                            {/* Resumo dos dados */}
                            <Grid item xs={12}>
                              <Alert severity="info" sx={{ mt: 2 }}>
                                <Typography variant="subtitle2" gutterBottom>
                                  Resumo dos dados:
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Nome:</strong> {name || "Não informado"}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>NIS:</strong> {nis || "Não informado"}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Sexo:</strong> {sexo || "Não informado"}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>BPC:</strong> {isBpc ? "Sim" : "Não"}
                                </Typography>
                                <Typography variant="body2">
                                  <strong>Data de Nascimento:</strong> {born || "Não informado"}
                                </Typography>
                              </Alert>
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                      
                      <Box sx={{ mb: 2 }}>
                        <div>
                          {index === steps.length - 1 ? (
                            <Button
                              variant="contained"
                              type="submit"
                              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                              disabled={loading || !isStepValid(index)}
                              size="large"
                              sx={{
                                background: "linear-gradient(45deg, #4caf50, #66bb6a)",
                                "&:hover": {
                                  background: "linear-gradient(45deg, #388e3c, #4caf50)",
                                },
                              }}
                            >
                              {loading ? "Cadastrando..." : "Cadastrar Criança"}
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              disabled={!isStepValid(index)}
                              endIcon={<NextIcon />}
                            >
                              Próximo
                            </Button>
                          )}
                          
                          {index > 0 && (
                            <Button
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                              startIcon={<BackIcon />}
                            >
                              Voltar
                            </Button>
                          )}
                        </div>
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
