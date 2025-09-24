/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import axios from "../../services/axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Avatar,
  Divider,
  Paper,
  IconButton,
  Alert,
  CircularProgress,
  Breadcrumbs,
  Stack,
  CardActions,
} from '@mui/material';
import {
  Person as PersonIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  ArrowBack as ArrowBackIcon,
  SupervisorAccount as SupervisorIcon,
  People as PeopleIcon,
} from '@mui/icons-material';

export default function DetalhesSupervisores({ match }) {
  const { id } = match.params;
  const [visitadores, setVisitadores] = useState([]);
  const [supervisor, setSupervisor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const response = await axios.get(`/coordenador/supervisores/${id}`);
        console.log(response.data);
        
        // Armazena dados do supervisor
        setSupervisor(response.data);
        
        // Verifica se a resposta tem a estrutura esperada
        if (response.data && response.data.supervised) {
          setVisitadores(response.data.supervised);
        } else if (response.data && response.data.supervisor && response.data.supervisor.supervised) {
          setVisitadores(response.data.supervisor.supervised);
        } else {
          console.warn('Estrutura de dados inesperada:', response.data);
          setVisitadores([]);
        }
      } catch (error) {
        console.error('Erro ao buscar dados do supervisor:', error);
        setVisitadores([]);
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, [id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header com Breadcrumbs */}
      <Box sx={{ mb: 4 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 2 }}>
          <Link to="/coordenador" style={{ textDecoration: 'none', color: 'inherit' }}>
            Coordenador
          </Link>
          <Link to="/meus-supervisores" style={{ textDecoration: 'none', color: 'inherit' }}>
            Supervisores
          </Link>
          <Typography color="text.primary">Detalhes</Typography>
        </Breadcrumbs>
        
        <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
          <IconButton 
            component={Link} 
            to="/meus-supervisores"
            sx={{ 
              bgcolor: 'primary.main', 
              color: 'white',
              '&:hover': { bgcolor: 'primary.dark' }
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Detalhes do Supervisor
          </Typography>
        </Box>
      </Box>

      {/* Informações do Supervisor */}
      {supervisor && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 4, 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <Box display="flex" alignItems="center" gap={3}>
            <Avatar 
              sx={{ 
                width: 80, 
                height: 80, 
                bgcolor: 'rgba(255,255,255,0.2)',
                fontSize: '2rem'
              }}
            >
              <SupervisorIcon fontSize="large" />
            </Avatar>
            <Box flex={1}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {supervisor.name}
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                <Chip 
                  icon={<BusinessIcon />} 
                  label={`CRAS: ${supervisor.cras}`}
                  sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
                />
                <Chip 
                  icon={supervisor.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                  label={supervisor.isActive ? "Ativo" : "Inativo"}
                  color={supervisor.isActive ? "success" : "error"}
                />
                <Chip 
                  label={supervisor.isPending ? "Pendente" : "Aprovado"}
                  color={supervisor.isPending ? "warning" : "success"}
                />
              </Stack>
            </Box>
          </Box>
        </Paper>
      )}

      {/* Título da Seção de Visitadores */}
      <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
        <PeopleIcon color="primary" />
        <Typography variant="h5" fontWeight="bold">
          Visitadores Supervisionados
        </Typography>
        <Chip 
          label={`${visitadores.length} visitador${visitadores.length !== 1 ? 'es' : ''}`}
          color="primary"
          variant="outlined"
        />
      </Box>

      {/* Lista de Visitadores */}
      {visitadores.length > 0 ? (
        <Grid container spacing={3}>
          {visitadores.map((visitador) => (
            <Grid item xs={12} sm={6} md={4} key={visitador.id}>
              <Card 
                elevation={3}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      <PersonIcon />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" noWrap>
                      {visitador.name}
                    </Typography>
                  </Box>
                  
                  <Divider sx={{ my: 2 }} />
                  
                  <Stack spacing={1.5}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <LocationIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>Território:</strong> {visitador.territorio}
                      </Typography>
                    </Box>
                    
                    <Box display="flex" alignItems="center" gap={1}>
                      <BusinessIcon color="action" fontSize="small" />
                      <Typography variant="body2" color="text.secondary">
                        <strong>CRAS:</strong> {visitador.cras}
                      </Typography>
                    </Box>
                  </Stack>
                  
                  <Box sx={{ mt: 2 }}>
                    <Stack direction="row" spacing={1} flexWrap="wrap">
                      <Chip 
                        icon={visitador.isActive ? <CheckCircleIcon /> : <CancelIcon />}
                        label={visitador.isActive ? "Ativo" : "Inativo"}
                        size="small"
                        color={visitador.isActive ? "success" : "error"}
                      />
                      <Chip 
                        label={visitador.isPending ? "Pendente" : "Aprovado"}
                        size="small"
                        color={visitador.isPending ? "warning" : "success"}
                      />
                    </Stack>
                  </Box>
                </CardContent>
                
                <CardActions sx={{ p: 2, pt: 0 }}>
                  <Button
                    component={Link}
                    to={`/visitadores/detalhes/${visitador.id}`}
                    variant="outlined"
                    startIcon={<VisibilityIcon />}
                    size="small"
                    fullWidth
                    sx={{ mr: 1 }}
                  >
                    Ver Detalhes
                  </Button>
                  <Button
                    component={Link}
                    to={`/visitadores/editar/${visitador.id}`}
                    variant="contained"
                    startIcon={<EditIcon />}
                    size="small"
                    fullWidth
                  >
                    Editar
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Alert 
          severity="info" 
          sx={{ 
            mt: 3,
            '& .MuiAlert-message': {
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }
          }}
        >
          <PeopleIcon />
          Este supervisor não possui visitadores supervisionados no momento.
        </Alert>
      )}
    </Container>
  );
}
