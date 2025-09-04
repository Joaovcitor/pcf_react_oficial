import React from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Tooltip,
  useTheme,
} from '@mui/material';
import {
  Home as HomeIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import * as actions from "../../store/modules/auth/actions";
import history from "../../services/history";

export default function Header() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const theme = useTheme();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(actions.loginFailure());
    history.push("/");
  };

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Avatar 
                src="/images/image.png" 
                alt="Logo"
                sx={{ 
                  width: 40, 
                  height: 40,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              />
              <Typography 
                variant="h6" 
                component="div" 
                sx={{ 
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #ffffff, #f0f9ff)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: { xs: 'none', sm: 'block' }
                }}
              >
                PCF Sistema
              </Typography>
            </Box>
          </Link>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title="Início">
            <IconButton 
              component={Link} 
              to="/" 
              sx={{ 
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  transform: 'scale(1.05)',
                }
              }}
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>
          
          {isLoggedIn ? (
            <Tooltip title="Sair">
              <IconButton 
                onClick={handleLogout}
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Entrar">
              <IconButton 
                component={Link} 
                to="/login"
                sx={{ 
                  color: 'white',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    transform: 'scale(1.05)',
                  }
                }}
              >
                <LoginIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
