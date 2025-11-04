import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Chip,
  Stack,
  Avatar,
  Grid,
  Divider,
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Edit as EditIcon,
  SupervisorAccount as SupervisorIcon,
  Assignment as AssignmentIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from '../../services/axios';
import PropTypes from 'prop-types';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
};

export default function AdministrativoSupervisor() {
  const [user, setUser] = useState({});
  const [faltas, setFaltas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  
  // Estados para alteração de email
  const [openEmailDialog, setOpenEmailDialog] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailLoading, setEmailLoading] = useState(false);
  
  // Estados para alteração de senha
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setLoading(true);
        const [userResponse, faltasResponse] = await Promise.all([
          axios.get('/'),
          axios.get('/faltas')
        ]);
        
        setUser(userResponse.data.user);
        setFaltas(faltasResponse.data || []);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
        toast.error('Erro ao carregar dados');
      } finally {
        setLoading(false);
      }
    }
    getData();
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Funções para alteração de email
  const handleOpenEmailDialog = () => {
    setNewEmail(user.email || '');
    setOpenEmailDialog(true);
  };

  const handleCloseEmailDialog = () => {
    setOpenEmailDialog(false);
    setNewEmail('');
  };

  const handleUpdateEmail = async () => {
    if (!newEmail || newEmail === user.email) {
      toast.warning('Digite um novo email válido');
      return;
    }

    try {
      setEmailLoading(true);
      await axios.put('/login/update-email', { email: newEmail });
      
      setUser(prev => ({ ...prev, email: newEmail }));
      toast.success('Email atualizado com sucesso!');
      handleCloseEmailDialog();
    } catch (error) {
      console.error('Erro ao atualizar email:', error);
      toast.error('Erro ao atualizar email');
    } finally {
      setEmailLoading(false);
    }
  };

  // Funções para alteração de senha
  const handleOpenPasswordDialog = () => {
    setPasswordData({ password: '', confirmPassword: '' });
    setOpenPasswordDialog(true);
  };

  const handleClosePasswordDialog = () => {
    setOpenPasswordDialog(false);
    setPasswordData({ password: '', confirmPassword: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleUpdatePassword = async () => {
    if (!passwordData.password || passwordData.password.length < 6) {
      toast.warning('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (passwordData.password !== passwordData.confirmPassword) {
      toast.warning('As senhas não coincidem');
      return;
    }

    try {
      setPasswordLoading(true);
      await axios.put('/login/update-password', { 
        password: passwordData.password 
      });
      
      toast.success('Senha atualizada com sucesso!');
      handleClosePasswordDialog();
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      toast.error('Erro ao atualizar senha');
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
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
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Área Administrativa - Supervisor
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9 }}>
              Bem-vindo, {user.name}
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Tabs */}
      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          sx={{ 
            borderBottom: 1, 
            borderColor: 'divider',
            '& .MuiTab-root': {
              minHeight: 64,
              fontSize: '1rem',
              fontWeight: 600
            }
          }}
        >
          <Tab 
            icon={<PersonIcon />} 
            label="Minhas Informações" 
            iconPosition="start"
          />
          <Tab 
            icon={<AssignmentIcon />} 
            label="Minhas Faltas" 
            iconPosition="start"
          />
        </Tabs>

        {/* Tab Panel - Minhas Informações */}
        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                    <PersonIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Informações Pessoais
                    </Typography>
                  </Box>
                  
                  <Stack spacing={2}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Nome Completo
                      </Typography>
                      <Typography variant="body1" fontWeight="500">
                        {user.name}
                      </Typography>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Email
                      </Typography>
                      <Box display="flex" alignItems="center" justifyContent="space-between">
                        <Typography variant="body1" fontWeight="500">
                          {user.email}
                        </Typography>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={handleOpenEmailDialog}
                        >
                          Editar
                        </Button>
                      </Box>
                    </Box>
                    
                    <Divider />
                    
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary">
                        Função
                      </Typography>
                      <Chip 
                        label="Supervisor" 
                        color="primary" 
                        icon={<SupervisorIcon />}
                      />
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Card elevation={2} sx={{ height: '100%' }}>
                <CardContent sx={{ p: 3 }}>
                  <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                    <LockIcon color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      Segurança
                    </Typography>
                  </Box>
                  
                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        Senha
                      </Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<LockIcon />}
                        onClick={handleOpenPasswordDialog}
                        sx={{ py: 1.5 }}
                      >
                        Alterar Senha
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>

        {/* Tab Panel - Minhas Faltas */}
        <TabPanel value={tabValue} index={1}>
          <Box display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
            <AssignmentIcon color="primary" />
            <Typography variant="h6" fontWeight="bold">
              Faltas Registradas
            </Typography>
            <Chip 
              label={`${faltas.length} falta${faltas.length !== 1 ? 's' : ''}`}
              color="primary"
              variant="outlined"
            />
          </Box>

          {faltas.length > 0 ? (
            <Grid container spacing={2}>
              {faltas.map((falta) => (
                <Grid item xs={12} key={falta.id}>
                  <Card elevation={1} sx={{ borderLeft: 4, borderColor: 'primary.main' }}>
                    <CardContent>
                      <Box display="flex" justifyContent="space-between" alignItems="start">
                        <Box>
                          <Typography variant="h6" gutterBottom>
                            {falta.motivo}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Registrado por: {falta.registrador}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Data: {new Date(falta.createdAt).toLocaleDateString('pt-BR')}
                          </Typography>
                        </Box>
                        <Chip 
                          label={falta.isActive ? "Ativa" : "Invalidada"}
                          color={falta.isActive ? "error" : "success"}
                          size="small"
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                bgcolor: 'grey.50',
                borderRadius: 2
              }}
            >
              <AssignmentIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                Nenhuma falta registrada
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Você não possui faltas registradas no sistema.
              </Typography>
            </Paper>
          )}
        </TabPanel>
      </Paper>

      {/* Dialog para alteração de email */}
      <Dialog 
        open={openEmailDialog} 
        onClose={handleCloseEmailDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <EmailIcon color="primary" />
            Alterar Email
          </Box>
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Novo Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseEmailDialog}>
            Cancelar
          </Button>
          <Button 
            onClick={handleUpdateEmail}
            variant="contained"
            disabled={emailLoading}
            startIcon={emailLoading ? <CircularProgress size={20} /> : <EmailIcon />}
          >
            {emailLoading ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog para alteração de senha */}
      <Dialog 
        open={openPasswordDialog} 
        onClose={handleClosePasswordDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" gap={2}>
            <LockIcon color="primary" />
            Alterar Senha
          </Box>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 2 }}>
            <TextField
              label="Nova Senha"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={passwordData.password}
              onChange={(e) => setPasswordData(prev => ({ ...prev, password: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            
            <TextField
              label="Confirmar Nova Senha"
              type={showConfirmPassword ? 'text' : 'password'}
              fullWidth
              variant="outlined"
              value={passwordData.confirmPassword}
              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClosePasswordDialog}>
            Cancelar
          </Button>
          <Button 
            onClick={handleUpdatePassword}
            variant="contained"
            disabled={passwordLoading}
            startIcon={passwordLoading ? <CircularProgress size={20} /> : <LockIcon />}
          >
            {passwordLoading ? 'Atualizando...' : 'Atualizar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}