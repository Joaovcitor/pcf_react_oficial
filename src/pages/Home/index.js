import React, { useState } from "react";
import axios from "../../services/axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Fade,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  SupervisorAccount as SupervisorIcon,
  AdminPanelSettings as AdminIcon,
} from '@mui/icons-material';

import FerramentasVisitadores from "../../components/FerramentasVisitadores";
import FerramentasSupervisores from "../../components/FerramentasSupervisores";
import FerramentaCoordenador from "../../components/FerramentasCoordenador";
import FerramentasRH from "../../components/FerramentasRH";

export default function Home() {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/");
      setUsers(response.data.user);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const getRoleInfo = (role) => {
    switch (role) {
      case "visitador":
        return {
          title: "Visitador",
          subtitle: "Painel de Ferramentas do Visitador",
          icon: <DashboardIcon sx={{ fontSize: 40 }} />,
          color: "#11B4D9",
        };
      case "supervisor":
        return {
          title: "Supervisor",
          subtitle: "Painel de Ferramentas do Supervisor",
          icon: <SupervisorIcon sx={{ fontSize: 40 }} />,
          color: "#F2D544",
        };
      case "coordenador":
        return {
          title: "Coordenador",
          subtitle: "Painel de Ferramentas do Coordenador",
          icon: <AdminIcon sx={{ fontSize: 40 }} />,
          color: "#308C50",
        };
      case "rh":
        return {
          title: "Recursos Humanos",
          subtitle: "Painel de Ferramentas do RH",
          icon: <AdminIcon sx={{ fontSize: 40 }} />,
          color: "#2196f3",
        };
      default:
        return {
          title: "Dashboard",
          subtitle: "Bem-vindo ao Sistema",
          icon: <DashboardIcon sx={{ fontSize: 40 }} />,
          color: "#308C50",
        };
    }
  };

  function renderizaComponente() {
    if (!users) return null;
    switch (users.role) {
      case "visitador":
        return <FerramentasVisitadores />;
      case "supervisor":
        return <FerramentasSupervisores />;
      case "coordenador":
        return <FerramentaCoordenador />;
      case "rh":
        return <FerramentasRH />;
      default:
        return null;
    }
  }

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
          }}
        >
          <CircularProgress
            size={60}
            sx={{
              color: 'primary.main',
              mb: 2,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              fontWeight: 500,
            }}
          >
            Carregando dashboard...
          </Typography>
        </Box>
      </Container>
    );
  }

  const roleInfo = users ? getRoleInfo(users.role) : getRoleInfo(null);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Fade in={true} timeout={800}>
        <Box>
          {users && (
            <Card
              sx={{
                mb: 4,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                boxShadow: '0px 8px 32px rgba(0, 0, 0, 0.12)',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: roleInfo.color,
                      width: 64,
                      height: 64,
                      mr: 3,
                    }}
                  >
                    {roleInfo.icon}
                  </Avatar>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{
                        fontWeight: 700,
                        background: `linear-gradient(45deg, ${roleInfo.color}, #308C50)`,
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      Olá, {users.name}!
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: 'text.secondary',
                        fontWeight: 500,
                      }}
                    >
                      {roleInfo.subtitle}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          )}
          
          <Box sx={{ mt: 3 }}>
            {renderizaComponente()}
          </Box>
        </Box>
      </Fade>
    </Container>
  );
}
