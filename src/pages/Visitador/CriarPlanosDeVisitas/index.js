import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  Paper,
  IconButton,
  Stepper,
  Step,
  StepLabel,
  StepContent,
} from "@mui/material";
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  Create as CreateIcon,
  ArrowBack as ArrowBackIcon,
  AutoAwesome as AutoAwesomeIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "../../../services/axios";
import { useHistory } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function CriarPlanosDeVisitas({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const history = useHistory();

  const [child, setChild] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [scheduledDay, setScheduledDay] = useState("");
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  // Estados para edição das etapas
  const [editableObjetivo, setEditableObjetivo] = useState("");
  const [editableEtapa1, setEditableEtapa1] = useState("");
  const [editableEtapa2, setEditableEtapa2] = useState("");
  const [editableEtapa3, setEditableEtapa3] = useState("");

  const steps = [
    "Selecionar Modelo",
    "Personalizar Etapas",
    "Agendar Visita",
    "Confirmar Plano",
  ];

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [childResponse, modelosResponse] = await Promise.all([
        axios.get(`/crianca/${id}`),
        axios.get("/modelos"),
      ]);

      setChild(childResponse.data);
      setModelos(modelosResponse.data);
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
      toast.error("Erro ao carregar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleModeloSelect = (modelo) => {
    setSelectedModelo(modelo);

    if (modelo) {
      // Preenchendo com dados do modelo selecionado
      setEditableObjetivo(modelo.objetivo);
      setEditableEtapa1(modelo.etapa1);
      setEditableEtapa2(modelo.etapa2);
      setEditableEtapa3(modelo.etapa3);
    } else {
      // Criação manual - campos vazios
      setEditableObjetivo("");
      setEditableEtapa1("");
      setEditableEtapa2("");
      setEditableEtapa3("");
    }

    setActiveStep(1);
  };

  const handleNext = () => {
    if (activeStep === 1) {
      // Validar se os campos editáveis estão preenchidos
      if (
        !editableObjetivo.trim() ||
        !editableEtapa1.trim() ||
        !editableEtapa2.trim() ||
        !editableEtapa3.trim()
      ) {
        toast.error("Por favor, preencha todas as etapas do plano");
        return;
      }
    }
    if (activeStep === 2 && !scheduledDay) {
      toast.error("Por favor, selecione a data da visita");
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    // Validação mais robusta dos campos obrigatórios
    if (!editableObjetivo.trim()) {
      toast.error("Por favor, preencha o objetivo da visita");
      return;
    }

    if (!editableEtapa1.trim()) {
      toast.error("Por favor, preencha a primeira etapa");
      return;
    }

    if (!editableEtapa2.trim()) {
      toast.error("Por favor, preencha a segunda etapa");
      return;
    }

    if (!editableEtapa3.trim()) {
      toast.error("Por favor, preencha a terceira etapa");
      return;
    }

    if (!scheduledDay) {
      toast.error("Por favor, selecione a data da visita");
      return;
    }

    try {
      setCreating(true);
      const dateObject = new Date(scheduledDay);

      if (isNaN(dateObject.getTime())) {
        toast.error("Data inválida selecionada");
        return;
      }

      // Dados conforme PlanoDeVisitaCreateDTO
      const planoData = {
        objective: editableObjetivo.trim(),
        etapa1: editableEtapa1.trim(),
        etapa2: editableEtapa2.trim(),
        etapa3: editableEtapa3.trim(),
        scheduledDay: dateObject, // Enviando como Date object
        childId: parseInt(id, 10),
      };

      // Criar plano baseado no modelo editado
      await axios.post(`/planos/`, planoData);
      toast.success("Plano criado com sucesso! E visita agendada");
      history.push("/planos");
    } catch (error) {
      console.error("Erro ao criar plano:", error);
      toast.error("Erro ao criar plano. Verifique os dados e tente novamente.");
    } finally {
      setCreating(false);
    }
  };

  const getModelosByFaixaEtaria = () => {
    return modelos;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: "center" }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Carregando...
        </Typography>
      </Container>
    );
  }

  const modelosFiltrados = getModelosByFaixaEtaria();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 4,
          borderRadius: 3,
          mb: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <IconButton
          onClick={() => history.push("/planos")}
          sx={{ color: "white", mb: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 1 }}>
          🎯 Criar Plano de Visita
        </Typography>

        {child && (
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Para: {child.name} • {child.idade} meses
          </Typography>
        )}

        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.1)",
          }}
        />
      </Paper>

      {/* Stepper */}
      <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Stepper activeStep={activeStep} orientation="horizontal">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Paper>

      {/* Step Content */}
      {activeStep === 0 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            ✨ Selecione um Modelo de Plano
          </Typography>

          {modelosFiltrados.length === 0 ? (
            <Box>
              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                  Nenhum modelo encontrado para esta faixa etária.
                </Typography>
                <Typography variant="body2">
                  Você pode criar um plano personalizado preenchendo as etapas
                  manualmente ou entrar em contato com seu supervisor para criar
                  modelos adequados.
                </Typography>
              </Alert>

              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  background:
                    "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)",
                  border: "2px solid rgba(102, 126, 234, 0.1)",
                  textAlign: "center",
                }}
              >
                <CreateIcon sx={{ fontSize: 60, color: "#667eea", mb: 2 }} />
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", mb: 2, color: "#667eea" }}
                >
                  Criar Plano Personalizado
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ mb: 3, color: "text.secondary" }}
                >
                  Crie um plano de visita do zero, definindo objetivo e etapas
                  personalizadas para esta criança.
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => handleModeloSelect(null)}
                  sx={{
                    background: "linear-gradient(45deg, #667eea, #764ba2)",
                    px: 4,
                    py: 1.5,
                    fontSize: "1.1rem",
                    fontWeight: "bold",
                    "&:hover": {
                      background: "linear-gradient(45deg, #5a6fd8, #6a4190)",
                    },
                  }}
                >
                  Começar Criação Manual
                </Button>
              </Paper>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {modelosFiltrados.map((modelo) => (
                <Grid item xs={12} md={6} key={modelo.id}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      border:
                        selectedModelo?.id === modelo.id
                          ? "2px solid #667eea"
                          : "1px solid #e0e0e0",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                      },
                    }}
                    onClick={() => handleModeloSelect(modelo)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <AssignmentIcon sx={{ color: "#667eea", mr: 1 }} />
                        <Chip
                          label={modelo.faixaEtaria}
                          size="small"
                          sx={{
                            background:
                              "linear-gradient(45deg, #667eea, #764ba2)",
                            color: "white",
                            fontWeight: "bold",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", mb: 2 }}
                      >
                        Modelo #{modelo.id}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 2 }}
                      >
                        <strong>Objetivo:</strong>{" "}
                        {modelo.objetivo.substring(0, 100)}...
                      </Typography>

                      <Divider sx={{ my: 2 }} />

                      <Typography
                        variant="subtitle2"
                        sx={{ fontWeight: "bold", mb: 1 }}
                      >
                        Etapas do Plano:
                      </Typography>

                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>1.</strong> {modelo.etapa1.substring(0, 50)}
                          ...
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>2.</strong> {modelo.etapa2.substring(0, 50)}
                          ...
                        </Typography>
                        <Typography variant="body2">
                          <strong>3.</strong> {modelo.etapa3.substring(0, 50)}
                          ...
                        </Typography>
                      </Box>

                      {selectedModelo?.id === modelo.id && (
                        <Box sx={{ mt: 2, textAlign: "center" }}>
                          <CheckCircleIcon
                            sx={{ color: "#4caf50", fontSize: 30 }}
                          />
                          <Typography
                            variant="body2"
                            sx={{ color: "#4caf50", fontWeight: "bold" }}
                          >
                            Modelo Selecionado
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {selectedModelo && (
            <Box sx={{ mt: 4, textAlign: "center" }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Continuar para Agendamento
              </Button>
            </Box>
          )}
        </Box>
      )}

      {activeStep === 1 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            {selectedModelo
              ? "✏️ Personalizar Etapas do Plano"
              : "📝 Criar Plano Personalizado"}
          </Typography>

          {selectedModelo ? (
            <Alert severity="info" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Modelo selecionado:</strong> Modelo #
                {selectedModelo?.id} - {selectedModelo?.faixaEtaria}
                <br />
                Você pode adaptar as etapas abaixo para sua realidade
                específica.
              </Typography>
            </Alert>
          ) : (
            <Alert severity="success" sx={{ mb: 3 }}>
              <Typography variant="body2">
                <strong>Criação Manual:</strong> Defina o objetivo e as etapas
                do plano de visita do zero.
                <br />
                Preencha todos os campos com informações específicas para esta
                criança.
              </Typography>
            </Alert>
          )}

          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Grid container spacing={3}>
              {/* Objetivo */}
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#667eea", fontWeight: "bold" }}
                >
                  🎯 Objetivo da Visita
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  label="Objetivo"
                  value={editableObjetivo}
                  onChange={(e) => setEditableObjetivo(e.target.value)}
                  placeholder="Descreva o objetivo principal desta visita..."
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 2,
                    },
                  }}
                />
              </Grid>

              {/* Etapa 1 */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(102, 126, 234, 0.1) 100%)",
                    border: "2px solid rgba(102, 126, 234, 0.1)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#667eea",
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    1️⃣ Primeiro Momento
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Atividades Iniciais"
                    value={editableEtapa1}
                    onChange={(e) => setEditableEtapa1(e.target.value)}
                    placeholder={
                      selectedModelo
                        ? "Ex: Apresentação, avaliação do ambiente familiar..."
                        : "Descreva as atividades do primeiro momento da visita..."
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "white",
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>

              {/* Etapa 2 */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(118, 75, 162, 0.05) 0%, rgba(118, 75, 162, 0.1) 100%)",
                    border: "2px solid rgba(118, 75, 162, 0.1)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#764ba2",
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    2️⃣ Segundo Momento
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Atividades Principais"
                    value={editableEtapa2}
                    onChange={(e) => setEditableEtapa2(e.target.value)}
                    placeholder={
                      selectedModelo
                        ? "Ex: Desenvolvimento de atividades específicas..."
                        : "Descreva as atividades principais da visita..."
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "white",
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 3px rgba(118, 75, 162, 0.1)",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>

              {/* Etapa 3 */}
              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    background:
                      "linear-gradient(135deg, rgba(76, 175, 80, 0.05) 0%, rgba(76, 175, 80, 0.1) 100%)",
                    border: "2px solid rgba(76, 175, 80, 0.1)",
                    height: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#4caf50",
                      fontWeight: 600,
                      mb: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    3️⃣ Terceiro Momento
                  </Typography>
                  <TextField
                    fullWidth
                    multiline
                    rows={6}
                    label="Atividades Finais"
                    value={editableEtapa3}
                    onChange={(e) => setEditableEtapa3(e.target.value)}
                    placeholder={
                      selectedModelo
                        ? "Ex: Encerramento, orientações finais..."
                        : "Descreva as atividades de encerramento da visita..."
                    }
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        backgroundColor: "white",
                        "&.Mui-focused": {
                          boxShadow: "0 0 0 3px rgba(76, 175, 80, 0.1)",
                        },
                      },
                    }}
                  />
                </Box>
              </Grid>
            </Grid>

            <Box
              sx={{ display: "flex", gap: 2, justifyContent: "center", mt: 4 }}
            >
              <Button variant="outlined" onClick={handleBack} sx={{ px: 4 }}>
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  px: 4,
                }}
              >
                Continuar para Agendamento
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            📅 Agendar Visita
          </Typography>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <ScheduleIcon sx={{ color: "#667eea", mr: 2, fontSize: 30 }} />
              <Typography variant="h6">
                Quando você realizará esta visita?
              </Typography>
            </Box>

            <TextField
              type="datetime-local"
              fullWidth
              value={scheduledDay}
              onChange={(e) => setScheduledDay(e.target.value)}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
              <Button variant="outlined" onClick={handleBack} sx={{ px: 4 }}>
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!scheduledDay}
                sx={{
                  background: "linear-gradient(45deg, #667eea, #764ba2)",
                  px: 4,
                }}
              >
                Continuar
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {activeStep === 3 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            ✅ Confirmar Plano
          </Typography>

          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: "#667eea" }}>
              Resumo do Plano de Visita
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    👶 Criança:
                  </Typography>
                  <Typography variant="body1">
                    {child?.name} ({child?.idade} meses)
                  </Typography>
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    📅 Data da Visita:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(scheduledDay).toLocaleString("pt-BR")}
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                  >
                    🎯{" "}
                    {selectedModelo ? "Modelo Selecionado:" : "Tipo de Plano:"}
                  </Typography>
                  {selectedModelo ? (
                    <Chip
                      label={`Modelo #${selectedModelo?.id} - ${selectedModelo?.faixaEtaria}`}
                      sx={{
                        background: "linear-gradient(45deg, #667eea, #764ba2)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  ) : (
                    <Chip
                      label="Plano Personalizado"
                      sx={{
                        background: "linear-gradient(45deg, #4caf50, #45a049)",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    />
                  )}
                </Box>
              </Grid>
            </Grid>

            <Divider sx={{ my: 3 }} />

            <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 2 }}>
              📝 Detalhes do Plano:
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 1 }}
              >
                Objetivo:
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", lineHeight: 1.6 }}
              >
                {editableObjetivo}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: "bold", mb: 2 }}
              >
                Etapas da Visita:
              </Typography>

              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Momento 1:</strong> {editableEtapa1}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Momento 2:</strong> {editableEtapa2}
                </Typography>
                <Typography variant="body2">
                  <strong>Momento 3:</strong> {editableEtapa3}
                </Typography>
              </Box>
            </Box>
          </Paper>

          <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
            <Button variant="outlined" onClick={handleBack} sx={{ px: 4 }}>
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={creating}
              sx={{
                background: "linear-gradient(45deg, #4caf50, #45a049)",
                px: 4,
                py: 1.5,
              }}
            >
              {creating ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: "white" }} />
                  Criando...
                </>
              ) : (
                <>
                  <AutoAwesomeIcon sx={{ mr: 1 }} />
                  Criar Plano
                </>
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
}
