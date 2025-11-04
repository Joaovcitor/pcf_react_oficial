import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../../services/axios";
import { get } from "lodash";
import { useHistory } from "react-router-dom";
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  CircularProgress,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from '@mui/icons-material';

export default function PedirSenhaNova() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    
    if (!email) {
      toast.error("Por favor, digite seu e-mail");
      return;
    }

    setLoading(true);
    
    try {
      await axios.post("/login/reset-password", {
        email,
      });
      toast.success("E-mail de recuperação enviado com sucesso! Verifique sua caixa de entrada.");
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
        toast.error("Erro ao enviar e-mail de recuperação");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container maxWidth="sm" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      py: 4,
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <Card elevation={8} sx={{ 
        width: '100%', 
        borderRadius: 3,
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          p: 4,
          textAlign: 'center'
        }}>
          <LockIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
          <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
            Recuperar Senha
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Digite seu e-mail para receber as instruções de recuperação
          </Typography>
        </Box>
        
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu e-mail"
              variant="outlined"
              margin="normal"
              required
              disabled={loading}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: '1.1rem',
                fontWeight: 'bold',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                },
                mb: 2,
              }}
            >
              {loading ? 'Enviando...' : 'Enviar E-mail de Recuperação'}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box textAlign="center">
            <Button
              variant="text"
              startIcon={<ArrowBackIcon />}
              onClick={() => history.push('/login')}
              disabled={loading}
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              Voltar ao Login
            </Button>
          </Box>

          <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(103, 126, 234, 0.1)', borderRadius: 2 }}>
            <Typography variant="body2" color="text.secondary" textAlign="center">
              <strong>Não recebeu o e-mail?</strong><br />
              Verifique sua caixa de spam ou aguarde alguns minutos antes de tentar novamente.
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
