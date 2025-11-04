import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Avatar,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Chip,
  Stack
} from '@mui/material';
import {
  Create as CreateIcon,
  Save as SaveIcon,
  ArrowBack as ArrowBackIcon,
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Assignment as FormIcon,
  SupervisorAccount as SupervisorIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from '../../../services/axios';
import FormFieldEditor from '../../../components/FormFieldEditor';

export default function CriarFormulario() {
  const [titulo, setTitulo] = useState('');
  const [tipo, setTipo] = useState('');
  const [etapa, setEtapa] = useState(1);
  const [campos, setCampos] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  // Tipos de formulários disponíveis
  const tiposFormularios = [
    { value: 'tipo5', label: 'Formulário Tipo 5' },
    { value: 'tipo7', label: 'Formulário Tipo 7' }
  ];

  // Tipos de campos HTML disponíveis
  const tiposCampos = [
    { value: 'text', label: 'Texto' },
    { value: 'email', label: 'Email' },
    { value: 'password', label: 'Senha' },
    { value: 'number', label: 'Número' },
    { value: 'tel', label: 'Telefone' },
    { value: 'url', label: 'URL' },
    { value: 'date', label: 'Data' },
    { value: 'time', label: 'Hora' },
    { value: 'datetime-local', label: 'Data e Hora' },
    { value: 'textarea', label: 'Área de Texto' },
    { value: 'select', label: 'Lista Suspensa' },
    { value: 'radio', label: 'Botão de Rádio' },
    { value: 'checkbox', label: 'Caixa de Seleção' },
    { value: 'file', label: 'Arquivo' },
    { value: 'range', label: 'Controle Deslizante' },
    { value: 'color', label: 'Cor' },
    { value: 'hidden', label: 'Campo Oculto' }
  ];

  const adicionarCampo = () => {
    const novoCampo = {
      id: Date.now(),
      label: '',
      type: 'text',
      required: false,
      placeholder: '',
      options: [], // Para select, radio, checkbox
      validation: {},
      order: campos.length
    };
    setCampos([...campos, novoCampo]);
  };

  const removerCampo = (id) => {
    setCampos(campos.filter(campo => campo.id !== id));
  };

  const atualizarCampo = (id, propriedade, valor) => {
    setCampos(campos.map(campo => 
      campo.id === id ? { ...campo, [propriedade]: valor } : campo
    ));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!titulo.trim()) {
      toast.error('Título é obrigatório');
      return;
    }
    
    if (!tipo) {
      toast.error('Tipo do formulário é obrigatório');
      return;
    }

    // Validação de acordo com enum TiposFormularios { tipo5, tipo7 }
    const tiposValidos = ['tipo5', 'tipo7'];
    if (!tiposValidos.includes(tipo)) {
      toast.error('Tipo inválido. Selecione "tipo5" ou "tipo7"');
      return;
    }

    if (campos.length === 0) {
      toast.error('Adicione pelo menos um campo ao formulário');
      return;
    }

    // Validar se todos os campos têm label
    const camposSemLabel = campos.filter(campo => !campo.label.trim());
    if (camposSemLabel.length > 0) {
      toast.error('Todos os campos devem ter um rótulo');
      return;
    }

    setLoading(true);
    
    try {
      const estrutura = {
        titulo,
        campos: campos.map(campo => ({
          id: campo.id,
          label: campo.label,
          type: campo.type,
          required: campo.required,
          placeholder: campo.placeholder,
          options: campo.options,
          validation: campo.validation,
          order: campo.order
        }))
      };

      const formData = {
        tipo,
        etapa,
        estrutura
      };

      await axios.post('/forms', formData);
      toast.success('Formulário criado com sucesso!');
      history.push('/supervisor/formularios');
    } catch (error) {
      console.error('Erro ao criar formulário:', error);
      toast.error('Erro ao criar formulário. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    history.goBack();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Link
            color="inherit"
            href="/"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Início
          </Link>
          <Link
            color="inherit"
            href="/supervisor/formularios"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <FormIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Formulários
          </Link>
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <CreateIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Criar Formulário
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <CreateIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Criar Novo Formulário
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Configure os campos e estrutura do seu formulário personalizado
              </Typography>
            </Box>
          </Box>
          
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleBack}
            sx={{ minWidth: 120 }}
          >
            Voltar
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        <Box component="form" onSubmit={handleSubmit}>
          {/* Configurações Básicas */}
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <FormIcon color="primary" />
                Configurações Básicas
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Título do Formulário"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    required
                    placeholder="Ex: Avaliação de Desenvolvimento Infantil"
                  />
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <FormControl fullWidth required>
                    <InputLabel>Tipo do Formulário</InputLabel>
                    <Select
                      value={tipo}
                      label="Tipo do Formulário"
                      onChange={(e) => setTipo(e.target.value)}
                    >
                      {tiposFormularios.map((tipoForm) => (
                        <MenuItem key={tipoForm.value} value={tipoForm.value}>
                          {tipoForm.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={3}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Etapa"
                    value={etapa}
                    onChange={(e) => setEtapa(parseInt(e.target.value) || 1)}
                    inputProps={{ min: 1, max: 10 }}
                    required
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Editor de Campos */}
          <Card variant="outlined" sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CreateIcon color="primary" />
                  Campos do Formulário ({campos.length})
                </Typography>
                
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={adicionarCampo}
                  size="small"
                >
                  Adicionar Campo
                </Button>
              </Box>

              {campos.length === 0 ? (
                <Alert severity="info" sx={{ textAlign: 'center' }}>
                  Nenhum campo adicionado ainda. Clique em &quot;Adicionar Campo&quot; para começar.
                </Alert>
              ) : (
                <Stack spacing={3}>
                  {campos.map((campo, index) => (
                    <FormFieldEditor
                      key={campo.id}
                      campo={campo}
                      index={index}
                      tiposCampos={tiposCampos}
                      onUpdate={atualizarCampo}
                      onRemove={removerCampo}
                    />
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={loading}
            >
              Cancelar
            </Button>
            
            <Button
              type="submit"
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
              disabled={loading}
              sx={{ minWidth: 140 }}
            >
              {loading ? 'Salvando...' : 'Salvar Formulário'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}