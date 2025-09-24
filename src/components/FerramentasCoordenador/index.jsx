import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Avatar,
  Container,
} from '@mui/material';
import {
  PersonAdd as PersonAddIcon,
  Assessment as AssessmentIcon,
  Map as MapIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  ChildCare as ChildCareIcon,
} from '@mui/icons-material';
import { Link } from "react-router-dom";

export default function FerramentasCoordenador() {
  const ferramentas = [
    {
      id: 1,
      title: "Cadastrar Supervisor",
      description: "Registrar novo supervisor no sistema",
      icon: <PersonAddIcon sx={{ fontSize: 40 }} />,
      color: "#308C50",
      link: "/cadastrar-supervisor",
    },
    {
      id: 2,
      title: "Relatórios",
      description: "Visualizar relatórios gerenciais",
      icon: <AssessmentIcon sx={{ fontSize: 40 }} />,
      color: "#11B4D9",
      link: "/relatorios",
    },
    {
      id: 3,
      title: "Crianças",
      description: "Gerenciar crianças cadastradas no sistema",
      icon: <ChildCareIcon sx={{ fontSize: 40 }} />,
      color: "#E91E63",
      link: "/coordenador/criancas",
    },
    {
      id: 4,
      title: "Mapa de Calor",
      description: "Visualizar mapa de calor das visitas",
      icon: <MapIcon sx={{ fontSize: 40 }} />,
      color: "#F2D544",
      link: "/visitas",
    },
    {
      id: 5,
      title: "Administrativo",
      description: "Ferramentas administrativas avançadas",
      icon: <AdminPanelSettingsIcon sx={{ fontSize: 40 }} />,
      color: "#308C50",
      link: "/administrativo",
    },
  ];

  return (
    <Container maxWidth="lg">
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
          Ferramentas do Coordenador
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: 'center',
            color: 'text.secondary',
            mb: 4,
          }}
        >
          Gerencie supervisores e monitore o programa completo
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {ferramentas.map((ferramenta) => (
          <Grid item xs={12} sm={6} md={3} key={ferramenta.id}>
            <Card
              component={Link}
              to={ferramenta.link}
              sx={{
                height: '100%',
                textDecoration: 'none',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.15)',
                  '& .avatar': {
                    transform: 'scale(1.1)',
                  },
                },
              }}
            >
              <CardActionArea sx={{ height: '100%' }}>
                <CardContent
                  sx={{
                    p: 3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    height: '100%',
                  }}
                >
                  <Avatar
                    className="avatar"
                    sx={{
                      bgcolor: ferramenta.color,
                      width: 64,
                      height: 64,
                      mb: 2,
                      transition: 'transform 0.3s ease-in-out',
                    }}
                  >
                    {ferramenta.icon}
                  </Avatar>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: 'text.primary',
                    }}
                  >
                    {ferramenta.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.5,
                    }}
                  >
                    {ferramenta.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
