import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { isEmail } from "validator";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Container,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  Edit as EditIcon,
} from '@mui/icons-material';

import * as actions from "../../store/modules/auth/actions";

export default function Users() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmepassword, setConfirmarSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();

  const emailStored = useSelector((state) => state.auth.user.email);
  const id = useSelector((state) => state.auth.user.id);

  React.useEffect(() => {
    if (!id) return;
    setEmail(emailStored);
  }, [id, emailStored]);

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch(actions.registerRequest({ email, password, id }));
  }

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 3,
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  bgcolor: 'primary.main',
                  width: 56,
                  height: 56,
                  mb: 2,
                }}
              >
                <EditIcon />
              </Avatar>
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
                Editar Perfil
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary',
                  textAlign: 'center',
                }}
              >
                Atualize suas informações pessoais
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Nova Senha"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
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
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Confirmar Nova Senha"
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmepassword}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
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
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  py: 1.5,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  background: 'linear-gradient(45deg, #308C50, #11B4D9)',
                  boxShadow: '0px 4px 20px rgba(48, 140, 80, 0.4)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #276B3F, #0E8FAD)',
                    boxShadow: '0px 6px 25px rgba(48, 140, 80, 0.6)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Salvar Alterações
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
