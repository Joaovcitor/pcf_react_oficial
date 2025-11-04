import React, { useState } from "react";
import axios from "../../../services/axios";
import history from "../../../services/history";
import { toast } from "react-toastify";
import { get } from "lodash";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  FormControlLabel,
  Checkbox,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Collapse,
  Alert,
  Chip,
  Avatar,
  Divider,
  CircularProgress,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  ContactPhone as ContactIcon,
  PregnantWoman as PregnantWomanIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useHistory } from "react-router-dom";

export default function CadastrarCuidador() {
  const [name, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [bairro, setBairro] = useState("");
  const [contato, setContato] = useState("");
  const [born, setDataNascimento] = useState("");
  const [gestante, setGestante] = useState(false);
  const [week_pregnant, setWeek] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const historyHook = useHistory();

  const handleCheckboxChange = (e) => {
    setGestante(e.target.checked);
    if (!e.target.checked) {
      setWeek(0);
    }
  };

  const steps = [
    {
      label: 'Dados Pessoais',
      description: 'Informações básicas do cuidador',
    },
    {
      label: 'Endereço e Contato',
      description: 'Localização e formas de contato',
    },
    {
      label: 'Informações Especiais',
      description: 'Dados sobre gestação (se aplicável)',
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Evita que Enter submeta o formulário antes da última etapa
  const handleKeyDownForm = (e) => {
    if (e.key === 'Enter' && activeStep !== steps.length - 1) {
      e.preventDefault();
    }
  };

  const isStepValid = (step) => {
    switch (step) {
      case 0:
        return name.length >= 3 && cpf.length === 11 && born;
      case 1:
        return endereco && bairro;
      case 2:
        return !gestante || (gestante && week_pregnant > 0);
      default:
        return false;
    }
  };

  async function handleSubmit(e) {
    if (e && typeof e.preventDefault === 'function') {
      e.preventDefault();
      e.stopPropagation();
    }

    // Validação completa de todos os campos
    let formsErrors = false;
    const errors = [];

    if (!name || name.length < 3 || name.length > 255) {
      formsErrors = true;
      errors.push("Nome deve ter entre 3 a 255 caracteres");
    }

    if (!cpf || cpf.length !== 11) {
      formsErrors = true;
      errors.push("CPF deve ter 11 dígitos");
    }

    if (!endereco || endereco.trim() === '') {
      formsErrors = true;
      errors.push("Endereço é obrigatório");
    }

    if (!bairro || bairro.trim() === '') {
      formsErrors = true;
      errors.push("Bairro é obrigatório");
    }

    if (!born) {
      formsErrors = true;
      errors.push("Data de nascimento é obrigatória");
    }

    if (gestante && (!week_pregnant || week_pregnant <= 0)) {
      formsErrors = true;
      errors.push("Para gestantes, informe as semanas de gravidez");
    }

    if (formsErrors) {
      // Exibir todos os erros
      errors.forEach(error => toast.error(error));
      return;
    }

    setLoading(true);
    const dataFormatada = new Date(born).toISOString();

    try {
      const response = await axios.post("/cuidador/", {
        name,
        endereco,
        rg,
        cpf,
        bairro,
        contato,
        pregnant: gestante,
        born: dataFormatada,
        week_pregnant: gestante ? parseInt(week_pregnant) : 0,
      });

      const { id } = response.data;
      
      toast.success("Cuidador cadastrado com sucesso!");
      
      if (!gestante) {
        history.push(`/crianca/cadastrar/${id}`);
      } else {
        history.push("/");
      }
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
        toast.error("Erro ao cadastrar cuidador");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => historyHook.goBack()}
          sx={{ mb: 3 }}
          disabled={loading}
        >
          Voltar
        </Button>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56 }}>
            <PersonIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Cadastrar Cuidador
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Preencha as informações do cuidador para cadastro no sistema
            </Typography>
          </Box>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Stepper */}
        <Grid item xs={12} md={4}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Progresso do Cadastro
              </Typography>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        <Typography variant="caption">
                          {step.description}
                        </Typography>
                      }
                    >
                      {step.label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>
        </Grid>

        {/* Formulário */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent sx={{ p: 4 }}>
              <form onKeyDown={handleKeyDownForm} noValidate>
                 {/* Etapa 1: Dados Pessoais */}
                 {activeStep === 0 && (
                   <Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                       <PersonIcon color="primary" />
                       <Typography variant="h5" fontWeight="bold">
                         Dados Pessoais
                       </Typography>
                     </Box>
                     
                     <Grid container spacing={3}>
                       <Grid item xs={12}>
                         <TextField
                           fullWidth
                           label="Nome Completo"
                           value={name}
                           onChange={(e) => setNome(e.target.value)}
                           placeholder="Digite o nome completo"
                           variant="outlined"
                           disabled={loading}
                           error={name.length > 0 && name.length < 3}
                           helperText={name.length > 0 && name.length < 3 ? "Nome deve ter pelo menos 3 caracteres" : ""}
                         />
                       </Grid>
                       
                       <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="CPF"
                           value={cpf}
                           onChange={(e) => setCpf(e.target.value.replace(/\D/g, ''))}
                           placeholder="00000000000"
                           variant="outlined"
                           disabled={loading}
                           inputProps={{ maxLength: 11 }}
                           error={cpf.length > 0 && cpf.length !== 11}
                           helperText={cpf.length > 0 && cpf.length !== 11 ? "CPF deve ter 11 dígitos" : ""}
                         />
                       </Grid>
                       
                       <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="RG"
                           value={rg}
                           onChange={(e) => setRg(e.target.value)}
                           placeholder="Digite o RG"
                           variant="outlined"
                           disabled={loading}
                         />
                       </Grid>
                       
                       <Grid item xs={12}>
                         <TextField
                           fullWidth
                           label="Data de Nascimento"
                           type="date"
                           value={born}
                           onChange={(e) => setDataNascimento(e.target.value)}
                           variant="outlined"
                           disabled={loading}
                           InputLabelProps={{
                             shrink: true,
                           }}
                         />
                       </Grid>
                     </Grid>
                   </Box>
                 )}

                 {/* Etapa 2: Endereço e Contato */}
                 {activeStep === 1 && (
                   <Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                       <LocationIcon color="primary" />
                       <Typography variant="h5" fontWeight="bold">
                         Endereço e Contato
                       </Typography>
                     </Box>
                     
                     <Grid container spacing={3}>
                       <Grid item xs={12}>
                         <TextField
                           fullWidth
                           label="Endereço"
                           value={endereco}
                           onChange={(e) => setEndereco(e.target.value)}
                           placeholder="Digite o endereço completo"
                           variant="outlined"
                           disabled={loading}
                         />
                       </Grid>
                       
                       <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="Bairro"
                           value={bairro}
                           onChange={(e) => setBairro(e.target.value)}
                           placeholder="Digite o bairro"
                           variant="outlined"
                           disabled={loading}
                         />
                       </Grid>
                       
                       <Grid item xs={12} sm={6}>
                         <TextField
                           fullWidth
                           label="Contato"
                           value={contato}
                           onChange={(e) => setContato(e.target.value)}
                           placeholder="Telefone ou celular"
                           variant="outlined"
                           disabled={loading}
                         />
                       </Grid>
                     </Grid>
                   </Box>
                 )}

                 {/* Etapa 3: Informações Especiais */}
                 {activeStep === 2 && (
                   <Box>
                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                       <PregnantWomanIcon color="primary" />
                       <Typography variant="h5" fontWeight="bold">
                         Informações Especiais
                       </Typography>
                     </Box>
                     
                     <Grid container spacing={3}>
                       <Grid item xs={12}>
                         <FormControlLabel
                           control={
                             <Checkbox
                               checked={gestante}
                               onChange={handleCheckboxChange}
                               disabled={loading}
                               color="primary"
                             />
                           }
                           label={
                             <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                               <PregnantWomanIcon />
                               <Typography>É gestante</Typography>
                             </Box>
                           }
                         />
                       </Grid>
                       <Grid item xs={12}>
                         <Collapse in={gestante}>
                           <TextField
                             fullWidth
                             label="Semanas de Gravidez"
                             type="number"
                             value={week_pregnant}
                             onChange={(e) => setWeek(e.target.value)}
                             placeholder="Digite o número de semanas"
                             variant="outlined"
                             disabled={loading}
                             inputProps={{ min: 1, max: 42 }}
                             error={gestante && (!week_pregnant || week_pregnant <= 0)}
                             helperText={gestante && (!week_pregnant || week_pregnant <= 0) ? "Informe as semanas de gravidez" : ""}
                           />
                         </Collapse>
                       </Grid>
                     </Grid>

                    {/* Resumo dos dados */}
                    <Box sx={{ mt: 4 }}>
                      <Divider sx={{ mb: 3 }} />
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        Resumo dos Dados
                      </Typography>
                      <Grid container spacing={2}>
                        {name && (
                          <Grid item xs={12} sm={6}>
                            <Chip
                              icon={<PersonIcon />}
                              label={`Nome: ${name}`}
                              variant="outlined"
                              sx={{ width: '100%' }}
                            />
                          </Grid>
                        )}
                        {cpf && (
                          <Grid item xs={12} sm={6}>
                            <Chip
                              label={`CPF: ${cpf}`}
                              variant="outlined"
                              sx={{ width: '100%' }}
                            />
                          </Grid>
                        )}
                        {endereco && (
                          <Grid item xs={12} sm={6}>
                            <Chip
                              icon={<LocationIcon />}
                              label={`Endereço: ${endereco}`}
                              variant="outlined"
                              sx={{ width: '100%' }}
                            />
                          </Grid>
                        )}
                        {bairro && (
                          <Grid item xs={12} sm={6}>
                            <Chip
                              label={`Bairro: ${bairro}`}
                              variant="outlined"
                              sx={{ width: '100%' }}
                            />
                          </Grid>
                        )}
                        {gestante && (
                          <Grid item xs={12} sm={6}>
                            <Chip
                              icon={<PregnantWomanIcon />}
                              label={`Gestante: ${week_pregnant} semanas`}
                              color="secondary"
                              sx={{ width: '100%' }}
                            />
                          </Grid>
                        )}
                      </Grid>
                    </Box>
                  </Box>
                )}

                {/* Botões de navegação */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                  <Button
                    type="button"
                    disabled={activeStep === 0 || loading}
                    onClick={handleBack}
                    variant="outlined"
                  >
                    Voltar
                  </Button>
                  
                  {activeStep === steps.length - 1 ? (
                    <Button
                      type="button"
                      variant="contained"
                      disabled={!isStepValid(activeStep) || loading}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                      onClick={handleSubmit}
                      sx={{
                        background: 'linear-gradient(45deg, #4CAF50, #45a049)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #45a049, #3d8b40)',
                        },
                      }}
                    >
                      {loading ? 'Cadastrando...' : 'Cadastrar Cuidador'}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      variant="contained"
                      onClick={handleNext}
                      disabled={!isStepValid(activeStep) || loading}
                      endIcon={<CheckCircleIcon />}
                    >
                      Continuar
                    </Button>
                  )}
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
