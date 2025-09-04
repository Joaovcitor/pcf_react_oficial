import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  IconButton,
  Alert,
  Chip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Assignment as AssignmentIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import api from '../../../services/axios';

const faixasEtarias = [
  { value: 'gestante', label: 'Gestante' },
  { value: '0-6 meses', label: '0-6 meses' },
  { value: '6-12 meses', label: '6-12 meses' },
  { value: '1-2 anos', label: '1-2 anos' },
  { value: '2-3 anos', label: '2-3 anos' },
  { value: '3-4 anos', label: '3-4 anos' },
  { value: '4-5 anos', label: '4-5 anos' },
  { value: '5-6 anos', label: '5-6 anos' },
];

export default function ModelosPlanos() {
  const [modelos, setModelos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingModelo, setEditingModelo] = useState(null);
  const [alert, setAlert] = useState({ show: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState({
    faixaEtaria: '',
    objetivo: '',
    etapa1: '',
    etapa2: '',
    etapa3: '',
  });
  const [errors, setErrors] = useState({});

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchModelos();
  }, []);

  const fetchModelos = async () => {
    try {
      setLoading(true);
      const response = await api.get('/modelos');
      setModelos(response.data);
    } catch (error) {
      console.error('Erro ao buscar modelos:', error);
      showAlert('Erro ao carregar modelos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showAlert = (message, severity = 'success') => {
    setAlert({ show: true, message, severity });
    setTimeout(() => setAlert({ show: false, message: '', severity: 'success' }), 4000);
  };

  const handleOpenDialog = (modelo = null) => {
    if (modelo) {
      setEditingModelo(modelo);
      setFormData({
        faixaEtaria: modelo.faixaEtaria,
        objetivo: modelo.objetivo,
        etapa1: modelo.etapa1,
        etapa2: modelo.etapa2,
        etapa3: modelo.etapa3,
      });
    } else {
      setEditingModelo(null);
      setFormData({
        faixaEtaria: '',
        objetivo: '',
        etapa1: '',
        etapa2: '',
        etapa3: '',
      });
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingModelo(null);
    setFormData({
      faixaEtaria: '',
      objetivo: '',
      etapa1: '',
      etapa2: '',
      etapa3: '',
    });
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['faixaEtaria', 'objetivo', 'etapa1', 'etapa2', 'etapa3'];
    
    requiredFields.forEach(field => {
      if (!formData[field] || formData[field].trim() === '') {
        newErrors[field] = 'Este campo é obrigatório';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      showAlert('Por favor, preencha todos os campos obrigatórios', 'error');
      return;
    }

    try {
      if (editingModelo) {
        await api.put(`/modelos/${editingModelo.id}`, formData);
        showAlert('Modelo atualizado com sucesso!');
      } else {
        await api.post('/modelos', formData);
        showAlert('Modelo criado com sucesso!');
      }
      handleCloseDialog();
      fetchModelos();
    } catch (error) {
      console.error('Erro ao salvar modelo:', error);
      showAlert('Erro ao salvar modelo', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este modelo?')) {
      try {
        await api.delete(`/modelos/${id}`);
        showAlert('Modelo excluído com sucesso!');
        fetchModelos();
      } catch (error) {
        console.error('Erro ao excluir modelo:', error);
        showAlert('Erro ao excluir modelo', 'error');
      }
    }
  };

  return (
    <Container maxWidth="lg">
      {alert.show && (
        <Alert 
          severity={alert.severity} 
          sx={{ mb: 2 }}
          onClose={() => setAlert({ show: false, message: '', severity: 'success' })}
        >
          {alert.message}
        </Alert>
      )}

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            textAlign: 'center',
            mb: 1,
            background: 'linear-gradient(45deg, #308C50, #11B4D9)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Modelos de Planos de Visitas
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 3,
          }}
        >
          Gerencie modelos de planos de visitas por faixa etária
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              bgcolor: '#308C50',
              '&:hover': { bgcolor: '#267A42' },
              borderRadius: 2,
              px: 3,
              py: 1.5,
            }}
          >
            Novo Modelo
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {modelos.map((modelo) => (
          <Grid item xs={12} md={6} lg={4} key={modelo.id}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssignmentIcon sx={{ color: '#308C50', mr: 1 }} />
                  <Chip
                    label={modelo.faixaEtaria}
                    sx={{
                      bgcolor: '#F2D544',
                      color: '#000',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  Objetivo
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    mb: 2,
                    lineHeight: 1.5,
                  }}
                >
                  {modelo.objetivo}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 600, mb: 1, color: '#308C50' }}
                >
                  Etapas do Plano:
                </Typography>
                
                <Box sx={{ pl: 1 }}>
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    <strong>1.</strong> {modelo.etapa1.substring(0, 50)}...
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
                    <strong>2.</strong> {modelo.etapa2.substring(0, 50)}...
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <strong>3.</strong> {modelo.etapa3.substring(0, 50)}...
                  </Typography>
                </Box>
              </CardContent>
              
              <CardActions sx={{ p: 2, pt: 0 }}>
                <Button
                  size="small"
                  startIcon={<EditIcon />}
                  onClick={() => handleOpenDialog(modelo)}
                  sx={{ color: '#11B4D9' }}
                >
                  Editar
                </Button>
                <Button
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(modelo.id)}
                  sx={{ color: '#d32f2f' }}
                >
                  Excluir
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {modelos.length === 0 && !loading && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <AssignmentIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 1 }}>
            Nenhum modelo encontrado
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.disabled' }}>
            Clique em &quot;Novo Modelo&quot; para criar seu primeiro modelo de plano de visitas
          </Typography>
        </Box>
      )}

      {/* Dialog para criar/editar modelo */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 4,
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(248, 250, 252, 0.95) 100%)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            overflow: 'hidden',
          }
        }}
        TransitionProps={{
          timeout: 500,
        }}
      >
        <DialogTitle 
          sx={{ 
            pb: 2,
            background: 'linear-gradient(135deg, #308C50 0%, #11B4D9 100%)',
            color: 'white',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #F2D544 0%, #308C50 50%, #11B4D9 100%)',
            }
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <AssignmentIcon sx={{ fontSize: 32 }} />
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 0.5 }}>
                  {editingModelo ? 'Editar Modelo' : 'Criar Novo Modelo'}
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  {editingModelo ? 'Atualize as informações do modelo' : 'Defina um modelo de plano de visitas personalizado'}
                </Typography>
              </Box>
            </Box>
            <IconButton 
              onClick={handleCloseDialog} 
              size="large"
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'rotate(90deg)',
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        
        <DialogContent sx={{ pt: 4, pb: 2, px: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#308C50',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  🎯 Informações Básicas
                </Typography>
                <TextField
                  select
                  fullWidth
                  label="Faixa Etária *"
                  value={formData.faixaEtaria}
                  onChange={(e) => handleInputChange('faixaEtaria', e.target.value)}
                  error={!!errors.faixaEtaria}
                  helperText={errors.faixaEtaria || 'Selecione a faixa etária para este modelo'}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 3px rgba(48, 140, 80, 0.1)',
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#308C50',
                    }
                  }}
                >
                  {faixasEtarias.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontWeight: 600, 
                    color: '#11B4D9',
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  📋 Objetivo do Plano
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Objetivo Principal *"
                  value={formData.objetivo}
                      onChange={(e) => handleInputChange('objetivo', e.target.value)}
                      error={!!errors.objetivo}
                      helperText={errors.objetivo || 'Descreva claramente o objetivo principal deste modelo de plano'}
                  placeholder="Ex: Promover o desenvolvimento cognitivo e motor da criança através de atividades lúdicas e educativas adequadas para sua faixa etária..."
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      },
                      '&.Mui-focused': {
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 3px rgba(17, 180, 217, 0.1)',
                      }
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: '#11B4D9',
                    }
                  }}
                />
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 600, 
                  color: '#F2D544',
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                🚀 Etapas do Plano de Visitas
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, rgba(48, 140, 80, 0.05) 0%, rgba(48, 140, 80, 0.1) 100%)',
                    border: '2px solid rgba(48, 140, 80, 0.1)',
                    height: '100%'
                  }}>
                    <Typography variant="h6" sx={{ color: '#308C50', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      1️⃣ Primeira Etapa
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Atividades Iniciais *"
                      value={formData.etapa1}
                      onChange={(e) => handleInputChange('etapa1', e.target.value)}
                      error={!!errors.etapa1}
                      helperText={errors.etapa1 || 'Atividades de acolhimento e avaliação inicial'}
                      placeholder="Ex: Apresentação, avaliação do ambiente familiar, identificação de necessidades básicas..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(48, 140, 80, 0.1)',
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, rgba(17, 180, 217, 0.05) 0%, rgba(17, 180, 217, 0.1) 100%)',
                    border: '2px solid rgba(17, 180, 217, 0.1)',
                    height: '100%'
                  }}>
                    <Typography variant="h6" sx={{ color: '#11B4D9', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      2️⃣ Segunda Etapa
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Desenvolvimento *"
                      value={formData.etapa2}
                      onChange={(e) => handleInputChange('etapa2', e.target.value)}
                      error={!!errors.etapa2}
                      helperText={errors.etapa2 || 'Atividades de desenvolvimento e intervenção'}
                      placeholder="Ex: Atividades educativas, orientações aos cuidadores, desenvolvimento de habilidades..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(17, 180, 217, 0.1)',
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Box sx={{ 
                    p: 3, 
                    borderRadius: 3, 
                    background: 'linear-gradient(135deg, rgba(242, 213, 68, 0.05) 0%, rgba(242, 213, 68, 0.1) 100%)',
                    border: '2px solid rgba(242, 213, 68, 0.2)',
                    height: '100%'
                  }}>
                    <Typography variant="h6" sx={{ color: '#D4A017', fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                      3️⃣ Terceira Etapa
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={6}
                      label="Consolidação *"
                      value={formData.etapa3}
                      onChange={(e) => handleInputChange('etapa3', e.target.value)}
                      error={!!errors.etapa3}
                      helperText={errors.etapa3 || 'Atividades de consolidação e avaliação final'}
                      placeholder="Ex: Avaliação de progresso, planejamento de continuidade, orientações finais..."
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          backgroundColor: 'white',
                          '&.Mui-focused': {
                            boxShadow: '0 0 0 3px rgba(242, 213, 68, 0.1)',
                          }
                        }
                      }}
                    />
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions 
          sx={{ 
            p: 4, 
            pt: 3,
            background: 'linear-gradient(135deg, rgba(248, 250, 252, 0.8) 0%, rgba(255, 255, 255, 0.9) 100%)',
            borderTop: '1px solid rgba(0, 0, 0, 0.05)',
            gap: 2,
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
            <AssignmentIcon sx={{ fontSize: 20 }} />
            <Typography variant="body2">
              {editingModelo ? 'Modificando modelo existente' : 'Criando novo modelo de plano'}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={handleCloseDialog}
              variant="outlined"
              sx={{ 
                color: '#666',
                borderColor: '#ddd',
                borderRadius: 3,
                px: 4,
                py: 1.5,
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#999',
                  backgroundColor: 'rgba(0, 0, 0, 0.02)'
                }
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                background: 'linear-gradient(135deg, #308C50 0%, #11B4D9 100%)',
                borderRadius: 3,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 8px 25px rgba(48, 140, 80, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #267A42 0%, #0E9BC4 100%)',
                  boxShadow: '0 12px 35px rgba(48, 140, 80, 0.4)',
                  transform: 'translateY(-2px)'
                },
                '&:active': {
                  transform: 'translateY(0px)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              {editingModelo ? '✨ Atualizar Modelo' : '🚀 Criar Modelo'}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </Container>
  );
}