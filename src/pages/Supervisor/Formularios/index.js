import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Breadcrumbs,
  Link,
  CircularProgress,
  Alert,
  Grid,
  Divider,
  Chip,
  Avatar,
  IconButton,
  Button,
  Fab,
  Stack,
  CardActions
} from '@mui/material';
import {
  Home as HomeIcon,
  NavigateNext as NavigateNextIcon,
  Description as FormIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  SupervisorAccount as SupervisorIcon,
  Refresh as RefreshIcon,
  Create as CreateIcon
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import axios from '../../../services/axios';

export default function FormulariosSupervisor() {
  const [formularios, setFormularios] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    fetchFormularios();
  }, []);

  const fetchFormularios = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/forms');
      setFormularios(response.data || []);
    } catch (error) {
      console.error('Erro ao buscar formulários:', error);
      toast.error('Erro ao carregar formulários');
      setFormularios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateForm = () => {
    history.push('/supervisor/criar-formulario');
  };

  const handleEditForm = (id) => {
    history.push(`/supervisor/editar-formulario/${id}`);
  };

  const handleViewForm = (id) => {
    history.push(`/supervisor/visualizar-formulario/${id}`);
  };

  const handleDeleteForm = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este formulário?')) {
      try {
        await axios.delete(`/forms/${id}`);
        toast.success('Formulário excluído com sucesso!');
        fetchFormularios();
      } catch (error) {
        console.error('Erro ao excluir formulário:', error);
        toast.error('Erro ao excluir formulário');
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ativo':
        return 'success';
      case 'inativo':
        return 'error';
      case 'rascunho':
        return 'warning';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'rascunho':
        return 'Rascunho';
      default:
        return 'Desconhecido';
    }
  };

  const getTipoLabel = (tipo) => {
    switch (tipo) {
      case 'tipo5':
        return 'Tipo 5';
      case 'tipo7':
        return 'Tipo 7';
      default:
        return tipo || 'Geral';
    }
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
          <Typography
            color="text.primary"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <FormIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Formulários
          </Typography>
        </Breadcrumbs>
      </Box>

      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
              <SupervisorIcon />
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" gutterBottom>
                Formulários Personalizados
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Gerencie formulários personalizados para coleta de dados
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton 
              onClick={fetchFormularios} 
              disabled={loading}
              color="primary"
              title="Atualizar lista"
            >
              <RefreshIcon />
            </IconButton>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateForm}
              sx={{ minWidth: 160 }}
            >
              Criar Formulário
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : formularios.length === 0 ? (
          <Alert 
            severity="info" 
            sx={{ 
              textAlign: 'center',
              py: 4,
              '& .MuiAlert-message': {
                width: '100%'
              }
            }}
          >
            <Typography variant="h6" gutterBottom>
              Nenhum formulário encontrado
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Você ainda não criou nenhum formulário personalizado.
            </Typography>
            <Button
              variant="contained"
              startIcon={<CreateIcon />}
              onClick={handleCreateForm}
            >
              Criar Primeiro Formulário
            </Button>
          </Alert>
        ) : (
          <Grid container spacing={3}>
            {formularios.map((formulario) => (
              <Grid item xs={12} sm={6} md={4} key={formulario.id}>
                <Card 
                  elevation={2}
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar 
                        sx={{ 
                          bgcolor: 'secondary.main', 
                          mr: 2,
                          width: 40,
                          height: 40
                        }}
                      >
                        <FormIcon />
                      </Avatar>
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" component="h2" noWrap>
                        {formulario.titulo || formulario.estrutura?.titulo || 'Formulário'}
                      </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          <Chip
                            label={getTipoLabel(formulario.tipo)}
                            size="small"
                            variant="outlined"
                          />
                          <Chip
                            label={getStatusLabel(formulario.status || 'ativo')}
                            size="small"
                            color={getStatusColor(formulario.status || 'ativo')}
                          />
                        </Stack>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      Etapa: {formulario.etapa ?? 'Não definida'}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {(formulario.campos?.length ?? formulario.estrutura?.campos?.length ?? 0)} campo(s) configurado(s)
                    </Typography>

                    {formulario.createdAt && (
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                        Criado em: {new Date(formulario.createdAt).toLocaleDateString('pt-BR')}
                      </Typography>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Stack direction="row" spacing={1} sx={{ width: '100%' }}>
                      <IconButton
                        size="small"
                        onClick={() => handleViewForm(formulario.id)}
                        title="Visualizar"
                        color="info"
                      >
                        <ViewIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleEditForm(formulario.id)}
                        title="Editar"
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteForm(formulario.id)}
                        title="Excluir"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* Floating Action Button para criar formulário */}
      <Fab
        color="primary"
        aria-label="criar formulário"
        onClick={handleCreateForm}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
}