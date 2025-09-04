import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Close as CloseIcon,
  ArrowBack as ArrowBackIcon,
  AutoAwesome as AutoAwesomeIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { useHistory } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export default function CriarPlanosDeVisitas({ match }) {
  // eslint-disable-next-line react/prop-types
  const { id } = match.params;
  const history = useHistory();
  
  const [child, setChild] = useState(null);
  const [modelos, setModelos] = useState([]);
  const [selectedModelo, setSelectedModelo] = useState(null);
  const [scheduledDay, setScheduledDay] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [openPreview, setOpenPreview] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    'Selecionar Modelo',
    'Agendar Visita',
    'Confirmar Plano'
  ];

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [childResponse, modelosResponse] = await Promise.all([
        axios.get(`/crianca/${id}`),
        axios.get('/modelos')
      ]);
      
      setChild(childResponse.data);
      setModelos(modelosResponse.data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const handleModeloSelect = (modelo) => {
    setSelectedModelo(modelo);
    setActiveStep(1);
  };

  const handleNext = () => {
    if (activeStep === 1 && !scheduledDay) {
      toast.error('Por favor, selecione a data da visita');
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!selectedModelo || !scheduledDay) {
      toast.error('Por favor, complete todas as etapas');
      return;
    }

    try {
      setCreating(true);
      const dateObject = new Date(scheduledDay);
      
      if (isNaN(dateObject.getTime())) {
        toast.error('Data inválida selecionada');
        return;
      }

      const dataFormatada = dateObject.toISOString();

      // Criar plano baseado no modelo
      const planResponse = await axios.post(`/planos/${id}`, {
        scheduledDay: dataFormatada,
        objetivo: selectedModelo.objetivo,
        etapa1: selectedModelo.etapa1,
        etapa2: selectedModelo.etapa2,
        etapa3: selectedModelo.etapa3,
        childId: id,
        modeloId: selectedModelo.id
      });

      // Criar visita agendada
      await axios.post('/visitasporgeolo/', {
        childId: parseInt(id),
        planId: planResponse.data.id,
        scheduledDate: dataFormatada,
      });

      toast.success('Plano criado com sucesso!');
      history.push('/planos');
    } catch (error) {
      console.error('Erro ao criar plano:', error);
      toast.error('Erro ao criar plano');
    } finally {
      setCreating(false);
    }
  };

  const getModelosByFaixaEtaria = () => {
    return modelos;
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress size={60} />
        <Typography variant="h6" sx={{ mt: 2 }}>Carregando...</Typography>
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
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          borderRadius: 3,
          mb: 4,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <IconButton
          onClick={() => history.push('/planos')}
          sx={{ color: 'white', mb: 2 }}
        >
          <ArrowBackIcon />
        </IconButton>
        
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
          🎯 Criar Plano de Visita
        </Typography>
        
        {child && (
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Para: {child.name} • {child.idade} meses
          </Typography>
        )}
        
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.1)',
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
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            ✨ Selecione um Modelo de Plano
          </Typography>
          
          {modelosFiltrados.length === 0 ? (
             <Alert severity="info" sx={{ mb: 3 }}>
               Nenhum modelo encontrado.
               Entre em contato com seu supervisor para criar modelos adequados.
             </Alert>
          ) : (
            <Grid container spacing={3}>
              {modelosFiltrados.map((modelo) => (
                <Grid item xs={12} md={6} key={modelo.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: selectedModelo?.id === modelo.id ? '2px solid #667eea' : '1px solid #e0e0e0',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                      },
                    }}
                    onClick={() => handleModeloSelect(modelo)}
                  >
                    <CardContent sx={{ p: 3 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <AssignmentIcon sx={{ color: '#667eea', mr: 1 }} />
                        <Chip
                          label={modelo.faixaEtaria}
                          size="small"
                          sx={{
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            color: 'white',
                            fontWeight: 'bold',
                          }}
                        />
                      </Box>
                      
                      <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                        Modelo #{modelo.id}
                      </Typography>
                      
                      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                        <strong>Objetivo:</strong> {modelo.objetivo.substring(0, 100)}...
                      </Typography>
                      
                      <Divider sx={{ my: 2 }} />
                      
                      <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                        Etapas do Plano:
                      </Typography>
                      
                      <Box sx={{ pl: 2 }}>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>1.</strong> {modelo.etapa1.substring(0, 50)}...
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1 }}>
                          <strong>2.</strong> {modelo.etapa2.substring(0, 50)}...
                        </Typography>
                        <Typography variant="body2">
                          <strong>3.</strong> {modelo.etapa3.substring(0, 50)}...
                        </Typography>
                      </Box>
                      
                      {selectedModelo?.id === modelo.id && (
                        <Box sx={{ mt: 2, textAlign: 'center' }}>
                          <CheckCircleIcon sx={{ color: '#4caf50', fontSize: 30 }} />
                          <Typography variant="body2" sx={{ color: '#4caf50', fontWeight: 'bold' }}>
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
            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Button
                variant="contained"
                size="large"
                onClick={handleNext}
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
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
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            📅 Agendar Visita
          </Typography>
          
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
              <ScheduleIcon sx={{ color: '#667eea', mr: 2, fontSize: 30 }} />
              <Typography variant="h6">Quando você realizará esta visita?</Typography>
            </Box>
            
            <TextField
              type="datetime-local"
              fullWidth
              value={scheduledDay}
              onChange={(e) => setScheduledDay(e.target.value)}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                },
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
            
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button
                variant="outlined"
                onClick={handleBack}
                sx={{ px: 4 }}
              >
                Voltar
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!scheduledDay}
                sx={{
                  background: 'linear-gradient(45deg, #667eea, #764ba2)',
                  px: 4,
                }}
              >
                Continuar
              </Button>
            </Box>
          </Paper>
        </Box>
      )}

      {activeStep === 2 && (
        <Box>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
            ✅ Confirmar Plano
          </Typography>
          
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, color: '#667eea' }}>
              Resumo do Plano de Visita
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    👶 Criança:
                  </Typography>
                  <Typography variant="body1">{child?.name} ({child?.idade} meses)</Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    📅 Data da Visita:
                  </Typography>
                  <Typography variant="body1">
                    {new Date(scheduledDay).toLocaleString('pt-BR')}
                  </Typography>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    🎯 Modelo Selecionado:
                  </Typography>
                  <Chip
                    label={`Modelo #${selectedModelo?.id} - ${selectedModelo?.faixaEtaria}`}
                    sx={{
                      background: 'linear-gradient(45deg, #667eea, #764ba2)',
                      color: 'white',
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 2 }}>
              📝 Detalhes do Plano:
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                Objetivo:
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
                {selectedModelo?.objetivo}
              </Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2 }}>
                Etapas da Visita:
              </Typography>
              
              <Box sx={{ pl: 2 }}>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Momento 1:</strong> {selectedModelo?.etapa1}
                </Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>
                  <strong>Momento 2:</strong> {selectedModelo?.etapa2}
                </Typography>
                <Typography variant="body2">
                  <strong>Momento 3:</strong> {selectedModelo?.etapa3}
                </Typography>
              </Box>
            </Box>
          </Paper>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              sx={{ px: 4 }}
            >
              Voltar
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={creating}
              sx={{
                background: 'linear-gradient(45deg, #4caf50, #45a049)',
                px: 4,
                py: 1.5,
              }}
            >
              {creating ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
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
