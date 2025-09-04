import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link as MuiLink,
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
  Login as LoginIcon,
} from '@mui/icons-material';
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import { isEmail } from "validator";
import { get } from "lodash";

import * as actions from "../../store/modules/auth/actions";

export default function Login(props) {
  const dispatch = useDispatch();
  const prevPath = get(props, "location.state.prevPath", "/");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    let formsErrors = false;

    if (!isEmail(email)) {
      formsErrors = true;
      toast.error("e-mail inválido");
    }

    if (password.length < 3 || password.length > 255) {
      formsErrors = true;
      toast.error("Senha invalida!");
    }

    if (formsErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: 400,
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: 4,
            boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  m: 1,
                  bgcolor: 'primary.main',
                  background: 'linear-gradient(45deg, #308C50 30%, #11B4D9 90%)',
                  width: 56,
                  height: 56,
                }}
              >
                <LoginIcon sx={{ fontSize: 30 }} />
              </Avatar>
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #308C50, #11B4D9)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  textAlign: 'center',
                }}
              >
                Entrar
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                Acesse sua conta para continuar
              </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="E-mail"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="primary" />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  mt: 3,
                  mb: 2,
                  py: 1.5,
                  borderRadius: 2,
                  background: 'linear-gradient(45deg, #308C50 30%, #11B4D9 90%)',
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  boxShadow: '0px 4px 15px rgba(48, 140, 80, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #1B5E20 30%, #0277BD 90%)',
                    boxShadow: '0px 6px 20px rgba(48, 140, 80, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                Entrar
              </Button>
              
              <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Esqueceu sua senha?{' '}
                  <MuiLink
                    component={Link}
                    to="/pedir-senha-nova"
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      fontWeight: 600,
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    }}
                  >
                    Clique aqui!
                  </MuiLink>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
}
